import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LogoLoop from '../ui/LogoLoop';

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
      className="group/skill relative flex flex-col items-center justify-center mx-4 cursor-pointer select-none"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive(!isActive)}
    >
      {/* The Exact Brand Logo */}
      <div className={`w-20 h-20 flex items-center justify-center p-2 transition-all duration-300 ${isActive ? 'scale-125 -translate-y-2' : ''}`}>
        <img 
          src={`https://cdn.simpleicons.org/${skill.slug}/ffffff`} 
          alt={skill.name}
          className={`w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]' : ''}`}
        />
      </div>
      
      {/* The "Pop" Name Label */}
      <div className={`absolute -top-12 transition-all duration-300 pointer-events-none z-50 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="bg-purple-600/90 backdrop-blur-md text-white text-xs font-bold px-4 py-3 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] whitespace-nowrap border border-white/10">
          {skill.name}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-600/90 rotate-45 border-r border-b border-white/10" />
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const row1 = row1Skills.map((skill, index) => ({
    node: <SkillItem key={`r1-${index}`} skill={skill} />
  }));
  
  const row2 = row2Skills.map((skill, index) => ({
    node: <SkillItem key={`r2-${index}`} skill={skill} />
  }));

  return (
    <section id="skills" className="section-padding md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-[85%] md:w-full mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My technical toolkit for building modern, scalable web applications.
          </p>
        </motion.div>
      </div>

      <div className="space-y-16 py-8">
        <LogoLoop 
          logos={row1}
          speed={60}
          direction="left"
          gap={60}
          logoHeight={120}
          fadeOut
          fadeOutColor="transparent"
          pauseOnHover
          className="py-4"
        />

        <LogoLoop 
          logos={row2}
          speed={55}
          direction="right"
          gap={60}
          logoHeight={120}
          fadeOut
          fadeOutColor="transparent"
          pauseOnHover
          className="py-4"
        />
      </div>
    </section>
  );
};

export default Skills;
