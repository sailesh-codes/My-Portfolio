import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, ChevronUp, Info, X } from 'lucide-react';
import { useVideoScrub } from '../hooks/useVideoScrub';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4';

const DARK = '#1D3045';

const navLinks = [
  { label: 'VECTRUS ENERGY', active: true },
  { label: 'VECTRUS UPSTREAM', active: false },
  { label: 'VECTRUS MARKETS', active: false },
  { label: 'VECTRUS SYSTEMS', active: false },
  { label: 'VECTRUS+', active: false },
];

interface StaggerProps {
  visible: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

const Stagger: React.FC<StaggerProps> = ({
  visible,
  delay = 0,
  className = '',
  children,
}) => {
  return (
    <div
      className={`transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ScrollTiedVideoHero: React.FC = () => {
  const { containerRef, videoRef, canvasRef, scrollProgress, canvasLive } =
    useVideoScrub(VIDEO_URL);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navMounted, setNavMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setNavMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const p = scrollProgress;

  // Text sections sequential opacity
  const s1Opacity =
    p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) / 0.08);

  const s2Opacity =
    p < 0.32
      ? 0
      : p < 0.4
      ? (p - 0.32) / 0.08
      : p < 0.55
      ? 1
      : Math.max(0, 1 - (p - 0.55) / 0.08);

  const s3Opacity =
    p < 0.67 ? 0 : p < 0.75 ? (p - 0.67) / 0.08 : 1;

  const isLightNav = p > 0.55;
  const navTextColor = isLightNav ? '#FFFFFF' : DARK;

  const scrollToNext = () => {
    const container = containerRef.current;
    if (!container) return;
    const maxScroll = container.offsetHeight - window.innerHeight;
    if (p < 0.3) {
      window.scrollTo({ top: maxScroll * 0.45, behavior: 'smooth' });
    } else if (p < 0.65) {
      window.scrollTo({ top: maxScroll * 0.85, behavior: 'smooth' });
    } else if (p < 0.95) {
      window.scrollTo({ top: maxScroll, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black">
      {/* Sticky Fullscreen Scene */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* 1) Video Full Cover */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          muted
          playsInline
          preload="auto"
          src={VIDEO_URL}
        />

        {/* 2) Canvas for Decoded WebCodecs Frame Scrubbing */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
            canvasLive ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* 3) Foreground Content Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
          {/* NAVBAR */}
          <nav className="absolute top-0 left-0 right-0 z-50 pointer-events-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-6 flex items-center justify-between transition-colors duration-500">
            {/* Desktop Left Cluster */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="relative text-xs tracking-[0.15em] uppercase font-medium hover:opacity-70 transition-all duration-500 cursor-pointer"
                  style={{
                    color: navTextColor,
                    opacity: navMounted ? 1 : 0,
                    transform: navMounted ? 'translateY(0)' : 'translateY(-12px)',
                    transition:
                      'color 500ms, opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
                    transitionDelay: `${i * 80 + 100}ms`,
                  }}
                >
                  {link.label}
                  {link.active && (
                    <span
                      className="absolute -bottom-3 left-0 right-0 h-[2px] transition-colors duration-500"
                      style={{ backgroundColor: navTextColor }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger (Left on <lg) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex flex-col justify-center gap-[5px] cursor-pointer p-2 -ml-2 transition-colors duration-500 bg-transparent border-0"
              aria-label="Open menu"
            >
              <span
                className="w-[24px] h-[2px] transition-colors duration-500"
                style={{ backgroundColor: navTextColor }}
              />
              <span
                className="w-[24px] h-[2px] transition-colors duration-500"
                style={{ backgroundColor: navTextColor }}
              />
              <span
                className="w-[16px] h-[2px] transition-colors duration-500"
                style={{ backgroundColor: navTextColor }}
              />
            </button>

            {/* Right Cluster */}
            <div
              className="hidden sm:flex items-center gap-6 transition-all duration-500"
              style={{
                opacity: navMounted ? 1 : 0,
                transform: navMounted ? 'translateY(0)' : 'translateY(-12px)',
                transition:
                  'opacity 600ms cubic-bezier(0.16,1,0.3,1) 500ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 500ms',
              }}
            >
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <span
                  className="text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-500"
                  style={{ color: navTextColor }}
                >
                  NEWS
                </span>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500"
                  style={{ backgroundColor: navTextColor }}
                >
                  <Info size={10} style={{ color: isLightNav ? '#000000' : '#FFFFFF' }} />
                </div>
              </div>

              {/* MENU label */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-500 cursor-pointer lg:pointer-events-none bg-transparent border-0"
                style={{ color: navTextColor }}
              >
                MENU
              </button>
            </div>
          </nav>

          {/* SECTION 1 (Hero: Left aligned, vertically centered) */}
          <div
            className="absolute inset-0 flex items-center px-6 sm:px-8 md:px-20 lg:px-32 transition-opacity duration-100 ease-out"
            style={{
              opacity: s1Opacity,
              pointerEvents: s1Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-4xl">
              <Stagger visible={s1Opacity > 0.3} delay={0}>
                <h1
                  className="text-[clamp(2rem,5vw,5rem)] font-light uppercase leading-[1.2] tracking-tight"
                  style={{ color: DARK }}
                >
                  Advancing resources for a cleaner future
                </h1>
              </Stagger>

              <Stagger visible={s1Opacity > 0.3} delay={150}>
                <p
                  className="mt-6 text-sm tracking-[0.3em] uppercase font-medium"
                  style={{ color: `${DARK}E6` }}
                >
                  Sustainable power with purpose
                </p>
              </Stagger>
            </div>

            {/* Bottom-right circle button */}
            <div className="absolute bottom-12 right-6 sm:right-8 md:right-12">
              <Stagger visible={s1Opacity > 0.3} delay={300}>
                <button
                  onClick={scrollToNext}
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300 cursor-pointer bg-transparent"
                  style={{
                    borderColor: `${DARK}80`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: DARK,
                  }}
                  aria-label="Scroll to next section"
                >
                  <ArrowRight size={18} />
                </button>
              </Stagger>
            </div>
          </div>

          {/* SECTION 2 (Center aligned) */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 transition-opacity duration-100 ease-out"
            style={{
              opacity: s2Opacity,
              pointerEvents: s2Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-[900px] mx-auto text-center">
              <Stagger visible={s2Opacity > 0.3} delay={0}>
                <h2
                  className="text-[clamp(1.5rem,4.5vw,4.5rem)] font-extralight tracking-wide leading-[1.3] text-center uppercase"
                  style={{ color: DARK }}
                >
                  We build lasting partnerships with vision{' '}
                  <span style={{ color: 'rgba(29, 48, 69, 0.8)' }}>and precision</span>{' '}
                  <span style={{ color: 'rgba(29, 48, 69, 0.5)' }}>across every frontier</span>
                </h2>
              </Stagger>
            </div>

            {/* Right column indicators */}
            <div className="absolute bottom-16 right-6 sm:right-8 md:right-12 flex flex-col items-center gap-4">
              <Stagger visible={s2Opacity > 0.3} delay={200}>
                <button
                  onClick={scrollToNext}
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300 cursor-pointer bg-transparent"
                  style={{
                    borderColor: `${DARK}66`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: DARK,
                  }}
                  aria-label="Scroll down"
                >
                  <ArrowDown size={18} />
                </button>
              </Stagger>

              {/* Three dots */}
              <Stagger visible={s2Opacity > 0.3} delay={350} className="flex flex-col items-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DARK }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${DARK}66` }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${DARK}66` }} />
              </Stagger>

              {/* Up button */}
              <Stagger visible={s2Opacity > 0.3} delay={500}>
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300 cursor-pointer bg-transparent mt-2"
                  style={{
                    borderColor: `${DARK}4D`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: `${DARK}CC`,
                  }}
                  aria-label="Scroll to top"
                >
                  <ChevronUp size={16} />
                </button>
              </Stagger>
            </div>
          </div>

          {/* SECTION 3 (Right aligned, white type on dark video) */}
          <div
            className="absolute inset-0 flex items-center justify-end px-6 sm:px-8 md:px-20 lg:px-32 transition-opacity duration-100 ease-out"
            style={{
              opacity: s3Opacity,
              pointerEvents: s3Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-2xl text-left ml-auto">
              <Stagger visible={s3Opacity > 0.3} delay={0}>
                <p className="text-white/60 text-lg tracking-wide mb-4 font-light">
                  Halder | Nordvik
                </p>
              </Stagger>

              <Stagger visible={s3Opacity > 0.3} delay={150}>
                <h2 className="text-[clamp(2rem,4vw,4rem)] font-light text-white leading-[1.2] uppercase tracking-wide mb-8">
                  Fueling ambition,
                  <br />
                  shaping tomorrow.
                </h2>
              </Stagger>

              <Stagger visible={s3Opacity > 0.3} delay={300}>
                <div className="flex items-center gap-4">
                  <span className="text-sm tracking-[0.3em] text-white/80 uppercase font-medium">
                    Contact Nordvik
                  </span>
                  <a
                    href="#contact"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg"
                    aria-label="Contact Nordvik"
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </Stagger>
            </div>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div
          className={`fixed inset-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            mobileMenuOpen
              ? 'opacity-100 visible pointer-events-auto'
              : 'opacity-0 invisible pointer-events-none'
          }`}
          style={{ backgroundColor: DARK }}
        >
          <div
            className={`h-full flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              mobileMenuOpen ? 'translate-y-0' : '-translate-y-8'
            }`}
          >
            <div className="px-6 sm:px-8 pt-8 sm:pt-12 flex justify-end">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-white/30 hover:border-white transition-colors flex items-center justify-center cursor-pointer bg-transparent"
                aria-label="Close menu"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            <div className="px-8 sm:px-12 py-3 flex flex-col gap-6 my-auto">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl sm:text-3xl font-light tracking-wide uppercase transition-all duration-300 ${
                    link.active ? 'text-white font-normal' : 'text-white/60 hover:text-white'
                  }`}
                  style={{
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="px-8 sm:px-12 pb-10 flex gap-8">
              <span className="text-xs tracking-[0.2em] uppercase text-white/60 cursor-pointer hover:text-white transition-colors">
                NEWS
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-white/60 cursor-pointer hover:text-white transition-colors">
                CONTACT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
