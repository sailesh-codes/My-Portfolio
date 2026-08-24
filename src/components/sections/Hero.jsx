import React, { useEffect, useRef } from 'react';
import { Code, Database, Globe, Zap, Palette, Server, ArrowDown } from 'lucide-react';
import { EncryptedText } from '../ui/encrypted-text';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const subtitleRef = useRef(null);
  const bioRef = useRef(null);
  const techContainerRef = useRef(null);

  const techButtons = [
    { name: 'Frontend', icon: <Code className="w-3.5 h-3.5" /> },
    { name: 'Backend', icon: <Server className="w-3.5 h-3.5" /> },
    { name: 'Database', icon: <Database className="w-3.5 h-3.5" /> },
    { name: 'UI/UX', icon: <Palette className="w-3.5 h-3.5" /> },
    { name: 'API', icon: <Globe className="w-3.5 h-3.5" /> },
    { name: 'Performance', icon: <Zap className="w-3.5 h-3.5" /> }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        '.scfo-hero-tech-tag',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
        '-=0.4'
      );

      // SCFO Parallax Scroll Out
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 80,
        opacity: 0.3,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center px-6 lg:px-24 relative overflow-hidden pt-28 pb-16"
    >
      <div className="w-full max-w-5xl mx-auto relative z-10">
        
        {/* SCFO Index Tag */}
        <div ref={tagRef} className="flex items-center gap-3 mb-6">
          <span className="scfo-tag font-mono text-purple-400 font-bold">00</span>
          <span className="h-[1px] w-8 bg-purple-500/40" />
          <span className="scfo-tag">FULL STACK DEVELOPMENT • AI SOLUTIONS</span>
        </div>

        {/* SCFO Editorial Title */}
        <h1 ref={titleRef} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-editorial tracking-tight text-white mb-6 leading-[0.98]">
          Hi, I'm{' '}
          <span className="italic font-normal bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Sailesh
          </span>
        </h1>

        {/* Encrypted Subtitle & Founder link */}
        <div ref={subtitleRef} className="mb-6">
          <p className="text-2xl sm:text-3xl md:text-4xl font-syne text-white/90 mb-4 max-w-3xl leading-snug">
            <EncryptedText
              text="Full Stack Developer and AI Solution Architect."
              encryptedClassName="text-white/20"
              revealedClassName="text-white/95"
              revealDelayMs={100}
            />
          </p>
          <h3 className="text-base md:text-lg text-white/60 tracking-wider">
            Founder –{' '}
            <a 
              href="https://www.codecraftnet.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-white transition-colors underline decoration-purple-500/40 underline-offset-4"
            >
              Code Craft
            </a>
          </h3>
        </div>

        {/* Bio Paragraph */}
        <p ref={bioRef} className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10 font-normal">
          I create modern, scalable web applications with clean code and exceptional user experiences.
          Passionate about building solutions that make a difference.
        </p>

        {/* SCFO Tech Stack Tags */}
        <div ref={techContainerRef} className="flex flex-wrap gap-2.5 max-w-3xl mb-16">
          {techButtons.map((button) => (
            <div
              key={button.name}
              className="scfo-hero-tech-tag flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-mono tracking-wider text-white/80 hover:border-purple-500/40 hover:text-white transition-all duration-300"
            >
              <span className="text-purple-400">{button.icon}</span>
              <span>{button.name}</span>
            </div>
          ))}
        </div>

        {/* SCFO Scroll Indicator */}
        <div className="flex items-center gap-3 pt-6 border-t border-white/10 text-xs tracking-widest text-white/40 uppercase">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-purple-400" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;