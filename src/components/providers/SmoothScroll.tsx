import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Smooth cubic bezier easing for programmatic jumps:
 * Starts gently (velocity 0, eliminating dropped frames on initial frame),
 * glides quickly through the middle, and softly settles into the destination.
 */
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * SmoothScroll component initializes Lenis smooth scrolling
 * and seamlessly synchronizes it with GSAP's ticker & ScrollTrigger.
 */
export function SmoothScroll() {
  useEffect(() => {
    // 1. Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.05, // Silky smooth deceleration and fluid inertia
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15, // Smooth responsive desktop wheel
      touchMultiplier: 1.0,  // Natural 1:1 touch response on mobile without lag or acceleration
      autoRaf: false, // Driven by GSAP ticker for frame-perfect sync
      anchors: true,  // Automatically smooth-scroll anchor links
    });

    // Make lenis globally accessible for programmatic scroll helpers
    window.__lenis = lenis;

    // 2. Connect Lenis scroll updates to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Drive Lenis through GSAP's internal ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable GSAP lag smoothing so ticker stays in 1:1 sync with real-time Lenis RAF updates
    gsap.ticker.lagSmoothing(0);

    // 4. Handle resize and layout updates
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

/**
 * Utility helper to smoothly scroll to any element, selector, or numeric position (e.g. 0 for top)
 */
export function scrollToTarget(
  target: string | HTMLElement | number,
  offset = 0,
  customDuration?: number
) {
  if (typeof window === 'undefined') return;

  let targetY = 0;
  let targetElement: HTMLElement | null = null;

  if (typeof target === 'number') {
    targetY = target;
  } else if (typeof target === 'string') {
    const cleanId = target.startsWith('#') ? target.slice(1) : target;
    targetElement = document.getElementById(cleanId) || document.querySelector<HTMLElement>(target);
    if (targetElement) {
      targetY = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
    }
  } else if (target instanceof HTMLElement) {
    targetElement = target;
    targetY = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
  }

  const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
  const distance = Math.abs(targetY - currentY);

  // Dynamic duration scaled by distance:
  // Short hops (~500px) take ~0.85s; large page-length jumps (~10,000px) take ~1.35s - 1.45s max
  const duration =
    customDuration ??
    Math.min(1.45, Math.max(0.85, 0.75 + Math.log10(1 + distance / 1000) * 0.6));

  if (window.__lenis) {
    const lenisTarget = typeof target === 'number' ? target : (targetElement || target);
    window.__lenis.scrollTo(lenisTarget, {
      offset,
      duration,
      easing: easeInOutCubic,
      lock: false,
      force: true,
    });
  } else {
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }
}
