import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Tooltip } from '../ui/tooltip-card';
import { useLenis } from '../layout/SmoothScroll';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const ImageTooltipCard = ({ title, description, src }) => (
  <div className="w-56 md:w-64 p-1">
    <div className="aspect-video w-full rounded-lg bg-black overflow-hidden flex items-center justify-center border border-white/10">
      <img
        src={src}
        alt={title}
        className="w-full h-full object-contain"
      />
    </div>
    <div className="my-3 flex flex-col">
      <p className="text-sm font-bold text-white mb-0">{title}</p>
      <p className="mt-1 text-xs text-white/50 leading-relaxed font-mono">
        {description}
      </p>
    </div>
  </div>
);

const CTA = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      scrollTo(contactEl, -80);
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-32 border-t border-white/10 px-6 lg:px-24">
      <div 
        ref={cardRef}
        className="max-w-5xl mx-auto scfo-card rounded-2xl p-8 sm:p-16 border border-white/10 relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="scfo-tag font-mono text-purple-400 font-bold">04</span>
          <span className="h-[1px] w-8 bg-purple-500/40" />
          <span className="scfo-tag">COLLABORATION & INQUIRY</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif-editorial text-white mb-8 leading-tight tracking-tight">
          Want to build a site with <br className="hidden md:block" />
          <span className="italic font-normal text-purple-400">
            WOW Factor?
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-3xl font-normal">
          Let's collaborate and bring your{' '}
          <Tooltip
            containerClassName="inline-block"
            content={
              <ImageTooltipCard 
                title="Innovative Ideas" 
                description="Turning your vision into reality with creative and unique digital solutions."
                src="/images/bulbs.jpg"
              />
            }
          >
            <span className="font-bold text-purple-400 border-b border-purple-400/50 hover:border-purple-400 transition-colors">ideas</span>
          </Tooltip>{' '}
          to life with modern, engaging, and{' '}
          <Tooltip
            containerClassName="inline-block"
            content={
              <ImageTooltipCard 
                title="Top Tier Performance" 
                description="Lightning-fast load times and optimized experiences for your users."
                src="/images/bolt.jpg"
              />
            }
          >
            <span className="font-bold text-blue-400 border-b border-blue-400/50 hover:border-blue-400 transition-colors">high-performance</span>
          </Tooltip>{' '}
          web applications. I'm ready for the next{' '}
          <Tooltip
            containerClassName="inline-block"
            content={
              <ImageTooltipCard 
                title="Bring It On" 
                description="I love tackling complex problems and building robust systems."
                src="/images/thumbsup.jpg"
              />
            }
          >
            <span className="font-bold text-cyan-400 border-b border-cyan-400/50 hover:border-cyan-400 transition-colors">challenge</span>
          </Tooltip>.
        </p>

        <a href="#contact" onClick={handleContactClick} className="inline-block">
          <button className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white text-black font-semibold text-sm tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 shadow-xl group">
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </a>
      </div>
    </section>
  );
};

export default CTA;
