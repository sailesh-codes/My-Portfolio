import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const HLS_STREAM_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const ContactFooter: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // Initialize flipped HLS Video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const HlsClass = (window as unknown as { Hls?: any }).Hls;

    if (HlsClass && HlsClass.isSupported()) {
      const hls = new HlsClass({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(HlsClass.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  // GSAP continuous marquee
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const anim = gsap.to(marquee, {
      xPercent: -50,
      duration: 35,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const marqueeText = Array(12).fill('BUILDING THE FUTURE • ').join('');

  return (
    <footer
      id="contact"
      className="bg-bg pt-20 md:pt-28 pb-10 md:pb-14 relative overflow-hidden z-10"
    >
      {/* Background Video (Flipped Vertically) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 scale-y-[-1]">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Heavier overlay */}
        <div className="absolute inset-0 bg-black/75 pointer-events-none" />
      </div>

      {/* GSAP Marquee Strip */}
      <div className="relative z-10 w-full overflow-hidden py-4 mb-16 opacity-30 select-none pointer-events-none">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          <span className="font-display italic text-6xl sm:text-7xl md:text-8xl text-text-primary tracking-wider uppercase">
            {marqueeText}
          </span>
          <span className="font-display italic text-6xl sm:text-7xl md:text-8xl text-text-primary tracking-wider uppercase">
            {marqueeText}
          </span>
        </div>
      </div>

      {/* Main Contact CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center mb-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke inline-block" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
            Get In Touch
          </span>
          <span className="w-8 h-px bg-stroke inline-block" />
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl text-text-primary tracking-tight font-light mb-4 leading-tight">
          Let&apos;s create something{' '}
          <span className="font-display italic text-[#89AACC]">extraordinary</span>
        </h2>

        <p className="text-muted text-sm sm:text-base max-w-lg mb-10 leading-relaxed">
          Open for select consulting, design engineering, and digital transformation partnerships.
        </p>

        {/* Email CTA Button */}
        <a
          href="mailto:hello@michaelsmith.com"
          className="group relative inline-flex items-center justify-center p-[1.5px] rounded-full transition-all duration-300 hover:scale-105 cursor-pointer shadow-2xl"
        >
          <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
          <div className="relative bg-surface text-text-primary px-8 sm:px-10 py-4 sm:py-5 rounded-full flex items-center gap-3 text-base sm:text-lg font-medium backdrop-blur-md">
            <span>hello@michaelsmith.com</span>
            <span className="text-sm font-sans transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </div>
        </a>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/50 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Social Links */}
        <div className="flex items-center gap-6 text-xs sm:text-sm text-muted">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            Dribbble
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Right: Available for Projects Indicator */}
        <div className="flex items-center gap-2.5 text-xs text-text-primary/90 bg-surface/60 border border-stroke px-4 py-2 rounded-full backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span className="font-medium tracking-wide">Available for projects</span>
        </div>
      </div>
    </footer>
  );
};
