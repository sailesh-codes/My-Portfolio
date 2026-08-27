import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, Observer, ScrollToPlugin } from '../lib/gsap';

interface SmoothScrollCanvasProps {
  videoSrc?: string;
}

export const SmoothScrollCanvas: React.FC<SmoothScrollCanvasProps> = ({
  videoSrc = '/videos/king-hero-allintra.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

    const video = videoRef.current;
    const heroSection = heroSectionRef.current;
    if (!video || !heroSection) return;

    let triggerInstance: ScrollTrigger | null = null;

    // Instant, zero-delay RAF seeking loop
    const startRafLoop = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      const render = () => {
        if (video && video.duration && !isNaN(video.duration)) {
          const target = targetTimeRef.current;
          const current = currentTimeRef.current;

          // High-speed lerp (0.6) for instant, lag-free response
          const next = current + (target - current) * 0.6;
          currentTimeRef.current = next;

          // Seek video frame immediately
          if (Math.abs(video.currentTime - next) > 0.001) {
            video.currentTime = next;
          }
        }
        rafIdRef.current = requestAnimationFrame(render);
      };

      rafIdRef.current = requestAnimationFrame(render);
    };

    const initVideoScrub = () => {
      if (!video.duration || isNaN(video.duration)) return;

      // Force first frame decode so video is visible immediately
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
        currentTimeRef.current = 0.001;
        targetTimeRef.current = 0.001;
      }

      if (triggerInstance) {
        triggerInstance.kill();
      }

      // GSAP ScrollTrigger updates video progress 1:1 with page scroll
      triggerInstance = ScrollTrigger.create({
        trigger: heroSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            targetTimeRef.current = self.progress * video.duration;
          }
        },
      });

      startRafLoop();
    };

    // Attempt immediately if metadata already loaded
    if (video.readyState >= 1 && !isNaN(video.duration)) {
      initVideoScrub();
    }

    const handleLoadedMetadata = () => {
      initVideoScrub();
    };

    const handleLoadedData = () => {
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
        currentTimeRef.current = 0.001;
        targetTimeRef.current = 0.001;
      }
      initVideoScrub();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (triggerInstance) {
        triggerInstance.kill();
      }
    };
  }, [videoSrc]);

  // Ultra-responsive SCFO-style Observer for instant 0ms trigger on wheel/touch/keys
  useEffect(() => {
    const heroSection = heroSectionRef.current;
    if (!heroSection) return;

    let isTweening = false;

    const obs = Observer.create({
      target: window,
      type: 'wheel,touch,scroll,pointer,keys',
      tolerance: 2,
      onDown: () => {
        if (isTweening) return;
        const currentY = window.scrollY;
        const targetEnd = heroSection.offsetTop + heroSection.offsetHeight - window.innerHeight;

        // At start area -> trigger instant smooth scroll to end
        if (currentY < targetEnd - 30) {
          isTweening = true;
          gsap.to(window, {
            scrollTo: { y: targetEnd, autoKill: false },
            duration: 0.95,
            ease: 'power3.inOut',
            onComplete: () => {
              isTweening = false;
            },
          });
        }
      },
      onUp: () => {
        if (isTweening) return;
        const currentY = window.scrollY;

        // At end area -> trigger instant smooth scroll back to start
        if (currentY > 30) {
          isTweening = true;
          gsap.to(window, {
            scrollTo: { y: 0, autoKill: false },
            duration: 0.95,
            ease: 'power3.inOut',
            onComplete: () => {
              isTweening = false;
            },
          });
        }
      },
    });

    return () => {
      obs.kill();
    };
  }, []);

  return (
    <div
      id="hero-section"
      ref={heroSectionRef}
      className="relative w-full bg-black text-white selection:bg-none select-none overflow-x-hidden"
      style={{ height: '200vh' }}
    >
      {/* SCFO Start Anchor */}
      <div id="start" className="absolute top-0 left-0 w-full pointer-events-none" />

      {/* Sticky video container for locked full-viewport rendering */}
      <div
        className="sticky top-0 left-0 w-full h-screen pointer-events-none z-0 overflow-hidden"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          WebkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      >
        <video
          id="hero-video"
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover block pointer-events-none"
        />
      </div>

      {/* SCFO End Anchor */}
      <div id="end" className="absolute bottom-0 left-0 w-full pointer-events-none" />
    </div>
  );
};

export default SmoothScrollCanvas;
