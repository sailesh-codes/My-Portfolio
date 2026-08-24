import React, { useEffect, useRef } from 'react';
import TerminalDemo from '../terminal-demo';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const About = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: terminalRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="section-padding px-6 lg:px-24 relative overflow-hidden border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* SCFO Section Index Header */}
        <div ref={headerRef} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="scfo-tag font-mono text-purple-400 font-bold">01</span>
            <span className="h-[1px] w-8 bg-purple-500/40" />
            <span className="scfo-tag">BACKGROUND & CAPABILITIES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-editorial text-white tracking-tight">
            About Me
          </h2>
        </div>

        {/* Terminal Box */}
        <div ref={terminalRef} className="scfo-card rounded-2xl border border-white/10 p-2 sm:p-4">
          <TerminalDemo />
        </div>
      </div>
    </section>
  );
};

export default About;