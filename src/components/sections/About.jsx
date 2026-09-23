import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mathematical parametric shapes tailored for modern tech & creative design
// 12 unique, non-overlapping shapes across all 3 specializations
function generateShapePoints(type, numPoints = 120) {
  const points = [];
  const cx = 50;
  const cy = 50;
  const R = 37; // radius

  for (let i = 0; i < numPoints; i++) {
    const th = (i / numPoints) * Math.PI * 2;
    let r = R;

    switch (type) {
      // -------------------------------------------------------------
      // Section 1: Creative & Interactive Frontend Shapes
      // -------------------------------------------------------------
      case 'starburst': // 4-Point AI Sparkle Star
        r = R * (0.6 + 0.44 * Math.cos(4 * th));
        break;

      case 'liquidBlob': // Organic Asymmetric Amoeba
        r = R * (0.8 + 0.22 * Math.sin(th) + 0.14 * Math.cos(2 * th) - 0.09 * Math.sin(3 * th));
        break;

      case 'waveFlower': // 5-Petal Organic Bloom
        r = R * (0.82 + 0.22 * Math.sin(5 * th));
        break;

      case 'teardrop': // Fluid Kinetic Droplet
        r = R * (0.8 + 0.26 * Math.cos(th) + 0.12 * Math.sin(2 * th));
        break;

      // -------------------------------------------------------------
      // Section 2: Systems & Full Stack Architecture Shapes
      // -------------------------------------------------------------
      case 'trigon': // Reuleaux 3-Lobe Rounded Triangle
        r = R * (0.84 + 0.26 * Math.cos(3 * th));
        break;

      case 'hexPrism': // 6-Sided Tech Honeycomb Crystal
        r = R * (0.88 + 0.16 * Math.cos(6 * th));
        break;

      case 'squircle': // Smooth Apple-Style Superellipse
        r = R * (0.92 + 0.12 * Math.cos(4 * th));
        break;

      case 'rhombus': // Diamond Monolith Facet
        r = R * (0.82 + 0.26 * Math.cos(2 * th) + 0.08 * Math.cos(4 * th));
        break;

      // -------------------------------------------------------------
      // Section 3: Autonomous & Agentic AI Shapes
      // -------------------------------------------------------------
      case 'neuralOcto': // 8-Lobe Synaptic Neural Wave
        r = R * (0.86 + 0.18 * Math.cos(8 * th));
        break;

      case 'cloverCross': // 4-Loop Quantum Energy Knot
        r = R * (0.74 + 0.32 * Math.abs(Math.sin(2 * th)));
        break;

      case 'decagram': // 10-Lobe High-Frequency Token Pulse
        r = R * (0.88 + 0.14 * Math.sin(10 * th));
        break;

      case 'heptagon': // 7-Point Cyber Decision Lattice
        r = R * (0.84 + 0.22 * Math.cos(7 * th));
        break;

      default:
        r = R;
    }

    points.push({
      x: cx + r * Math.cos(th),
      y: cy + r * Math.sin(th),
    });
  }
  return points;
}

// Interactive Morphing Canvas Component
const MorphCanvas = ({ colorStops, shapeSequence = ['starburst', 'liquidBlob', 'waveFlower', 'teardrop'] }) => {
  const canvasRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pre-generate all shapes in sequence
    const sampledShapes = shapeSequence.map((type) => generateShapePoints(type, 120));
    let animationFrameId;
    let time = 0;

    const render = () => {
      if (!isPausedRef.current) {
        time += 0.007; // smooth organic morph speed
      }

      const numShapes = sampledShapes.length;
      const currentPhase = time % numShapes;
      const shapeIndexA = Math.floor(currentPhase);
      const shapeIndexB = (shapeIndexA + 1) % numShapes;
      const progress = currentPhase - shapeIndexA;

      // Smooth cubic easing between shape states
      const easeProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const shapeA = sampledShapes[shapeIndexA];
      const shapeB = sampledShapes[shapeIndexB];

      const currentPoints = shapeA.map((ptA, i) => {
        const ptB = shapeB[i];
        // Interpolate position + add subtle fluid wave breathing
        const breath = Math.sin(time * 3 + i * 0.15) * 0.8;
        return {
          x: ptA.x + (ptB.x - ptA.x) * easeProgress + breath * 0.5,
          y: ptA.y + (ptB.y - ptA.y) * easeProgress + breath * 0.5,
        };
      });

      const dpr = window.devicePixelRatio || 1;
      const size = 320;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, size, size);

      // Create linear gradient
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0.1, colorStops[0]);
      gradient.addColorStop(0.85, colorStops[1]);

      const scale = size / 100;
      ctx.save();
      ctx.scale(scale, scale);

      // Gentle floating rotation
      ctx.translate(50, 50);
      ctx.rotate(Math.sin(time * 0.35) * 0.08);
      ctx.translate(-50, -50);

      // Draw smooth continuous bezier loop
      ctx.beginPath();
      const len = currentPoints.length;
      ctx.moveTo(
        (currentPoints[0].x + currentPoints[len - 1].x) / 2,
        (currentPoints[0].y + currentPoints[len - 1].y) / 2
      );
      for (let i = 0; i < len; i++) {
        const next = currentPoints[(i + 1) % len];
        const midX = (currentPoints[i].x + next.x) / 2;
        const midY = (currentPoints[i].y + next.y) / 2;
        ctx.quadraticCurveTo(currentPoints[i].x, currentPoints[i].y, midX, midY);
      }
      ctx.closePath();

      // Fill with crisp gradient (no glow effect)
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.fillStyle = gradient;
      ctx.fill();

      // Subtle edge highlight
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [colorStops, shapeSequence]);

  return (
    <canvas
      ref={canvasRef}
      onClick={() => {
        isPausedRef.current = !isPausedRef.current;
      }}
      className="w-[130px] h-[130px] sm:w-[200px] sm:h-[200px] lg:w-[320px] lg:h-[320px] cursor-pointer hover:scale-105 transition-transform duration-300"
      title="Click to pause/resume morph"
    />
  );
};

const specializationCards = [
  {
    id: '01',
    number: '01—',
    stickerText: 'CREATIVE & MOTION',
    stickerBg: '#FF7744',
    stickerRotate: '-rotate-12',
    stickerClass: '-top-3 left-16 sm:left-24',
    title: 'Interactive Frontend Developer',
    roleIndex: '(1)',
    description:
      'Designing fluid, visually captivating digital interfaces that merge motion, modern typography, and responsive user interactions.',
    tags: ['Creative Motion', 'Fluid UI', 'Visual Design', 'Micro-interactions'],
    glowColor: 'rgba(255, 119, 68, 0.25)',
    canvasGradient: ['rgb(255, 135, 9)', 'rgb(247, 189, 248)'],
    shapeSequence: ['starburst', 'liquidBlob', 'waveFlower', 'teardrop'],
  },
  {
    id: '02',
    number: '02—',
    stickerText: 'FOUNDER & VENTURES',
    stickerBg: '#C084FC',
    stickerRotate: '-rotate-8',
    stickerClass: '-top-3 left-16 sm:left-24',
    title: 'Founder of Code Craft',
    roleIndex: '(2)',
    description:
      'Directing Code Craft to build bespoke web solutions and modern digital products that empower businesses to grow.',
    tags: ['Digital Strategy', 'Bespoke Web Platforms', 'Product Vision', 'Client Solutions'],
    glowColor: 'rgba(192, 132, 252, 0.25)',
    canvasGradient: ['rgb(192, 132, 252)', 'rgb(96, 165, 250)'],
    shapeSequence: ['trigon', 'hexPrism', 'squircle', 'rhombus'],
  },
  {
    id: '03',
    number: '03—',
    stickerText: 'BACKENDS & AGENTS',
    stickerBg: '#A3E635',
    stickerRotate: '-rotate-12',
    stickerClass: '-top-3 left-16 sm:left-24',
    title: 'Custom Backends & AI Agents',
    roleIndex: '(3)',
    description:
      'Architecting tailored backend solutions, resilient system integrations, and autonomous agent implementations that power intelligent, high-efficiency workflows.',
    tags: ['Custom Backends', 'Autonomous Agents', 'System Architecture', 'Intelligent Workflows'],
    glowColor: 'rgba(163, 230, 53, 0.25)',
    canvasGradient: ['rgb(163, 230, 53)', 'rgb(34, 211, 238)'],
    shapeSequence: ['neuralOcto', 'cloverCross', 'decagram', 'heptagon'],
  },
];

const bioParagraph1 = [
  { text: 'I' },
  { text: 'am' },
  { text: 'an' },
  { text: 'Interactive', bold: true },
  { text: 'Frontend', bold: true },
  { text: 'Developer', bold: true },
  { text: '&' },
  { text: 'Founder', bold: true },
  { text: 'of' },
  { text: 'Code', bold: true },
  { text: 'Craft.', bold: true },
  { text: 'I' },
  { text: 'craft' },
  { text: 'engaging' },
  { text: 'digital' },
  { text: 'experiences,' },
  { text: 'engineer' },
  { text: 'custom', bold: true },
  { text: 'backend', bold: true },
  { text: 'solutions,', bold: true },
  { text: 'and' },
  { text: 'build' },
  { text: 'autonomous', bold: true },
  { text: 'agent', bold: true },
  { text: 'implementations' },
  { text: 'that' },
  { text: 'blend' },
  { text: 'fluid' },
  { text: 'design' },
  { text: 'with' },
  { text: 'intelligent' },
  { text: 'automation.' },
];

const bioParagraph2 = [
  { text: 'At' },
  { text: 'Code Craft,', isLink: true, href: 'https://www.codecraftnet.com/' },
  { text: 'I' },
  { text: 'lead' },
  { text: 'the' },
  { text: 'creation' },
  { text: 'of' },
  { text: 'bespoke' },
  { text: 'web' },
  { text: 'solutions,' },
  { text: 'turning' },
  { text: 'ambitious' },
  { text: 'concepts' },
  { text: 'into' },
  { text: 'modern,' },
  { text: 'high-performance' },
  { text: 'digital' },
  { text: 'products' },
  { text: 'built' },
  { text: 'to' },
  { text: 'scale.' },
];

const About = () => {
  const sectionRef = useRef(null);
  const bioStageRef = useRef(null);
  const headingRevealRef = useRef(null);
  const headingMagneticRef = useRef(null);
  const horizontalRef = useRef(null);
  const bioContainerRef = useRef(null);
  const bioRoleRef = useRef(null);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [headingMagneticOffset, setHeadingMagneticOffset] = useState({ x: 0, y: 0 });
  const [isHeadingHovered, setIsHeadingHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Screen size detector for responsive mobile/tablet layout
  useEffect(() => {
    const checkScreen = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Section-wide mouse parallax tracker (active when About section is in view)
  useEffect(() => {
    if (prefersReducedMotion || isMobileOrTablet) return;

    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Track when About section is in or near viewport
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX / innerWidth - 0.5) * 2;
        const normY = (e.clientY / innerHeight - 0.5) * 2;
        setMouseOffset({ x: normX, y: normY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, isMobileOrTablet]);

  // Magnetic attraction when hovering near/over the "About Me" heading
  const handleHeadingMouseMove = (e) => {
    if (prefersReducedMotion || isMobileOrTablet) return;
    const el = headingMagneticRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;

    setHeadingMagneticOffset({ x: deltaX, y: deltaY });
    setIsHeadingHovered(true);

    gsap.to(el, {
      x: deltaX,
      y: deltaY,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleHeadingMouseLeave = () => {
    if (prefersReducedMotion || isMobileOrTablet) return;
    const el = headingMagneticRef.current;
    if (!el) return;

    setIsHeadingHovered(false);
    setHeadingMagneticOffset({ x: 0, y: 0 });

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.85,
      ease: 'elastic.out(1.1, 0.4)',
      overwrite: 'auto',
    });
  };

  // Centerpiece visual transform matching Hero's centerImageTransform
  const visualTransform = prefersReducedMotion || isMobileOrTablet
    ? 'none'
    : `translate3d(${mouseOffset.x * 20}px, ${mouseOffset.y * 14}px, 0)`;

  // Ambient backdrop glow transform matching Hero's ambientTransform (inverted depth)
  const aboutAmbientTransform = prefersReducedMotion || isMobileOrTablet
    ? 'none'
    : `translate3d(${mouseOffset.x * -16}px, ${mouseOffset.y * -12}px, 0)`;

  // Editorial content / subtitle transform
  const aboutContentTransform = prefersReducedMotion || isMobileOrTablet
    ? 'none'
    : `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 4}px, 0)`;

  // GSAP animation for heading entrance and scroll-to-reveal bio text
  // Desktop has full ScrollTrigger pinning; Mobile/Tablet has normal, unpinned, 100% visible layout
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mm = gsap.matchMedia();

    // ── DESKTOP (min-width: 1024px): 100% UNTOUCHED ORIGINAL SCROLLTRIGGERS ──
    mm.add('(min-width: 1024px)', () => {
      // 1. Initial heading bounce entrance
      gsap.fromTo(
        headingRevealRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: bioStageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Role header entrance
      if (bioRoleRef.current) {
        gsap.fromTo(
          bioRoleRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bioStageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Scroll to reveal effect for About Me bio text during the stopped pin stage
      // The full reveal finishes completely before the section unpins and moves to specializations
      const words = gsap.utils.toArray('.about-reveal-word');
      if (words.length > 0 && bioStageRef.current) {
        if (prefersReduced) {
          gsap.set(words, { opacity: 1, y: 0, filter: 'none' });
        } else {
          gsap.fromTo(
            words,
            {
              opacity: 0.15,
              y: 8,
              filter: 'blur(2px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              stagger: {
                each: 0.025,
                from: 'start',
              },
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bioStageRef.current,
                start: 'top top',
                end: 'bottom 25%',
                scrub: 0.8,
              },
            }
          );
        }
      }
    });

    // ── MOBILE & TABLET (max-width: 1023px): Fluid scroll-to-reveal effect for About section ──
    mm.add('(max-width: 1023px)', () => {
      if (prefersReduced) {
        gsap.set(headingRevealRef.current, { y: 0, opacity: 1, scale: 1, clearProps: 'transform' });
        if (bioRoleRef.current) {
          gsap.set(bioRoleRef.current, { y: 0, opacity: 1, clearProps: 'transform' });
        }
        const words = gsap.utils.toArray('.about-reveal-word');
        gsap.set(words, { opacity: 1, y: 0, filter: 'none', clearProps: 'all' });
        return;
      }

      // 1. Heading entrance on scroll
      if (headingRevealRef.current) {
        gsap.fromTo(
          headingRevealRef.current,
          { y: 35, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRevealRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Role header entrance ("Hi, I'm Sailesh.") on scroll
      if (bioRoleRef.current) {
        gsap.fromTo(
          bioRoleRef.current,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bioRoleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Word-by-word scroll-to-reveal effect for About Me bio text
      const words = gsap.utils.toArray('.about-reveal-word');
      if (words.length > 0 && bioContainerRef.current) {
        gsap.fromTo(
          words,
          {
            opacity: 0.18,
            y: 5,
            filter: 'blur(1.5px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: {
              each: 0.03,
              from: 'start',
            },
            ease: 'power1.out',
            scrollTrigger: {
              trigger: bioContainerRef.current,
              start: 'top 78%',
              end: 'bottom 45%',
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  // Framer Motion scroll tracking for horizontal section
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ['start start', 'end end'],
  });

  // Separate scroll plateaus: Each card rests centered on screen, then smoothly transitions to next
  // 0.00 -> 0.22: Card 01 rests centered at 0vw
  // 0.22 -> 0.38: Smooth slide to Card 02
  // 0.38 -> 0.62: Card 02 rests centered at -100vw
  // 0.62 -> 0.78: Smooth slide to Card 03
  // 0.78 -> 1.00: Card 03 rests centered at -200vw
  const x = useTransform(
    scrollYProgress,
    [0, 0.22, 0.38, 0.62, 0.78, 1],
    ['0vw', '0vw', '-100vw', '-100vw', '-200vw', '-200vw']
  );

  return (
    <section id="about" ref={sectionRef} className="relative w-full text-white">
      {/* ------------------------------------------------------------- */}
      {/* PART 1: About Me Bio Stage (Pinned on Desktop, Natural on Mobile/Tab) */}
      {/* ------------------------------------------------------------- */}
      <div 
        ref={bioStageRef} 
        className={isMobileOrTablet ? "relative w-full h-auto py-14 sm:py-20" : "relative w-full h-[220vh] sm:h-[240vh]"}
      >
        {/* Viewport Window (Sticky on desktop, static flow on mobile/tablet) */}
        <div className={isMobileOrTablet ? "relative w-full flex flex-col justify-center items-center px-6 sm:px-8 pb-8" : "sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden px-5 sm:px-8 pb-16 sm:pb-0"}>
          {/* Ambient Glow Backdrop Layer */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[650px] h-[300px] rounded-full pointer-events-none opacity-30 blur-[90px]"
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 70%)',
              transform: aboutAmbientTransform,
              transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
              willChange: 'transform',
            }}
          />

          <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col justify-center">
            {/* Section Header with balanced spacing */}
            <div className="text-center mb-4 sm:mb-10 pb-2 sm:pb-8 relative z-10">
              <div ref={headingRevealRef} className="inline-block relative">
                <div
                  ref={headingMagneticRef}
                  onMouseMove={handleHeadingMouseMove}
                  onMouseLeave={handleHeadingMouseLeave}
                  className="cursor-default select-none py-1 px-4 pb-2 sm:pb-3 inline-block"
                  style={{
                    willChange: 'transform',
                  }}
                >
                  <h2 className="about-display-word">
                    About Me
                  </h2>
                </div>
              </div>
            </div>

            {/* Bio Content Container with Scroll-to-Reveal Effect on Desktop & Mobile */}
            <div
              ref={bioContainerRef}
              style={{
                transform: aboutContentTransform,
                transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
                willChange: 'transform',
              }}
              className="relative w-full"
            >
              {/* Casual Header Title */}
              <div ref={bioRoleRef} className="mb-5 sm:mb-7 text-center sm:text-left px-1 sm:px-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-snug">
                  Hi, I'm Sailesh.
                </h3>
              </div>

              {/* Body Paragraphs with Balanced Editorial Typography */}
              <div className="space-y-5 sm:space-y-6 text-[1.125rem] sm:text-xl md:text-2xl lg:text-[1.75rem] leading-[1.68] sm:leading-[1.48] font-medium tracking-tight select-none text-left px-1 sm:px-0">
                <p className="py-0.5 sm:py-0">
                  {bioParagraph1.map((item, idx) => (
                    <span
                      key={idx}
                      className={`about-reveal-word inline-block mr-[0.28em] my-0.5 sm:my-0 will-change-transform ${
                        item.bold ? 'font-bold text-white' : 'font-normal text-neutral-300'
                      }`}
                    >
                      {item.text}
                    </span>
                  ))}
                </p>
                <p className="py-0.5 sm:py-0">
                  {bioParagraph2.map((item, idx) => (
                    <span
                      key={idx}
                      className="about-reveal-word inline-block mr-[0.28em] my-0.5 sm:my-0 will-change-transform font-normal text-neutral-300"
                    >
                      {item.isLink ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-bold underline underline-offset-8 decoration-white/40 hover:decoration-white hover:text-white transition-colors cursor-pointer"
                        >
                          {item.text}
                        </a>
                      ) : (
                        item.text
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* PART 2: Specializations (Desktop Pinned Horizontal Track Only) */}
      {/* --------------------------------------------------------------------- */}
      {!isMobileOrTablet && (
        <div
          ref={horizontalRef}
          className="relative w-full h-[380vh] -mt-4"
        >
          {/* Desktop: 100% UNTOUCHED Full Screen Pinned Horizontal Track (300vw) */}
          <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden pb-16 sm:pb-0">
            <div className="w-full z-10 overflow-visible">
              <motion.div
                style={{ x }}
                className="flex items-center w-[300vw]"
              >
                {specializationCards.map((card) => (
                  <div
                    key={card.id}
                    className="w-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 shrink-0"
                  >
                    {/* Two-column layout: Text on Left, Morphing Canvas on Right */}
                    <div className="relative w-full max-w-6xl 2xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 lg:gap-14 items-center">
                      {/* Ambient Glow Aura in Background */}
                      <div
                        style={{ backgroundColor: card.glowColor }}
                        className="absolute -top-32 -left-20 w-[550px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-40"
                      />

                      {/* Left Column: Massive Number, Sticker, Title, Description, and Tags */}
                      <div className="lg:col-span-7 relative z-10">
                        {/* Top: Big Headline Number + Tilted Tape Sticker */}
                        <div className="relative inline-block select-none">
                          <span
                            className="font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none text-white block select-none drop-shadow-[0_4px_30px_rgba(255,255,255,0.14)]"
                            style={{ fontFamily: "'Space Grotesk', 'Krona One', sans-serif" }}
                          >
                            {card.number}
                          </span>

                          <div
                            style={{ backgroundColor: card.stickerBg }}
                            className={`absolute ${card.stickerClass} ${card.stickerRotate} px-2.5 sm:px-4 py-0.5 sm:py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.5)] rounded-[3px] border border-black/20 z-20 select-none transition-transform duration-300 hover:scale-105`}
                          >
                            <span className="font-black tracking-wider text-[9px] sm:text-xs md:text-sm text-black uppercase block whitespace-nowrap">
                              {card.stickerText}
                            </span>
                          </div>
                        </div>

                        {/* Clean Horizontal Divider Line */}
                        <div className="w-full h-px bg-white/15 mt-2 sm:mt-5 lg:mt-7 mb-3 sm:mb-6 lg:mb-8" />

                        {/* Topic Title */}
                        <h3 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-1.5 sm:mb-4">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-neutral-300 font-normal leading-relaxed mb-2.5 sm:mb-6 max-w-xl line-clamp-2 sm:line-clamp-none">
                          {card.description}
                        </p>

                        {/* Pill Chips */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
                          {card.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs md:text-sm font-medium text-neutral-300 backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Morphing Canvas Graphic (Revealed on Scroll) */}
                      <div className="lg:col-span-5 flex items-center justify-center relative z-10">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.78, y: 25 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                          viewport={{ once: false, amount: 0.25 }}
                          className="relative flex items-center justify-center"
                        >
                          <div
                            style={{
                              transform: visualTransform,
                              transition: 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)',
                              willChange: 'transform',
                            }}
                          >
                            <MorphCanvas
                              colorStops={card.canvasGradient}
                              shapeSequence={card.shapeSequence}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;