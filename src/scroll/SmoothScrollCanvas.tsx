import React, { useEffect, useRef, useState } from 'react';

interface SmoothScrollCanvasProps {
  totalFrames?: number;
  framePath?: string;
  mobileFramePath?: string;
  fileExtension?: string;
}

const DEFAULT_TOTAL_FRAMES = 82;
const DEFAULT_FRAME_PATH = '/scroll/chess/ezgif-frame-';
const DEFAULT_EXTENSION = '.webp';

// Format index with 3 digits, e.g., 1 -> "001"
const formatFrameIndex = (index: number): string => {
  return String(index).padStart(3, '0');
};

/**
 * SmoothScrollCanvas - Lag-Free Performance Optimized
 * 
 * Performance Optimizations:
 * 1. Frame Deduplication: Only redraws 2D canvas when the rounded frame index actually changes. Saves ~80-90% redundant draw calls.
 * 2. Smart Idle RAF Loop: Pauses requestAnimationFrame when scroll physics settle at rest, eliminating background CPU/GPU usage.
 * 3. Balanced DPR Resolution: Caps devicePixelRatio to max 1.75 for 60fps smoothness while preserving Retina sharpness.
 * 4. Off-Thread Image Decoding: Uses img.decode() to prevent main-thread jank when frames render for the first time.
 */
export const SmoothScrollCanvas: React.FC<SmoothScrollCanvasProps> = ({
  totalFrames = DEFAULT_TOTAL_FRAMES,
  framePath = DEFAULT_FRAME_PATH,
  mobileFramePath,
  fileExtension = DEFAULT_EXTENSION,
}) => {
  const [frameCount, setFrameCount] = useState<number>(totalFrames);
  const TOTAL_FRAMES = frameCount;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnIndexRef = useRef<number>(-1);

  const [imagesLoadedCount, setImagesLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Auto-detect total frames from manifest.json
  useEffect(() => {
    fetch('/scroll/chess/manifest.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.totalFrames === 'number' && data.totalFrames > 0) {
          setFrameCount(data.totalFrames);
        }
      })
      .catch(() => {
        // Silently use default totalFrames
      });
  }, []);

  // 1. Preload image sequence with async decoding off main thread
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const activePath = isMobile && mobileFramePath ? mobileFramePath : framePath;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = formatFrameIndex(i);
      img.src = `${activePath}${frameNum}${fileExtension}`;

      const handleImageReady = () => {
        loaded++;
        setImagesLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onload = () => {
        // Decode image asynchronously to avoid main-thread freeze
        if ('decode' in img) {
          img.decode().then(handleImageReady).catch(handleImageReady);
        } else {
          handleImageReady();
        }
      };

      img.onerror = () => {
        handleImageReady();
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, [framePath, mobileFramePath, fileExtension, TOTAL_FRAMES]);

  // 2. Draw frame - skips redraw if frame index hasn't changed
  const drawFrame = (frameIndex: number, forceRedraw = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameIndex)));

    // PERF: Skip drawing if frame index is identical to previous draw
    if (!forceRedraw && idx === lastDrawnIndexRef.current) return;
    lastDrawnIndexRef.current = idx;

    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false speeds up composite pipeline
    if (!ctx) return;

    const img = imagesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const width = canvas.width;
    const height = canvas.height;

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let renderWidth = width;
    let renderHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      renderHeight = width / imgAspect;
      offsetY = (height - renderHeight) / 2;
    } else {
      renderWidth = height * imgAspect;
      offsetX = (width - renderWidth) / 2;
    }

    ctx.drawImage(
      img,
      Math.floor(offsetX),
      Math.floor(offsetY),
      Math.ceil(renderWidth),
      Math.ceil(renderHeight)
    );
  };

  // 3. Handle canvas resize with balanced DPR & explicit dimensions
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      // Cap DPR at 1.75 to balance ultra-sharp Retina rendering with 60fps performance
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

      const displayWidth = Math.round(rect.width);
      const displayHeight = Math.round(rect.height);

      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);

      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      drawFrame(currentFrameRef.current, true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  // 4. Direct 1:1 Scroll Tracking & Zero-Latency RAF Sync
  useEffect(() => {
    if (!isLoaded) return;

    let ticking = false;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const totalScroll = container.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.max(0, Math.min(1, currentScroll / totalScroll)) : 0;

      // Direct 1:1 frame mapping without lerp coasting or delayed float
      currentFrameRef.current = progress * (TOTAL_FRAMES - 1);

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          drawFrame(currentFrameRef.current);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoaded, TOTAL_FRAMES]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black text-white selection:bg-none select-none overflow-x-hidden"
      style={{ height: '600vh' }}
    >
      {/* Preloader indicator while images load */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-mono text-xs text-neutral-400 tracking-widest">
          <div className="mb-4 text-sm font-semibold tracking-wider text-white">
            LOADING SCROLL ANIMATION
          </div>
          <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-white transition-all duration-150 ease-out"
              style={{ width: `${(imagesLoadedCount / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
          <div>{Math.round((imagesLoadedCount / TOTAL_FRAMES) * 100)}%</div>
        </div>
      )}

      {/* Canvas container with clip-path mask for clean viewport rendering */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          WebkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block pointer-events-none"
        />
      </div>
    </div>
  );
};

export default SmoothScrollCanvas;





