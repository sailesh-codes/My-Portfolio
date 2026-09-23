import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * MobileScrollReveal
 * 
 * Silky-smooth, lightweight GSAP scroll reveal for mobile/tablet screens.
 * Uses hardware-accelerated GSAP ScrollTrigger (once: true) to gently lift
 * and fade in elements on mobile without continuous JS physics calculations.
 * Leaves desktop (>= 1024px) 100% untouched.
 */
const MobileScrollReveal = ({
  children,
  className = '',
  yOffset = 24,
  duration = 0.65,
  style = {},
  mobileOnly = true,
  scaleFrom = null,
}) => {
  const containerRef = useRef(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkMedia = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkMedia();
    window.addEventListener('resize', checkMedia);
    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Desktop view: Strictly untouched
    if (mobileOnly && window.innerWidth >= 1024) {
      gsap.set(el, { clearProps: 'all' });
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const fromProps = {
      opacity: 0,
      y: yOffset,
    };
    if (scaleFrom !== null && scaleFrom !== undefined) {
      fromProps.scale = scaleFrom;
    }

    const toProps = {
      opacity: 1,
      y: 0,
      duration: duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true, // Disposes trigger after animation for zero scroll overhead
      },
    };
    if (scaleFrom !== null && scaleFrom !== undefined) {
      toProps.scale = 1;
    }

    // Basic, elegant scroll reveal with GSAP
    const tween = gsap.fromTo(el, fromProps, toProps);

    return () => {
      tween.kill();
    };
  }, [yOffset, duration, mobileOnly, isMobileOrTablet, scaleFrom]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};

export default MobileScrollReveal;

