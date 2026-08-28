import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger, Observer, ScrollToPlugin } from '../lib/gsap';

interface SmoothScrollCanvasProps {
  videoSrc?: string;
  queenVideoSrc?: string;
}

export const SmoothScrollCanvas: React.FC<SmoothScrollCanvasProps> = ({
  videoSrc = '/videos/king-hero-allintra.mp4',
  queenVideoSrc = '/videos/queen-2-optimized.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const blackSectionRef = useRef<HTMLDivElement | null>(null);
  const glassCardRef = useRef<HTMLDivElement | null>(null);

  // Queen Section Refs
  const queenVideoRef = useRef<HTMLVideoElement | null>(null);
  const queenSectionRef = useRef<HTMLDivElement | null>(null);
  const queenTargetTimeRef = useRef<number>(0);
  const queenRafIdRef = useRef<number | null>(null);

  // ScrollTrigger Instance Refs
  const triggerInstanceRef = useRef<ScrollTrigger | null>(null);
  const queenTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // ── 1. King Video Scrubbing ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

    const video = videoRef.current;
    const heroSection = heroSectionRef.current;
    if (!video || !heroSection) return;

    // Zero-lag RAF seeking loop with decoder queue protection
    const startRafLoop = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      const render = () => {
        if (video && video.duration && !isNaN(video.duration)) {
          const target = targetTimeRef.current;
          if (!video.seeking && Math.abs(video.currentTime - target) > 0.008) {
            video.currentTime = target;
          }
        }
        rafIdRef.current = requestAnimationFrame(render);
      };

      rafIdRef.current = requestAnimationFrame(render);
    };

    const initVideoScrub = () => {
      if (!video.duration || isNaN(video.duration)) return;

      if (video.currentTime === 0) {
        video.currentTime = 0.001;
        targetTimeRef.current = 0.001;
      }

      if (triggerInstanceRef.current) {
        triggerInstanceRef.current.kill();
      }

      const safeDuration = Math.max(0, video.duration - 0.03);

      triggerInstanceRef.current = ScrollTrigger.create({
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
            const cardProgress = Math.max(0, Math.min(1, (self.progress - 0.45) / 0.55));
            glassCardRef.current.style.opacity = String(cardProgress);
            glassCardRef.current.style.transform = `translate3d(0, ${(1 - cardProgress) * 20}px, 0) scale(${0.97 + cardProgress * 0.03})`;
          }
        },
        onScrubComplete: () => {
          if (video && !isNaN(video.duration)) {
            video.currentTime = targetTimeRef.current;
          }
        },
      });

      startRafLoop();
    };

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

    const handleSeeked = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const target = targetTimeRef.current;
        if (!video.seeking && Math.abs(video.currentTime - target) > 0.008) {
          video.currentTime = target;
        }
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeked', handleSeeked);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (triggerInstanceRef.current) {
        triggerInstanceRef.current.kill();
      }
    };
  }, [videoSrc]);

  // ── 2. Queen Video Scrubbing (Mirrors King Hero Video 1:1) ──
  useEffect(() => {
    const queenVideo = queenVideoRef.current;
    const queenSection = queenSectionRef.current;
    if (!queenVideo || !queenSection) return;

    // Force immediate first-frame decode on mount so queen video is primed
    if (queenVideo.currentTime === 0) {
      queenVideo.currentTime = 0.001;
      queenTargetTimeRef.current = 0.001;
    }

    const startQueenRafLoop = () => {
      if (queenRafIdRef.current) cancelAnimationFrame(queenRafIdRef.current);

      const renderQueen = () => {
        if (queenVideo && queenVideo.duration && !isNaN(queenVideo.duration)) {
          const target = queenTargetTimeRef.current;
          if (!queenVideo.seeking && Math.abs(queenVideo.currentTime - target) > 0.003) {
            queenVideo.currentTime = target;
          }
        }
        queenRafIdRef.current = requestAnimationFrame(renderQueen);
      };

      queenRafIdRef.current = requestAnimationFrame(renderQueen);
    };

    const initQueenScrub = () => {
      if (!queenVideo.duration || isNaN(queenVideo.duration)) return;

      if (queenVideo.currentTime === 0) {
        queenVideo.currentTime = 0.001;
        queenTargetTimeRef.current = 0.001;
      }

      if (queenTriggerInstanceRef.current) {
        queenTriggerInstanceRef.current.kill();
      }

      const safeDuration = Math.max(0, queenVideo.duration - 0.03);

      queenTriggerInstanceRef.current = ScrollTrigger.create({
        trigger: queenSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          if (queenVideo.duration && !isNaN(queenVideo.duration)) {
            queenTargetTimeRef.current = self.progress * safeDuration;
          }
        },
        onScrubComplete: () => {
          if (queenVideo && !isNaN(queenVideo.duration)) {
            queenVideo.currentTime = queenTargetTimeRef.current;
          }
        },
      });

      startQueenRafLoop();
    };

    if (queenVideo.readyState >= 1 && !isNaN(queenVideo.duration)) {
      initQueenScrub();
    }

    const handleQueenMetadata = () => initQueenScrub();
    const handleQueenData = () => {
      if (queenVideo.currentTime === 0) queenVideo.currentTime = 0.001;
      initQueenScrub();
    };

    const handleQueenSeeked = () => {
      if (queenVideo && queenVideo.duration && !isNaN(queenVideo.duration)) {
        const target = queenTargetTimeRef.current;
        if (!queenVideo.seeking && Math.abs(queenVideo.currentTime - target) > 0.008) {
          queenVideo.currentTime = target;
        }
      }
    };

    queenVideo.addEventListener('loadedmetadata', handleQueenMetadata);
    queenVideo.addEventListener('loadeddata', handleQueenData);
    queenVideo.addEventListener('seeked', handleQueenSeeked);

    return () => {
      queenVideo.removeEventListener('loadedmetadata', handleQueenMetadata);
      queenVideo.removeEventListener('loadeddata', handleQueenData);
      queenVideo.removeEventListener('seeked', handleQueenSeeked);
      if (queenRafIdRef.current) cancelAnimationFrame(queenRafIdRef.current);
      if (queenTriggerInstanceRef.current) queenTriggerInstanceRef.current.kill();
    };
  }, [queenVideoSrc]);

  // ── 3. Multi-Stage SCFO Observer (3 Scrolls: 1st Video -> Black Screen -> 2nd Video) ──
  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const blackSection = blackSectionRef.current;
    const queenSection = queenSectionRef.current;
    if (!heroSection) return;

    const isTweeningRef = { current: false };
    const currentIndexRef = { current: 0 };
    let cooldownTimer: NodeJS.Timeout | null = null;

    const getSnapPoints = () => {
      const vh = window.innerHeight;
      const kingTrigger = triggerInstanceRef.current;
      const queenTrigger = queenTriggerInstanceRef.current;

      const p0 = 0; // 1st Scroll Start: 1st Video top (0px)
      const p1 = kingTrigger ? kingTrigger.end : heroSection.offsetHeight - vh; // 1st Scroll End: 1st Video scrubbed
      const p2 = blackSection ? blackSection.offsetTop : p1 + vh; // 2nd Scroll: Black Screen section
      const p3 = queenTrigger ? queenTrigger.end : p2 + vh * 2; // 3rd Scroll End: 2nd Video scrubbed
      return [p0, p1, p2, p3];
    };

    const getCurrentIndex = (points: number[]) => {
      const y = window.scrollY;
      const p1 = points[1];
      const p2 = points[2];
      const p3 = points[3];
      if (y >= (p2 + p3) / 2) return 3;
      if (y >= (p1 + p2) / 2) return 2;
      if (y >= p1 / 2) return 1;
      return 0;
    };

    currentIndexRef.current = getCurrentIndex(getSnapPoints());

    const goToIndex = (targetIndex: number) => {
      const points = getSnapPoints();
      const clampedIndex = Math.max(0, Math.min(points.length - 1, targetIndex));
      
      const isThirdScroll = clampedIndex === 3 || (currentIndexRef.current === 3 && targetIndex === 2);
      const tweenDuration = isThirdScroll ? 2.2 : 0.65;
      const cooldownDelay = isThirdScroll ? 600 : 350;

      isTweeningRef.current = true;
      currentIndexRef.current = clampedIndex;

      if (cooldownTimer) clearTimeout(cooldownTimer);

      gsap.to(window, {
        scrollTo: { y: points[clampedIndex], autoKill: false },
        duration: tweenDuration,
        ease: isThirdScroll ? 'power1.out' : 'power2.out',
        onComplete: () => {
          // Sync King video frame
          const video = videoRef.current;
          if (clampedIndex >= 1 && video && video.duration && !isNaN(video.duration)) {
            const safeDuration = Math.max(0, video.duration - 0.03);
            video.currentTime = safeDuration;
          } else if (clampedIndex === 0 && video) {
            video.currentTime = 0.001;
          }

          // Sync Queen video frame
          const qVideo = queenVideoRef.current;
          if (clampedIndex === 3 && qVideo && qVideo.duration && !isNaN(qVideo.duration)) {
            const qSafeDuration = Math.max(0, qVideo.duration - 0.03);
            qVideo.currentTime = qSafeDuration;
          } else if (clampedIndex <= 2 && qVideo) {
            qVideo.currentTime = 0.001;
          }

          cooldownTimer = setTimeout(() => {
            isTweeningRef.current = false;
          }, cooldownDelay);
        },
      });
    };

    const obs = Observer.create({
      target: window,
      type: 'wheel,touch,scroll,pointer,keys',
      tolerance: 10,
      onDown: () => {
        if (isTweeningRef.current) return;
        if (currentIndexRef.current < 3) {
          goToIndex(currentIndexRef.current + 1);
        }
      },
      onUp: () => {
        if (isTweeningRef.current) return;
        if (currentIndexRef.current > 0) {
          goToIndex(currentIndexRef.current - 1);
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

      {/* Section 3: Queen Video Scrubbing Section */}
      <div
        id="queen-section"
        ref={queenSectionRef}
        className="relative w-full bg-black text-white overflow-x-hidden"
        style={{ height: '200vh' }}
      >
        <div id="queen-start" className="absolute top-0 left-0 w-full pointer-events-none" />

        <div
          className="sticky top-0 left-0 w-full h-screen pointer-events-none z-0 overflow-hidden"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            WebkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        >
          <video
            id="hero-video-queen"
            ref={queenVideoRef}
            src={queenVideoSrc}
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
        </div>

        <div id="queen-end" className="absolute bottom-0 left-0 w-full pointer-events-none" />
      </div>
    </div>
  );
};

export default SmoothScrollCanvas;
