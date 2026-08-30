import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Code2 } from 'lucide-react';
import { IglooCanvas3D } from '../canvas/IglooCanvas3D';
import { EncryptedText } from '../ui/encrypted-text';
import { useLenis } from '../layout/SmoothScroll';
import { gsap } from '../../lib/gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-stagger',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      scrollTo(el, -80);
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 px-6 lg:px-24"
    >
      {/* Interactive 3D Crystal Canvas in Background */}
      <div className="absolute inset-0 pointer-events-auto z-0 opacity-80">
        <IglooCanvas3D />
      </div>

      {/* Foreground Editorial Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center select-none pointer-events-none"
      >
        {/* SCFO Status Tag */}
        <div className="hero-stagger pointer-events-auto flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="scfo-tag text-[11px] text-white/80 font-mono tracking-widest uppercase">
            AVAILABLE FOR NEW VENTURES & FULL-TIME ROLES
          </span>
        </div>

        {/* Main Editorial Headline */}
        <h1 className="hero-stagger text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-editorial text-white tracking-tight leading-[0.95] mb-6">
          SAILESH <span className="italic text-purple-400 font-normal">T</span>
        </h1>

        {/* Subtitle & Role */}
        <div className="hero-stagger max-w-2xl text-lg sm:text-xl text-white/70 font-normal leading-relaxed mb-6">
          <EncryptedText
            text="Crafting high-performance web systems, creative interfaces & scalable software."
            encryptedClassName="text-purple-400/50"
            revealedClassName="text-white/80"
            revealDelayMs={30}
          />
        </div>

        {/* Action Buttons */}
        <div className="hero-stagger pointer-events-auto flex flex-wrap items-center justify-center gap-4 mt-4">
          <button
            onClick={() => handleScrollTo('projects')}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] group cursor-pointer"
          >
            <span>EXPLORE WORK</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => handleScrollTo('contact')}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.05] backdrop-blur-md text-white text-xs font-semibold tracking-widest uppercase hover:bg-white/15 hover:border-white/40 transition-all duration-300 group cursor-pointer"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="hero-stagger grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 mt-16 pt-8 border-t border-white/10 w-full max-w-3xl text-left pointer-events-auto">
          <div>
            <span className="scfo-tag text-purple-400 font-mono text-[10px] block mb-1">
              FOCUS
            </span>
            <p className="text-white text-sm font-medium">Full Stack & AI Systems</p>
          </div>
          <div>
            <span className="scfo-tag text-purple-400 font-mono text-[10px] block mb-1">
              TECH
            </span>
            <p className="text-white text-sm font-medium">React, Next.js, Node, TS</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="scfo-tag text-purple-400 font-mono text-[10px] block mb-1">
              LOCATION
            </span>
            <p className="text-white text-sm font-medium">Remote / Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;