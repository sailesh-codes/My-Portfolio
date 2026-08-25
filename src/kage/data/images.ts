/**
 * Self-contained visual asset generator for Kage chapters.
 * Generates rich, atmospheric 16:9 canvas artwork data URLs for each chapter,
 * ensuring zero external 404s, zero Vite security allowlist blocks, and complete subpath compatibility.
 */

function createChapterArtwork(chapterKey: string): string {
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const w = canvas.width;
  const h = canvas.height;

  // 1. Dark Base Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#060709');
  bgGrad.addColorStop(0.5, '#0E131B');
  bgGrad.addColorStop(1, '#08090C');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  if (chapterKey === 'threshold') {
    // Chapter 01: Grand Vermilion Torii Gate in Mist
    const moonGlow = ctx.createRadialGradient(w * 0.5, h * 0.35, 10, w * 0.5, h * 0.35, 300);
    moonGlow.addColorStop(0, 'rgba(200, 59, 43, 0.4)');
    moonGlow.addColorStop(0.5, 'rgba(229, 169, 59, 0.15)');
    moonGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = moonGlow;
    ctx.fillRect(0, 0, w, h);

    // Torii Gate Timbers
    ctx.fillStyle = '#C83B2B'; // Vermilion Red
    ctx.fillRect(w * 0.28, h * 0.25, w * 0.44, 28); // Top Lintel (Kasamagi)
    ctx.fillRect(w * 0.3, h * 0.32, w * 0.4, 20); // Lower Lintel (Nuki)
    ctx.fillRect(w * 0.33, h * 0.25, 34, h * 0.65); // Left Pillar (Hashira)
    ctx.fillRect(w * 0.64, h * 0.25, 34, h * 0.65); // Right Pillar (Hashira)

    // Lantern Glows
    for (const lx of [w * 0.22, w * 0.78]) {
      const g = ctx.createRadialGradient(lx, h * 0.7, 5, lx, h * 0.7, 80);
      g.addColorStop(0, 'rgba(245, 185, 75, 0.8)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(lx, h * 0.7, 80, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (chapterKey === 'ascent') {
    // Chapter 02: Winding Stone Steps & Lanterns
    ctx.fillStyle = '#0B0E14';
    ctx.beginPath();
    ctx.moveTo(w * 0.3, h);
    ctx.lineTo(w * 0.45, h * 0.4);
    ctx.lineTo(w * 0.55, h * 0.4);
    ctx.lineTo(w * 0.7, h);
    ctx.closePath();
    ctx.fill();

    // Lanterns along steps
    for (let i = 0; i < 6; i++) {
      const lx = w * 0.38 + (i % 2 === 0 ? -60 : 60) + i * 20;
      const ly = h * 0.85 - i * 70;
      const g = ctx.createRadialGradient(lx, ly, 4, lx, ly, 60);
      g.addColorStop(0, 'rgba(245, 185, 75, 0.85)');
      g.addColorStop(0.5, 'rgba(200, 100, 30, 0.4)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(lx, ly, 60, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (chapterKey === 'stillness') {
    // Chapter 03: Zen Rock Garden
    ctx.strokeStyle = 'rgba(234, 230, 223, 0.15)';
    ctx.lineWidth = 3;
    for (let r = 50; r < 500; r += 35) {
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.65, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Zen Boulders
    ctx.fillStyle = '#060709';
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.65, 45, 0, Math.PI * 2);
    ctx.arc(w * 0.35, h * 0.7, 30, 0, Math.PI * 2);
    ctx.fill();
  } else if (chapterKey === 'craft') {
    // Chapter 04: Kumiko Woodcraft Lattice Pattern
    const shojiGlow = ctx.createLinearGradient(0, 0, w, h);
    shojiGlow.addColorStop(0, '#E5A93B');
    shojiGlow.addColorStop(1, '#8A4E1B');
    ctx.fillStyle = shojiGlow;
    ctx.fillRect(w * 0.2, h * 0.15, w * 0.6, h * 0.7);

    // Lattice Grid
    ctx.strokeStyle = '#2B1A0E';
    ctx.lineWidth = 6;
    for (let x = w * 0.2; x <= w * 0.8; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, h * 0.15);
      ctx.lineTo(x, h * 0.85);
      ctx.stroke();
    }
    for (let y = h * 0.15; y <= h * 0.85; y += 50) {
      ctx.beginPath();
      ctx.moveTo(w * 0.2, y);
      ctx.lineTo(w * 0.8, y);
      ctx.stroke();
    }
  } else {
    // Chapter 05: Vermilion Moon Summit
    const moon = ctx.createRadialGradient(w * 0.7, h * 0.3, 10, w * 0.7, h * 0.3, 160);
    moon.addColorStop(0, '#F5C28B');
    moon.addColorStop(0.4, '#C83B2B');
    moon.addColorStop(1, 'transparent');
    ctx.fillStyle = moon;
    ctx.beginPath();
    ctx.arc(w * 0.7, h * 0.3, 160, 0, Math.PI * 2);
    ctx.fill();
  }

  // Atmospheric Grain Vignette
  const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.7);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(1, 'rgba(6, 7, 9, 0.85)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  return canvas.toDataURL('image/png');
}

export const CHAPTER_IMAGES: Record<string, string> = {
  threshold: createChapterArtwork('threshold'),
  ascent: createChapterArtwork('ascent'),
  stillness: createChapterArtwork('stillness'),
  craft: createChapterArtwork('craft'),
  afterlight: createChapterArtwork('afterlight'),
};
