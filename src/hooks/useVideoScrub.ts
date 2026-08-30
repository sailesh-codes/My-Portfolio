import { useEffect, useRef, useState, useCallback } from 'react';

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG = 60000;

interface FrameItem {
  ts: number; // in microseconds
  bitmap?: ImageBitmap;
  blob?: Blob;
}

function findNearestIndex(bank: FrameItem[], targetTs: number): number {
  if (bank.length === 0) return -1;
  let low = 0;
  let high = bank.length - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (bank[mid].ts < targetTs) {
      low = mid + 1;
    } else if (bank[mid].ts > targetTs) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  if (low >= bank.length) return bank.length - 1;
  if (high < 0) return 0;

  return Math.abs(bank[low].ts - targetTs) < Math.abs(bank[high].ts - targetTs)
    ? low
    : high;
}

export function useVideoScrub(videoSrc: string) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasLive, setCanvasLive] = useState(false);
  const [duration, setDuration] = useState(0);

  const bankRef = useRef<FrameItem[]>([]);
  const lruRef = useRef<Map<number, ImageBitmap>>(new Map());
  const currentRef = useRef(0);
  const readyRef = useRef(false);
  const durRef = useRef(0);
  const buildingRef = useRef(false);
  const paintedRef = useRef(false);

  // Compute scroll progress p = clamp(0, 1, window.scrollY / (container.offsetHeight - window.innerHeight))
  const getProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;
    const maxScroll = container.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    const p = window.scrollY / maxScroll;
    return Math.max(0, Math.min(1, p));
  }, []);

  // Sync duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
        durRef.current = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1 && video.duration) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // WebCodecs + MP4Box frame extraction
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (
      prefersReducedMotion ||
      typeof window === 'undefined' ||
      typeof (window as any).VideoDecoder === 'undefined' ||
      buildingRef.current
    ) {
      return;
    }

    buildingRef.current = true;

    let aborted = false;
    let decoder: any = null;
    const watchdogTimer = setTimeout(() => {
      if (!readyRef.current && !aborted) {
        console.warn('WebCodecs frame extraction watchdog timeout (60s). Reverting to video fallback.');
      }
    }, WATCHDOG);

    async function initExtraction() {
      try {
        const response = await fetch(videoSrc, { mode: 'cors' });
        if (!response.ok) throw new Error('Video fetch failed');
        const buffer = await response.arrayBuffer();
        if (aborted) return;

        const MP4Box = (window as any).MP4Box;
        if (!MP4Box || !MP4Box.createFile) {
          throw new Error('MP4Box not found on window');
        }

        const mp4boxfile = MP4Box.createFile();

        mp4boxfile.onReady = (info: any) => {
          if (aborted) return;
          const videoTrack = info.videoTracks[0];
          if (!videoTrack) return;

          if (info.duration && info.timescale) {
            const trackDur = info.duration / info.timescale;
            setDuration(trackDur);
            durRef.current = trackDur;
          }

          let pendingChunks = 0;

          decoder = new (window as any).VideoDecoder({
            output: async (frame: any) => {
              if (aborted) {
                frame.close();
                return;
              }

              try {
                const bitmap = await createImageBitmap(frame);
                bankRef.current.push({
                  ts: frame.timestamp,
                  bitmap,
                });
              } catch {
                // Fallback
              } finally {
                frame.close();
                pendingChunks--;
              }
            },
            error: (e: any) => {
              console.warn('VideoDecoder error:', e);
            },
          });

          // Extract track description if available
          let description: any = undefined;
          const trak = mp4boxfile.getTrackById(videoTrack.id);
          if (trak && trak.mdia && trak.mdia.minf && trak.mdia.minf.stbl && trak.mdia.minf.stbl.stsd) {
            const entry = trak.mdia.minf.stbl.stsd.entries[0];
            const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
            if (box) {
              const stream = new MP4Box.DataStream(undefined, 0, MP4Box.DataStream.BIG_ENDIAN);
              box.write(stream);
              description = new Uint8Array(stream.buffer, 8); // remove size and type
            }
          }

          try {
            decoder.configure({
              codec: videoTrack.codec,
              codedWidth: videoTrack.video.width,
              codedHeight: videoTrack.video.height,
              description,
              hardwareAcceleration: 'prefer-hardware',
            });
          } catch {
            decoder.configure({
              codec: videoTrack.codec,
              codedWidth: videoTrack.video.width,
              codedHeight: videoTrack.video.height,
              hardwareAcceleration: 'prefer-software',
            });
          }

          mp4boxfile.onSamples = (id: number, user: any, samples: any[]) => {
            if (aborted) return;
            for (const sample of samples) {
              const chunk = new (window as any).EncodedVideoChunk({
                type: sample.is_sync ? 'key' : 'delta',
                timestamp: (sample.cts * 1e6) / sample.timescale,
                duration: (sample.duration * 1e6) / sample.timescale,
                data: sample.data,
              });
              decoder.decode(chunk);
              pendingChunks++;
            }
          };

          mp4boxfile.setExtractionOptions(videoTrack.id, null, { nbSamples: LEAD });
          mp4boxfile.start();

          // Mark ready once samples start decoding
          setTimeout(() => {
            if (!aborted && bankRef.current.length > 0) {
              bankRef.current.sort((a, b) => a.ts - b.ts);
              readyRef.current = true;
            }
          }, 400);
        };

        const fileBuffer: any = buffer;
        fileBuffer.fileStart = 0;
        mp4boxfile.appendBuffer(fileBuffer);
        mp4boxfile.flush();
      } catch (err) {
        console.warn('Frame bank extraction fallback:', err);
      }
    }

    // Initialize after window load
    if (document.readyState === 'complete') {
      initExtraction();
    } else {
      window.addEventListener('load', initExtraction, { once: true });
    }

    return () => {
      aborted = true;
      clearTimeout(watchdogTimer);
      if (decoder) {
        try {
          decoder.close();
        } catch {
          // Ignore
        }
      }
    };
  }, [videoSrc]);

  // Main rAF Scrubbing Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const renderLoop = (now: number) => {
      const deltaSeconds = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(0.1, deltaSeconds);

      const p = getProgress();
      setScrollProgress(p);

      const dur = durRef.current;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (dur > 0) {
        const target = p * dur;

        if (prefersReducedMotion) {
          currentRef.current = target;
        } else {
          currentRef.current +=
            (target - currentRef.current) * (1 - Math.exp(-dt * LERP_TAU));
          if (Math.abs(target - currentRef.current) < SNAP) {
            currentRef.current = target;
          }
        }

        const bank = bankRef.current;

        // Try Canvas Frame Drawing if ready
        if (readyRef.current && bank.length > 0 && canvas) {
          const targetTs = currentRef.current * 1e6;
          const idx = findNearestIndex(bank, targetTs);
          const frame = bank[idx];

          if (frame && frame.bitmap) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(frame.bitmap, 0, 0, canvas.width, canvas.height);

              if (!paintedRef.current) {
                paintedRef.current = true;
                setCanvasLive(true);
              }

              // LRU Cache Warmup / Management
              const lru = lruRef.current;
              lru.set(idx, frame.bitmap);
              if (lru.size > LRU_MAX) {
                const firstKey = lru.keys().next().value;
                if (firstKey !== undefined) lru.delete(firstKey);
              }
            }
          }
        } else if (video) {
          // Video element seeking fallback
          if (
            !video.seeking &&
            Math.abs(video.currentTime - currentRef.current) > 0.01
          ) {
            video.currentTime = currentRef.current;
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      // Recompute span
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getProgress]);

  return {
    containerRef,
    videoRef,
    canvasRef,
    scrollProgress,
    canvasLive,
    duration,
  };
}
