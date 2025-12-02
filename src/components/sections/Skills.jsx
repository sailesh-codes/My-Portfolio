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
    <section id="skills" className="section-padding px-6">
      <div className="max-w-6xl mx-auto">
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
              {/* Explosion Dots */}
              <AnimatePresence>
                {clickedCards.has(index) && (
                  <div className="absolute inset-0 pointer-events-none z-20">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [1, 1, 0],
                          x: Math.cos((i * 30 * Math.PI) / 180) * 60,
                          y: Math.sin((i * 30 * Math.PI) / 180) * 60,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut"
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
