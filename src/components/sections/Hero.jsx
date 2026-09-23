import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { scrollToTarget } from '../providers/SmoothScroll';
import './Hero.css';

/**
 * =========================================================================
 * 3D LAYERED KINETIC MARQUEE HERO COMPONENT
 * =========================================================================
 * 
 * Features a high-impact kinetic typography marquee sandwich:
 * - Back Marquee: Continuous infinite typography scrolling behind center subject
 * - Centerpiece: 3D classical sculpture bust with subtle mouse parallax
 * - Front Marquee: Typography scrolling directly in front of center subject
 * - Content & Actions: Editorial subtitle, description, and interactive buttons
 * - Ambient backdrop: Aurora glows, technical dot matrix, and subtle film grain
 * =========================================================================
 */

const Hero = ({
  displayWord = 'SAILESH',
  brandName = 'Sailesh',
  subtitle = 'Interactive Frontend & Full-Stack Developer',
  description = '',
  navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
  centerImage = '/images/hero.png',
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Subtle Mouse Parallax Tracker
  useEffect(() => {
    if (prefersReducedMotion) return;

    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      // Don't trigger parallax re-renders when hero is scrolled away
      if (window.scrollY > 300) return;
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
  }, [prefersReducedMotion]);

  // Smooth scroll handler
  const scrollTo = (id) => {
    scrollToTarget(id, -70);
  };

  // Only apply mouse parallax on devices with a fine pointer (mouse, not touch)
  const hasFinePtrRef = useRef(
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  );
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Display text parallax offset — on mobile no inline transform so CSS controls layout cleanly.
  // On desktop we use mouse parallax translate3d.
  const textTransform = (prefersReducedMotion || !hasFinePtrRef.current || isMobileScreen)
    ? 'none'
    : `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 8}px, 0)`;

  // Center image parallax offset
  const centerImageTransform = prefersReducedMotion || isMobileScreen
    ? 'translate(-50%, -50%)'
    : `translate(calc(-50% + ${mouseOffset.x * 14}px), calc(-50% + ${mouseOffset.y * 10}px))`;

  // Ambient glows parallax offset
  const ambientTransform = prefersReducedMotion || isMobileScreen
    ? 'none'
    : `translate3d(${mouseOffset.x * -16}px, ${mouseOffset.y * -10}px, 0)`;

  return (
    <section
      id="home"
      ref={heroRef}
      aria-label="Hero Section"
      className="editorial-hero-container"
    >


      {/* ── AMBIENT GLOWS & GRID BACKDROP (z-index: 1) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
        style={{
          transform: ambientTransform,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
          willChange: 'transform',
          contain: 'paint',
        }}
      >
        {/* Soft Violet/Purple Aurora Glow (Top Left/Center) */}
        <div
          className="absolute -top-[15%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full hero-ambient-glow-1"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.16) 0%, rgba(99, 102, 241, 0.08) 45%, transparent 70%)',
            filter: 'blur(75px)',
          }}
        />

        {/* Deep Cyan/Blue Ambient Glow (Center Right) */}
        <div
          className="absolute top-[25%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full hero-ambient-glow-2"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.14) 0%, rgba(6, 182, 212, 0.06) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Tech subtle dot matrix grid */}
        <div className="absolute inset-0 hero-grid-pattern opacity-40" />

        {/* Vignette gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(6, 8, 11, 0.8) 100%)',
          }}
        />
      </div>

      {/* ── STILL BACKGROUND DISPLAY HEADING (z-index: 10) ── */}
      <div
        className="hero-heading-wrapper absolute inset-x-0 z-[10] flex items-center justify-center pointer-events-none px-4"
        style={{ transform: textTransform, transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)' }}
      >
        <h1 className="hero-display-word">
          {displayWord}
        </h1>
      </div>

      {/* ── CENTER SCULPTURE IMAGE (z-index: 20) ── */}
      <img
        className="center-image"
        src={centerImage}
        alt="Classical Sculpture Artpiece"
        style={{
          transform: centerImageTransform,
          transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
        }}
        loading="eager"
        fetchPriority="high"
      />



      {/* ── BOTTOM CONTENT & ACTIONS (z-index: 35) ── */}
      <div className="hero-content-section">
        <div className="hero-content-wrapper">
          {/* Left Side: Role Title without disturbing the center image */}
          <motion.div
            initial={prefersReducedMotion || isMobileScreen ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 25, x: -15 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={isMobileScreen ? { duration: 0 } : { duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hero-role-block mb-3 sm:mb-6 md:mb-28 lg:mb-36 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl z-20 pointer-events-auto"
          >
            <h2 className="flex flex-col gap-1 sm:gap-2 md:gap-3 text-xs sm:text-base md:text-xl lg:text-[1.75rem] font-semibold text-white tracking-wider sm:tracking-wide uppercase">
              {/* Desktop view: 2 lines */}
              <span className="hero-title-desktop block relative left-0 sm:-left-4 md:-left-6">
                INTERACTIVE FRONTEND &
              </span>
              <span className="hero-title-desktop block relative left-0 sm:left-4 md:left-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 font-bold">
                FULL-STACK DEVELOPER
              </span>

              {/* Mobile view: 3 lines */}
              <span className="hero-title-mobile">
                INTERACTIVE FRONTEND
              </span>
              <span className="hero-title-mobile text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 font-bold">
                & FULL-STACK
              </span>
              <span className="hero-title-mobile text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 font-bold">
                DEVELOPER
              </span>
            </h2>
          </motion.div>

          {/* Minimalist Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="hero-actions-group flex items-center gap-2 sm:gap-4 flex-nowrap sm:flex-wrap mb-0 sm:mb-4 md:mb-16"
          >
            <button
              id="hero-explore-work-btn"
              onClick={() => scrollTo('projects')}
              className="apple-glass-btn group cursor-pointer"
            >
              <span>Explore Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
            </button>

            <button
              id="hero-contact-btn"
              onClick={() => scrollTo('contact')}
              className="apple-glass-btn apple-glass-btn-secondary group cursor-pointer"
            >
              <Mail className="w-4 h-4 text-zinc-300 transition-transform duration-500 ease-out group-hover:scale-105" />
              <span>Get in Touch</span>
            </button>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;