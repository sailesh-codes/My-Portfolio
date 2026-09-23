import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import {
  ArrowUp,
  MapPin,
} from 'lucide-react';
import { scrollToTarget } from '../../providers/SmoothScroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerContainerRef = useRef(null);
  const headingMagneticRef = useRef(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Track scroll travel specifically as we transition from the Contact section into the Footer
  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ['start end', 'end end'],
  });

  // 1. Whole Footer Container Reveal Transforms
  const footerY = useTransform(scrollYProgress, [0, 0.85], [100, 0]);
  const footerScale = useTransform(scrollYProgress, [0, 0.85], [0.93, 1.0]);
  const footerOpacity = useTransform(scrollYProgress, [0, 0.35, 0.85], [0.2, 0.85, 1.0]);
  const footerRotateX = useTransform(scrollYProgress, [0, 0.85], [5, 0]);

  // 2. Horizon Reveal Beam at the Contact -> Footer boundary
  const beamScaleX = useTransform(scrollYProgress, [0, 0.75], [0.25, 1.0]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.3, 0.75], [0, 0.9, 0.55]);

  // 3. Ambient lighting bloom
  const glowScale = useTransform(scrollYProgress, [0, 0.85], [0.75, 1.15]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 0.8]);

  // 4. Staggered Top Grid Content (Brand, Bio, Quick Links)
  const gridY = useTransform(scrollYProgress, [0, 0.8], [45, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.25, 0.85, 1.0]);

  // 5. Staggered Bottom Signature Section ("Thrive." + Copyright + Back to Top)
  const bottomY = useTransform(scrollYProgress, [0.08, 0.9], [55, 0]);
  const bottomScale = useTransform(scrollYProgress, [0.08, 0.9], [0.94, 1.0]);
  const bottomOpacity = useTransform(scrollYProgress, [0.08, 0.5, 0.9], [0.3, 0.85, 1.0]);

  // Cursor magnetic physics for the monumental "Thrive." text
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const magneticSpringConfig = { stiffness: 160, damping: 15, mass: 0.15 };
  const magneticSpringX = useSpring(magneticX, magneticSpringConfig);
  const magneticSpringY = useSpring(magneticY, magneticSpringConfig);

  const handleHeadingMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const el = headingMagneticRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;
    magneticX.set(deltaX);
    magneticY.set(deltaY);
  };

  const handleHeadingMouseLeave = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  const quickLinks = [
    { label: 'Home', href: 'home' },
    { label: 'About Me', href: 'about' },
    { label: 'Projects', href: 'projects' },
    { label: 'Skills & Stack', href: 'skills' },
    { label: 'Contact', href: 'contact' },
  ];

  const scrollToSection = (id) => {
    scrollToTarget(id, -90);
  };

  const scrollToTop = () => {
    scrollToTarget(0, 0);
  };

  return (
    <footer
      ref={footerContainerRef}
      className="relative z-20 overflow-hidden bg-transparent pt-6 sm:pt-10"
    >
      {/* 
        Whole Footer Motion Reveal Wrapper:
        Lifts upward, scales up, tilts forward slightly from perspective, 
        and gracefully unmasks as the visitor moves from the Contact section.
      */}
      <motion.div
        style={
          prefersReducedMotion
            ? { opacity: 1 }
            : {
                y: footerY,
                scale: footerScale,
                opacity: footerOpacity,
                rotateX: footerRotateX,
                transformPerspective: 1200,
                transformOrigin: 'top center',
              }
        }
        className="relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-2xl text-neutral-300 pt-16 pb-28 md:pb-12 overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.9)] will-change-transform"
      >
        {/* Horizon Reveal Accent Beam between Contact and Footer */}
        <motion.div
          style={prefersReducedMotion ? {} : { scaleX: beamScaleX, opacity: beamOpacity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/80 via-white/70 to-transparent pointer-events-none origin-center"
        />

        {/* Ambient background glow blooming on scroll */}
        <motion.div
          style={prefersReducedMotion ? {} : { scale: glowScale, opacity: glowOpacity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[16rem] bg-radial from-white/[0.06] via-purple-500/[0.04] to-transparent pointer-events-none blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Main Footer Grid: Left Info & Right Quick Links (Staggered parallax rise) */}
          <motion.div
            style={prefersReducedMotion ? {} : { y: gridY, opacity: gridOpacity }}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 pb-12 border-b border-white/10 will-change-transform"
          >
            {/* Brand & Bio */}
            <div className="space-y-4 max-w-xl">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-wider text-white uppercase font-mono block">
                SAILESH<span className="text-white/40">.</span>
              </span>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
                Full-Stack Developer passionate about crafting modern, high-performance web applications with seamless animations.
              </p>

              <div className="flex items-center gap-2 text-sm sm:text-base text-neutral-400 font-normal pt-1">
                <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-5 md:min-w-[200px]">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="group flex items-center gap-2.5 text-base sm:text-lg text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      <span className="h-0.5 w-3 bg-neutral-600 group-hover:w-6 group-hover:bg-white transition-all duration-300" />
                      <span className="font-normal">{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Bottom Section: "Thrive." text on the Left Corner & Copyright on the Right Corner */}
          <motion.div
            style={prefersReducedMotion ? {} : { y: bottomY, scale: bottomScale, opacity: bottomOpacity }}
            className="pt-10 sm:pt-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 select-none will-change-transform"
          >
            {/* Left Corner: Monumental "Thrive." Signature Text with Cursor Magnetic effect */}
            <div className="relative flex items-center justify-start overflow-visible">
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[55vw] max-w-[550px] h-[160px] bg-white/[0.04] blur-3xl pointer-events-none rounded-full" />
              <div className="text-left">
                <motion.div
                  ref={headingMagneticRef}
                  onMouseMove={handleHeadingMouseMove}
                  onMouseLeave={handleHeadingMouseLeave}
                  style={{ x: magneticSpringX, y: magneticSpringY }}
                  className="cursor-default select-none inline-block will-change-transform ml-0 sm:-ml-6 md:-ml-10 lg:-ml-14 py-2 px-1"
                >
                  <h2 className="footer-monument-text text-[clamp(3.5rem,17.5vw,18rem)] tracking-tight text-left">
                    Thrive.
                  </h2>
                </motion.div>
              </div>
            </div>

            {/* Right Corner: Copyright, Disclaimer & Back to Top */}
            <div className="flex flex-col items-start lg:items-end gap-5 text-sm text-neutral-400 pb-2 lg:pb-4 shrink-0">
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer"
                aria-label="Back to top of page"
              >
                <span className="text-sm font-medium">Back to top</span>
                <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
              </button>

              <div className="text-left lg:text-right space-y-1">
                <p className="text-sm sm:text-base text-neutral-300 font-medium">
                  © {currentYear} Sailesh. All rights reserved.
                </p>
                <p className="text-xs sm:text-sm text-neutral-500">
                  (Disclaimer: All bugs were harmed during development)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;