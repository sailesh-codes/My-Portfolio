import React, { useEffect, useRef } from 'react';
import { getCameraStateAtScroll, CameraState } from './CameraPath';
import { AtmosphereSystem } from './Atmosphere';

interface KageCanvasProps {
  scrollProgress: number;
}

export const KageCanvas: React.FC<KageCanvasProps> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const atmosphereRef = useRef<AtmosphereSystem>(new AtmosphereSystem());
  const cameraStateRef = useRef<CameraState>(getCameraStateAtScroll(0));

  useEffect(() => {
    cameraStateRef.current = getCameraStateAtScroll(scrollProgress);
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener('resize', resize);
    resize();

    // Render loop
    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Update particles
      atmosphereRef.current.update(dt);

      const width = canvas.width;
      const height = canvas.height;
      const camera = cameraStateRef.current;

      // 1. Dark Base Background & Palette: Near-black (#0A0B0E) & Blue-Charcoal (#141820)
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#060709');
      bgGradient.addColorStop(0.4, '#0D1117');
      bgGradient.addColorStop(0.75, '#131922');
      bgGradient.addColorStop(1, '#0A0B0E');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Large Vermilion Moon (Chapter 5 & distant background element)
      const moonX = width * 0.72 + (camera.position.x * width * 0.005);
      const moonY = height * (0.28 - scrollProgress * 0.08) - (camera.position.y * height * 0.004);
      const moonRadius = Math.min(width, height) * 0.14;

      // Outer Vermilion Halo Glow
      const haloGrad = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.4, moonX, moonY, moonRadius * 2.8);
      haloGrad.addColorStop(0, 'rgba(200, 59, 43, 0.45)');
      haloGrad.addColorStop(0.35, 'rgba(229, 169, 59, 0.18)');
      haloGrad.addColorStop(0.7, 'rgba(20, 24, 32, 0.08)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Core Vermilion Moon Disk
      const moonGrad = ctx.createRadialGradient(moonX - moonRadius * 0.3, moonY - moonRadius * 0.3, 0, moonX, moonY, moonRadius);
      moonGrad.addColorStop(0, '#F5C28B'); // Warm bone white edge highlight
      moonGrad.addColorStop(0.35, '#E5A93B'); // Amber glow
      moonGrad.addColorStop(0.7, '#C83B2B'); // Vermilion red core
      moonGrad.addColorStop(1, '#8A1E14'); // Deep shadow outline

      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle Lunar Texture Shading
      ctx.fillStyle = 'rgba(20, 10, 10, 0.18)';
      ctx.beginPath();
      ctx.arc(moonX + moonRadius * 0.2, moonY - moonRadius * 0.1, moonRadius * 0.35, 0, Math.PI * 2);
      ctx.arc(moonX - moonRadius * 0.3, moonY + moonRadius * 0.25, moonRadius * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // 3. Procedural Mountain Ridge Silhouettes & Depth Haze
      const time = now * 0.0005;
      
      // Far Mountain Layer
      ctx.fillStyle = '#0F141C';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 40) {
        const nx = x / width;
        const mountainY = height * 0.58 + Math.sin(nx * 6 + 1.2) * 45 + Math.cos(nx * 12) * 20 - (camera.position.y * 3);
        ctx.lineTo(x, mountainY);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Mid Mountain Layer with Shoji Light Glows & Torii Silhouette
      ctx.fillStyle = '#0B0D12';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 30) {
        const nx = x / width;
        const mountainY = height * 0.68 + Math.sin(nx * 8 + time * 0.2) * 35 + Math.sin(nx * 18) * 15;
        ctx.lineTo(x, mountainY);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // 4. Render Procedural 3D Stone Lanterns (Tōrō) with Flickering Amber Flame
      const lanternPositions = [
        { x: width * 0.18, y: height * 0.76, scale: 0.8 },
        { x: width * 0.32, y: height * 0.82, scale: 1.1 },
        { x: width * 0.65, y: height * 0.74, scale: 0.7 },
        { x: width * 0.84, y: height * 0.79, scale: 1.0 },
      ];

      for (let idx = 0; idx < lanternPositions.length; idx++) {
        const lp = lanternPositions[idx];
        const flicker = Math.sin(time * 12 + idx * 3) * 0.12 + Math.cos(time * 25 + idx) * 0.08 + 0.9;
        
        // Warm Amber Point-Light Glow around Tōrō
        const lanternGlow = ctx.createRadialGradient(lp.x, lp.y, 4, lp.x, lp.y, 90 * lp.scale);
        lanternGlow.addColorStop(0, `rgba(245, 185, 75, ${0.75 * flicker})`);
        lanternGlow.addColorStop(0.4, `rgba(200, 110, 30, ${0.3 * flicker})`);
        lanternGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = lanternGlow;
        ctx.beginPath();
        ctx.arc(lp.x, lp.y, 90 * lp.scale, 0, Math.PI * 2);
        ctx.fill();

        // Lantern Silhouette Base
        ctx.fillStyle = '#060709';
        const w = 18 * lp.scale;
        const h = 42 * lp.scale;
        ctx.fillRect(lp.x - w / 2, lp.y - h / 2, w, h);
        
        // Flame Window Glow
        ctx.fillStyle = `rgba(255, 210, 120, ${0.9 * flicker})`;
        ctx.fillRect(lp.x - w * 0.3, lp.y - h * 0.2, w * 0.6, h * 0.35);
      }

      // 5. Render Atmospheric Particle Layers (Leaves, Embers, Rain)
      
      // Floating Warm Embers
      for (const p of atmosphereRef.current.emberParticles) {
        const px = (p.x / 20 + 0.5) * width;
        const py = (1 - p.y / 20) * height;
        const pSize = p.size * (width * 0.004);

        const emberGrad = ctx.createRadialGradient(px, py, 0, px, py, pSize * 2.5);
        emberGrad.addColorStop(0, `rgba(255, 200, 90, ${p.alpha})`);
        emberGrad.addColorStop(0.5, `rgba(225, 120, 35, ${p.alpha * 0.6})`);
        emberGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = emberGrad;
        ctx.beginPath();
        ctx.arc(px, py, pSize * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Drifting Amber & Vermilion Maple Leaves
      for (const p of atmosphereRef.current.leafParticles) {
        const px = (p.x / 35 + 0.5) * width;
        const py = (1 - p.y / 30) * height;
        const pSize = p.size * (width * 0.012);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(${Math.floor(p.color[0]*255)}, ${Math.floor(p.color[1]*255)}, ${Math.floor(p.color[2]*255)}, ${p.alpha})`;

        // Simple Japanese Maple Leaf 5-point shape
        ctx.beginPath();
        ctx.moveTo(0, -pSize);
        ctx.lineTo(pSize * 0.4, -pSize * 0.3);
        ctx.lineTo(pSize, -pSize * 0.2);
        ctx.lineTo(pSize * 0.5, pSize * 0.4);
        ctx.lineTo(0, pSize * 0.8);
        ctx.lineTo(-pSize * 0.5, pSize * 0.4);
        ctx.lineTo(-pSize, -pSize * 0.2);
        ctx.lineTo(-pSize * 0.4, -pSize * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Falling Rain Streak Lines
      ctx.strokeStyle = 'rgba(180, 205, 240, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const p of atmosphereRef.current.rainParticles) {
        const px = (p.x / 40 + 0.5) * width;
        const py = (1 - p.y / 35) * height;
        const len = p.size * 22;
        ctx.moveTo(px, py);
        ctx.lineTo(px - 1.5, py + len);
      }
      ctx.stroke();

      // 6. Post-Processing Effects: Restrained Bloom, Vignette, Depth Haze, & Film Grain
      
      // Vignette Shader Overlay
      const vignette = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.35, width / 2, height / 2, Math.max(width, height) * 0.8);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.65, 'rgba(6, 7, 9, 0.4)');
      vignette.addColorStop(1, 'rgba(4, 5, 7, 0.88)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Subtle Film Grain Overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let i = 0; i < 40; i++) {
        const gx = Math.random() * width;
        const gy = Math.random() * height;
        ctx.fillRect(gx, gy, 2, 2);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};
