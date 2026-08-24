import React, { useState, useEffect, useRef } from 'react';
import LogoLoop from '../ui/LogoLoop';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const row1Skills = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Framer", slug: "framer" },
  { name: "Vercel", slug: "vercel" },
  { name: "GitHub", slug: "github" },
];

const row2Skills = [
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Python", slug: "python" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Docker", slug: "docker" },
  { name: "Redis", slug: "redis" },
  { name: "Prisma", slug: "prisma" },
  { name: "Jenkins", slug: "jenkins" },
  { name: "Git", slug: "git" },
  { name: "LangChain", slug: "langchain" },
];

const SkillItem = ({ skill }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div 
      className="group/skill relative flex flex-col items-center justify-center mx-5 cursor-pointer select-none"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={`w-18 h-18 flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 transition-all duration-300 ${isActive ? 'scale-115 border-purple-500/50 bg-purple-500/10' : 'hover:border-white/20'}`}>
        <img 
          src={`https://cdn.simpleicons.org/${skill.slug}/ffffff`} 
          alt={skill.name}
          className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]"
        />
      </div>
      
      <div className={`absolute -top-10 transition-all duration-300 pointer-events-none z-50 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="bg-[#12121c] text-white text-xs font-mono px-3 py-1.5 rounded-lg border border-white/20 shadow-xl whitespace-nowrap">
          {skill.name}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);

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
        marqueeRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1 = row1Skills.map((skill, index) => ({
    node: <SkillItem key={`r1-${index}`} skill={skill} />
  }));
  
  const row2 = row2Skills.map((skill, index) => ({
    node: <SkillItem key={`r2-${index}`} skill={skill} />
  }));

  return (
    <section id="skills" ref={sectionRef} className="section-padding px-6 lg:px-24 overflow-hidden relative border-t border-white/10">
      <div ref={headerRef} className="max-w-5xl mx-auto mb-16 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="scfo-tag font-mono text-purple-400 font-bold">03</span>
          <span className="h-[1px] w-8 bg-purple-500/40" />
          <span className="scfo-tag">TECHNOLOGY & TOOLKIT</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-editorial text-white tracking-tight mb-4">
          Skills & Technologies
        </h2>
        <p className="text-lg text-white/60 max-w-xl font-normal">
          My technical toolkit for building modern, scalable web applications.
        </p>
      </div>

      <div ref={marqueeRef} className="space-y-10 py-4 relative z-10">
        <LogoLoop 
          logos={row1}
          speed={60}
          direction="left"
          gap={60}
          logoHeight={100}
          fadeOut
          fadeOutColor="transparent"
          pauseOnHover
        />

        <LogoLoop 
          logos={row2}
          speed={55}
          direction="right"
          gap={60}
          logoHeight={100}
          fadeOut
          fadeOutColor="transparent"
          pauseOnHover
        />
      </div>
    </section>
  );
};

export default Skills;
