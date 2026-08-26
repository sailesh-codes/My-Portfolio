import React, { useEffect, useRef, useState } from 'react';

interface SmoothScrollCanvasProps {
  totalFrames?: number;
  framePath?: string;
}

const DEFAULT_TOTAL_FRAMES = 70;
const DEFAULT_FRAME_PATH = '/scroll/chess/ezgif-frame-';

// Format index with 3 digits, e.g., 1 -> "001"
const formatFrameIndex = (index: number): string => {
  return String(index).padStart(3, '0');
};

export const SmoothScrollCanvas: React.FC<SmoothScrollCanvasProps> = ({
  totalFrames = DEFAULT_TOTAL_FRAMES,
  framePath = DEFAULT_FRAME_PATH,
}) => {
  const TOTAL_FRAMES = totalFrames;
  const FRAME_PATH = framePath;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [imagesLoadedCount, setImagesLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);


  // 1. Preload images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = formatFrameIndex(i);
      img.src = `${FRAME_PATH}${frameNum}.jpg`;

      img.onload = () => {
        loaded++;
        setImagesLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        // Increment on error to avoid softlock
        loaded++;
        setImagesLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // 2. Draw canvas frame using exact rect * dpr sizing & high-quality smoothing
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameIndex)));
    const img = imagesRef.current[idx];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.save();
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

    ctx.clearRect(0, 0, width, height);
    // Draw with slight subpixel offset to eliminate boundary seam artifacts
    ctx.drawImage(
      img,
      Math.floor(offsetX) - 0.5,
      Math.floor(offsetY) - 0.5,
      Math.ceil(renderWidth) + 1,
      Math.ceil(renderHeight) + 1
    );
    ctx.restore();
  };

  // 3. Handle canvas resize with rect.width * dpr & DPR capped at 2 for performance
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  // 4. Scroll tracking and smooth lerp animation loop
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const totalScroll = container.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.max(0, Math.min(1, currentScroll / totalScroll)) : 0;

      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Lerp loop for silky-smooth physics
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.14; // smooth lerp weight
        drawFrame(currentFrameRef.current);
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black text-white selection:bg-none select-none overflow-x-hidden"
      style={{ height: '600vh' }}
    >
      {/* Minimal preloader indicator before complete load */}
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

      {/* Wrapper with clip-path mask for smooth reveals without scaling artifacts */}
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


