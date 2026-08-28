import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger, Observer, ScrollToPlugin } from '../lib/gsap';

interface SmoothScrollCanvasProps {
  videoSrc?: string;
}

export const SmoothScrollCanvas: React.FC<SmoothScrollCanvasProps> = ({
  videoSrc = '/videos/king-hero-allintra.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const blackSectionRef = useRef<HTMLDivElement | null>(null);
  const glassCardRef = useRef<HTMLDivElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

    const video = videoRef.current;
    const heroSection = heroSectionRef.current;
    if (!video || !heroSection) return;

    let triggerInstance: ScrollTrigger | null = null;

    // Instant zero-lag RAF seeking loop (direct 1:1 frame tracking with GSAP scroll)
    const startRafLoop = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      const render = () => {
        if (video && video.duration && !isNaN(video.duration)) {
          const target = targetTimeRef.current;
          // Synchronize video frame 1:1 with scroll position without double-lerp lag
          if (Math.abs(video.currentTime - target) > 0.0001) {
            video.currentTime = target;
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
        targetTimeRef.current = 0.001;
      }

      if (triggerInstance) {
        triggerInstance.kill();
      }

      // Clamp max scroll time slightly before duration to avoid EOF buffering artifacts
      const safeDuration = Math.max(0, video.duration - 0.03);

      // GSAP ScrollTrigger updates video progress 1:1 with page scroll
      triggerInstance = ScrollTrigger.create({
        trigger: heroSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            targetTimeRef.current = self.progress * safeDuration;
          }
          if (glassCardRef.current) {
            // Instant, 1:1 synchronized card reveal without mid-scroll lag
            const cardProgress = Math.max(0, Math.min(1, (self.progress - 0.45) / 0.55));
            glassCardRef.current.style.opacity = String(cardProgress);
            glassCardRef.current.style.transform = `translate3d(0, ${(1 - cardProgress) * 20}px, 0) scale(${0.97 + cardProgress * 0.03})`;
          }
        },
        onScrubComplete: () => {
          // Explicitly lock onto sharp target frame when scrubbing completes
          if (video && !isNaN(video.duration)) {
            video.currentTime = targetTimeRef.current;
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

  // Discrete 2-Stage SCFO-style Observer with momentum lock buffer (prevents double-scroll/skipping)
  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const blackSection = blackSectionRef.current;
    if (!heroSection) return;

    let isTweening = false;
    let cooldownTimer: NodeJS.Timeout | null = null;

    const getSnapPoints = () => {
      const vh = window.innerHeight;
      const p0 = 0;
      const p1 = heroSection.offsetHeight - vh; // End of video scrub section (~100vh)
      const p2 = blackSection ? blackSection.offsetTop : heroSection.offsetHeight; // Top of black screen section (~200vh)
      return [p0, p1, p2];
    };

    // Determine starting section index based on current scroll position
    const getCurrentIndex = (points: number[]) => {
      const y = window.scrollY;
      const p1 = points[1];
      const p2 = points[2];
      if (y >= (p1 + p2) / 2) return 2;
      if (y >= p1 / 2) return 1;
      return 0;
    };

    let currentIndex = getCurrentIndex(getSnapPoints());

    const goToIndex = (targetIndex: number) => {
      const points = getSnapPoints();
      const clampedIndex = Math.max(0, Math.min(points.length - 1, targetIndex));
      
      isTweening = true;
      currentIndex = clampedIndex;

      if (cooldownTimer) clearTimeout(cooldownTimer);

      gsap.to(window, {
        scrollTo: { y: points[clampedIndex], autoKill: false },
        duration: 0.65,
        ease: 'power2.out',
        onComplete: () => {
          // Sync video frames on completion
          const video = videoRef.current;
          if (clampedIndex === 1 && video && video.duration && !isNaN(video.duration)) {
            const safeDuration = Math.max(0, video.duration - 0.03);
            video.currentTime = safeDuration;
          } else if (clampedIndex === 0 && video) {
            video.currentTime = 0.001;
          }

          // 350ms Cooldown buffer to swallow remaining trackpad/mouse momentum events
          cooldownTimer = setTimeout(() => {
            isTweening = false;
          }, 350);
        },
      });
    };

    const obs = Observer.create({
      target: window,
      type: 'wheel,touch,scroll,pointer,keys',
      tolerance: 10,
      onDown: () => {
        if (isTweening) return;
        if (currentIndex < 2) {
          goToIndex(currentIndex + 1);
        }
      },
      onUp: () => {
        if (isTweening) return;
        if (currentIndex > 0) {
          goToIndex(currentIndex - 1);
        }
      },
    });

    return () => {
      obs.kill();
      if (cooldownTimer) clearTimeout(cooldownTimer);
    };
  }, []);

  return (
    <div className="relative w-full bg-black text-white selection:bg-none select-none overflow-x-hidden">
      {/* Section 1: Hero Video Scrubbing Section */}
      <div
        id="hero-section"
        ref={heroSectionRef}
        className="relative w-full bg-black text-white overflow-x-hidden"
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
            style={{
              imageRendering: 'crisp-edges',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
          />

          {/* Pure Transparent Glassmorphic Card Overlay (Appears at the end of first scroll, zero-flicker) */}
          <div
            ref={glassCardRef}
            className="absolute inset-0 z-10 flex items-center justify-center p-6 pointer-events-none"
            style={{
              opacity: 0,
              transform: 'translate3d(0, 25px, 0) scale(0.96)',
              willChange: 'opacity, transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Main Transparent Glass Card */}
            <div className="relative max-w-lg w-full backdrop-blur-md bg-white/[0.04] border border-white/15 rounded-2xl p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-white/80" />
                <span>Interactive Experience</span>
              </div>

              {/* Card Headline */}
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 leading-tight">
                Mastering Spatial Motion
              </h2>

              {/* Card Description */}
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-8">
                Seamlessly scrubbing through high-definition spatial motion with real-time frame synchronization and ultra-responsive feedback.
              </p>

              {/* Card Footer Action Button */}
              <div className="flex items-center justify-end pt-5 border-t border-white/10 text-white/80">
                <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs md:text-sm font-medium transition-all duration-300 hover:border-white/30">
                  <span>Explore Next</span>
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SCFO End Anchor */}
        <div id="end" className="absolute bottom-0 left-0 w-full pointer-events-none" />
      </div>

      {/* Section 2: Discrete Empty Black Screen Section */}
      <div
        id="black-section"
        ref={blackSectionRef}
        className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden z-10"
      >
        {/* Container for user content added later */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
          {/* User can populate content here */}
        </div>
      </div>
    </div>
  );
};

export default SmoothScrollCanvas;
