import React, { useEffect, useRef, useState } from 'react';

const FLOWER_BG_URL = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_192942_e1086505-d7da-433b-a59b-8220f4e6c808.png&w=1280&q=85";
const FLOWER_TOP_URL = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_151324_bf318a5f-5525-4fc7-aab5-e9a341018828.png&w=1280&q=85";

export const ResponsiveSection: React.FC = () => {
  const stageRef = useRef<HTMLElement | null>(null);
  const flowerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const flowerEl = flowerRef.current;
    const canvas = canvasRef.current;
    if (!stage || !flowerEl || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    // Preload top image for instantaneous canvas compositing
    const topImg = new Image();
    topImg.crossOrigin = "anonymous";
    topImg.src = FLOWER_TOP_URL;

    const TRAIL_MAX_POINTS = 50;
    const TRAIL_HEAD_R = 130;
    const TRAIL_NOISE_AMP = 40;
    const TRAIL_BLOB_PTS = 20;
    const TRAIL_FADE_SPEED = 0.90;
    const TRAIL_SAMPLE_DIST = 10;

    let hovering = false;
    let flowerMouseX = -9999;
    let flowerMouseY = -9999;
    let lastSampleX = -9999;
    let lastSampleY = -9999;
    let headRadius = 0;
    let time = 0;
    let isLoopRunning = false;
    const points: Array<{ x: number; y: number; r: number; alpha: number; seed: number }> = [];

    let canvasW = 0;
    let canvasH = 0;
    let flowerRect: DOMRect | null = null;
    let animationFrameId: number;

    function updateDimensions() {
      if (!flowerEl || !canvas) return;
      flowerRect = flowerEl.getBoundingClientRect();
      if (flowerRect.width === 0 || flowerRect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(flowerRect.width);
      const h = Math.round(flowerRect.height);

      if (canvasW !== w || canvasH !== h) {
        canvasW = w;
        canvasH = h;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx?.scale(dpr, dpr);
      }
    }

    function startLoop() {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    }

    function onPointerMove(e: MouseEvent | PointerEvent) {
      hovering = true;
      if (!flowerRect) updateDimensions();
      if (flowerRect && flowerRect.width > 0) {
        flowerMouseX = e.clientX - flowerRect.left;
        flowerMouseY = e.clientY - flowerRect.top;
      }
      startLoop();
    }

    function onPointerLeave() {
      hovering = false;
      lastSampleX = -9999;
      lastSampleY = -9999;
    }

    window.addEventListener('resize', updateDimensions, { passive: true });
    window.addEventListener('scroll', updateDimensions, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    stage.addEventListener('pointerenter', onPointerMove, { passive: true });
    stage.addEventListener('pointerleave', onPointerLeave, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    function drawMorphBlob(
      cx: number,
      cy: number,
      r: number,
      t: number,
      seed: number
    ) {
      if (!ctx || r < 3) return;
      const numPts = TRAIL_BLOB_PTS;
      const coords: Array<{ x: number; y: number }> = [];

      for (let i = 0; i < numPts; i++) {
        const angle = (i / numPts) * Math.PI * 2;
        const n1 = Math.sin(angle * 3 + t * 1.4 + seed) * 0.45;
        const n2 = Math.sin(angle * 5 - t * 0.9 + seed * 2.3) * 0.3;
        const n3 = Math.cos(angle * 2 + t * 1.8 + seed * 0.7) * 0.25;
        const noise = (n1 + n2 + n3) * TRAIL_NOISE_AMP * (r / TRAIL_HEAD_R);
        const radius = Math.max(0, r + noise);
        coords.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
        });
      }

      ctx.beginPath();
      const firstMid = {
        x: (coords[0].x + coords[numPts - 1].x) / 2,
        y: (coords[0].y + coords[numPts - 1].y) / 2,
      };
      ctx.moveTo(firstMid.x, firstMid.y);

      for (let i = 0; i < numPts; i++) {
        const current = coords[i];
        const next = coords[(i + 1) % numPts];
        const midX = (current.x + next.x) / 2;
        const midY = (current.y + next.y) / 2;
        ctx.quadraticCurveTo(current.x, current.y, midX, midY);
      }

      ctx.closePath();
      ctx.fill();
    }

    function renderFrame() {
      time += 0.016;

      if (!flowerRect || canvasW === 0) {
        updateDimensions();
      }

      const targetR = hovering ? TRAIL_HEAD_R : 0;
      headRadius += (targetR - headRadius) * (hovering ? 0.16 : 0.05);

      if (hovering && headRadius > 5 && flowerMouseX > -9000) {
        const dist = Math.hypot(flowerMouseX - lastSampleX, flowerMouseY - lastSampleY);
        if (lastSampleX < -9000 || dist >= TRAIL_SAMPLE_DIST) {
          const steps = lastSampleX < -9000 ? 1 : Math.min(6, Math.max(1, Math.floor(dist / TRAIL_SAMPLE_DIST)));
          for (let s = 1; s <= steps; s++) {
            const tInterp = s / steps;
            const ptX = lastSampleX < -9000 ? flowerMouseX : lastSampleX + (flowerMouseX - lastSampleX) * tInterp;
            const ptY = lastSampleY < -9000 ? flowerMouseY : lastSampleY + (flowerMouseY - lastSampleY) * tInterp;
            points.push({
              x: ptX,
              y: ptY,
              r: headRadius,
              alpha: 1.0,
              seed: Math.random() * 100,
            });
          }
          while (points.length > TRAIL_MAX_POINTS) {
            points.shift();
          }
          lastSampleX = flowerMouseX;
          lastSampleY = flowerMouseY;
        }
      }

      for (let i = points.length - 1; i >= 0; i--) {
        const pt = points[i];
        pt.alpha *= TRAIL_FADE_SPEED;
        pt.r *= 0.992;
        if (pt.alpha < 0.015) {
          points.splice(i, 1);
        }
      }

      const isHeadActive = hovering && headRadius > 3 && flowerMouseX > -9000;
      const hasPoints = points.length > 0;

      if (ctx && canvasW > 0 && canvasH > 0) {
        ctx.clearRect(0, 0, canvasW, canvasH);

        if (hasPoints || isHeadActive) {
          // Pass 1: Draw organic morph mask shapes in white
          ctx.globalCompositeOperation = 'source-over';
          for (let i = 0; i < points.length; i++) {
            const pt = points[i];
            ctx.fillStyle = `rgba(255, 255, 255, ${pt.alpha})`;
            drawMorphBlob(pt.x, pt.y, pt.r, time, pt.seed);
          }
          if (isHeadActive) {
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            drawMorphBlob(flowerMouseX, flowerMouseY, headRadius, time, 42);
          }

          // Pass 2: Clip top flower image to mask via GPU compositing (ZERO CPU lag, 120fps)
          ctx.globalCompositeOperation = 'source-in';
          if (topImg.complete && topImg.naturalWidth > 0) {
            ctx.drawImage(topImg, 0, 0, canvasW, canvasH);
          }
          ctx.globalCompositeOperation = 'source-over';
        }
      }

      // If no points remain and not hovering, sleep loop to save 100% CPU/battery
      if (!hasPoints && !hovering && headRadius < 1) {
        isLoopRunning = false;
      } else {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    }

    updateDimensions();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className="stage relative w-full h-screen min-h-[700px] overflow-hidden bg-[#161616] select-none text-white z-20"
      id="responsive"
      aria-label="Responsive Design"
    >
      <style>{`
        .stage {
          --ink: #ffffff;
          --surface: #161616;
          --orb-reveal: cubic-bezier(0.16, 1, 0.3, 1);
          --orb-soft: cubic-bezier(0.25, 0.8, 0.28, 1);
        }
        .orbit-word {
          font-family: "Orbit Display", "Times New Roman", Times, serif;
          font-size: clamp(32px, min(14.2vw, 29dvh), 260px);
        }
      `}</style>

      {/* 1. Brand mark asterisk */}
      <svg
        className="absolute top-[2.14dvh] left-[3.85vw] w-[clamp(34px,min(3.43vw,5.2dvh),66px)] aspect-[66/62] text-white z-20 cursor-pointer"
        viewBox="0 0 66 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Orbit logo"
      >
        <line x1="33" y1="1" x2="33" y2="61" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
        <line x1="3" y1="31" x2="63" y2="31" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
        <line x1="11.8" y1="9.8" x2="54.2" y2="52.2" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
        <line x1="54.2" y1="9.8" x2="11.8" y2="52.2" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
      </svg>

      {/* 2. Primary Navigation */}
      <nav className="absolute inset-0 pointer-events-none z-20 hidden md:block" aria-label="Primary">
        <ul className="list-none m-0 p-0">
          <li className="absolute top-[3.42dvh] left-[10.1vw] text-[clamp(13px,min(1.3vw,2.05dvh),25px)] pointer-events-none">
            <a href="#home" className="text-white hover:opacity-75 transition-opacity inline-block pointer-events-auto scale-x-[1.165] origin-left">Home</a>
          </li>
          <li className="absolute top-[3.42dvh] left-[17.52vw] text-[clamp(13px,min(1.3vw,2.05dvh),25px)] pointer-events-none">
            <a href="#resources" className="text-white hover:opacity-75 transition-opacity inline-block pointer-events-auto scale-x-[1.052] origin-left">Resources</a>
          </li>
          <li className="absolute top-[3.42dvh] left-[27.57vw] text-[clamp(13px,min(1.3vw,2.05dvh),25px)] pointer-events-none">
            <a href="#benefits" className="text-white hover:opacity-75 transition-opacity inline-block pointer-events-auto scale-x-[1.126] origin-left">Benefits</a>
          </li>
          <li className="absolute top-[3.42dvh] left-[36.17vw] text-[clamp(13px,min(1.3vw,2.05dvh),25px)] pointer-events-none">
            <a href="#contact" className="text-white hover:opacity-75 transition-opacity inline-block pointer-events-auto scale-x-[1.168] origin-left">Contact</a>
          </li>
        </ul>
      </nav>

      {/* 3. Secure System Pill */}
      <a
        href="#secure"
        className="hidden md:inline-flex absolute top-[2.33dvh] right-[7.5vw] h-[clamp(34px,4.43dvh,57px)] px-[clamp(16px,1.8vw,28px)] rounded-full bg-white text-[#161616] text-[clamp(13px,min(1.3vw,2.05dvh),25px)] items-center justify-center font-normal tracking-wide z-20 hover:scale-105 transition-transform"
      >
        Secure system
      </a>

      {/* 4. Wordmark RESPONSIVE */}
      <h1 className="orbit-word absolute top-[13.5dvh] left-0 w-full text-center m-0 p-0 font-normal leading-[0.9] tracking-[0.025em] z-10 pointer-events-none whitespace-nowrap">
        <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
          <span className="inline-block">
            <span className="text-white"><span className="inline-block scale-x-[1.06] origin-center mr-[0.02em]">R</span>ESP</span>
            <span className="bg-gradient-to-b from-[#ffc5dc] to-[#fd86db] bg-clip-text text-transparent inline-block">ONSIVE</span>
          </span>
        </span>
      </h1>

      {/* 5. Flower Stack (High Performance Direct Canvas Compositing) */}
      <div
        ref={flowerRef}
        id="flowerContainer"
        className="absolute top-[14.75dvh] left-[49.12vw] h-[106.1dvh] -translate-x-1/2 pointer-events-none z-10"
      >
        <img
          className="invisible h-full w-auto block pointer-events-none"
          src={FLOWER_BG_URL}
          alt=""
          aria-hidden="true"
        />
        {/* Base Background Flower */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={FLOWER_BG_URL}
            alt="Pixel-art pink and violet lily"
            className="w-full h-full object-cover block pointer-events-none"
          />
        </div>

        {/* Revealed Top Flower on Hardware-Accelerated Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none z-10"
        />
      </div>

      {/* 6. Corner Copy */}
      <div className="absolute bottom-[4.36dvh] left-[3.18vw] text-[#f7f7f7] text-[clamp(14px,min(1.4vw,2.1dvh),27px)] leading-[1.35] z-20 pointer-events-none whitespace-nowrap">
        <div className="inline-block scale-x-[1.073] origin-bottom-left">
          Every workflow,<br />intelligently connected.
        </div>
      </div>

      <div className="absolute bottom-[4.36dvh] left-[78.28vw] text-[#f7f7f7] text-[clamp(14px,min(1.4vw,2.1dvh),27px)] leading-[1.35] z-20 pointer-events-none whitespace-nowrap">
        <div className="inline-block scale-x-[1.058] origin-bottom-left">
          Less manual work.<br />More meaningful output.
        </div>
      </div>

      {/* Mobile Burger & Menu */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex absolute top-[2.14dvh] right-[4vw] w-11 h-11 rounded-full bg-white text-black items-center justify-center z-30 cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        <span className="w-5 flex flex-col gap-1.5">
          <span className={`block w-full h-0.5 bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-full h-0.5 bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-full h-0.5 bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </span>
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#161616]/95 backdrop-blur-xl z-20 flex flex-col justify-between p-8 pt-24 md:hidden">
          <ul className="list-none p-0 m-0 flex flex-col gap-6 text-2xl font-serif">
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#resources" onClick={() => setIsMenuOpen(false)}>Resources</a></li>
            <li><a href="#benefits" onClick={() => setIsMenuOpen(false)}>Benefits</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
          <a
            href="#secure"
            className="w-full py-3.5 rounded-full bg-white text-black text-center font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Secure system
          </a>
        </div>
      )}
    </section>
  );
};

export default ResponsiveSection;
