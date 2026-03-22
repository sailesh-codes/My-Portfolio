import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Database, Globe, Server, Route, FileCode, FileType, Palette,
  Network, GitBranch, Boxes, Settings, DatabaseBackup, Workflow,
  Terminal, Layers, Zap, Cpu
} from 'lucide-react';


const skills = [
  { name: "React", icon: <Code className="w-5 h-5" /> },
  { name: "Node.js", icon: <Server className="w-5 h-5" /> },
  { name: "Express", icon: <Route className="w-5 h-5" /> },
  { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
  { name: "MySQL", icon: <DatabaseBackup className="w-5 h-5" /> },
  { name: "JavaScript", icon: <FileCode className="w-5 h-5" /> },
  { name: "N8N", icon: <Workflow className="w-5 h-5" /> },
  { name: "Tailwind CSS", icon: <Palette className="w-5 h-5" /> },
  { name: "REST APIs", icon: <Network className="w-5 h-5" /> },
  { name: "Git", icon: <GitBranch className="w-5 h-5" /> },
  { name: "Docker", icon: <Boxes className="w-5 h-5" /> },
  { name: "DevOps", icon: <Settings className="w-5 h-5" /> },
  { name: "TypeScript", icon: <FileType className="w-5 h-5" /> },
  { name: "Next.js", icon: <Layers className="w-5 h-5" /> },
  { name: "Framer Motion", icon: <Zap className="w-5 h-5" /> },
  { name: "Sanity CMS", icon: <Database className="w-5 h-5" /> },
  { name: "Vercel", icon: <Terminal className="w-5 h-5" /> },
  { name: "Jenkins", icon: <Network className="w-5 h-5" /> },
  { name: "Redis", icon: <Cpu className="w-5 h-5" /> },
  { name: "AWS", icon: <Globe className="w-5 h-5" /> },
];

const burstParticles = [...Array(30)].map((_, i) => {
  const angle = (i * 360) / 30;
  const distance = 80 + Math.random() * 80;
  const size = 3 + Math.random() * 6;
  // Ultra-vibrant neon colors: Neon Pink, Cyan, Neon Green, Gold, Neon Orange, Electric Violet
  const colors = ['#FF1493', '#00FFFF', '#39FF14', '#FFD700', '#FF5F1F', '#B533FF'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const duration = 0.5 + Math.random() * 0.5;
  return { angle, distance, size, color, duration };
});

const Skills = () => {
  const [clickedCards, setClickedCards] = useState(new Set());

  const handleCardClick = (index) => {
    setClickedCards(prev => new Set(prev).add(index));
    
    // Remove card from clicked state after 1.5-2 seconds
    setTimeout(() => {
      setClickedCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 1500 + Math.random() * 500); // Random between 1.5-2 seconds
  };

  return (
    <section id="skills" className="section-padding md:px-6">
      <div className="max-w-6xl mx-auto w-[85%] md:w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My technical toolkit for building modern, scalable web applications.
            <br />
              (Don’t click on the skills 😉)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill, index) => (
            <div key={index} className="relative">
              {/* Explosion Effect */}
              <AnimatePresence>
                {clickedCards.has(index) && (
                  <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                    {/* Shockwave ring */}
                    <motion.div
                      initial={{ width: 0, height: 0, opacity: 1, borderWidth: '4px' }}
                      animate={{ width: 160, height: 160, opacity: 0, borderWidth: '0px' }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute rounded-full border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                      style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    />
                    
                    {/* Particles */}
                    {burstParticles.map((p, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          backgroundColor: p.color,
                          boxShadow: `0 0 15px ${p.color}`,
                          width: p.size,
                          height: p.size,
                          top: '50%',
                          left: '50%',
                        }}
                        initial={{ x: '-50%', y: '-50%', scale: 1, opacity: 1 }}
                        animate={{
                          x: `calc(-50% + ${Math.cos((p.angle * Math.PI) / 180) * p.distance}px)`,
                          y: `calc(-50% + ${Math.sin((p.angle * Math.PI) / 180) * p.distance}px)`,
                          scale: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: p.duration,
                          ease: [0.25, 1, 0.5, 1],
                        }}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Skill Card */}
              <AnimatePresence mode="wait">
                {!clickedCards.has(index) && (
                  <motion.div
                    key={`card-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    exit={{ opacity: 0, scale: 1.4, filter: "blur(10px)", transition: { duration: 0.3, ease: "easeOut", delay: 0 } }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="skill-tag p-4 rounded-xl text-center cursor-pointer relative"
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="skill-glow"></div>
                    <div className="skill-icon flex items-center justify-center mb-2 text-purple-600 dark:text-purple-400">
                      {skill.icon}
                    </div>
                    <span className="skill-text font-medium">{skill.name}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
