import React from 'react';
import { motion } from 'framer-motion';
import {
  Code, Database, Globe, Server, Route, FileCode, FileType, Palette,
  Network, GitBranch, Boxes, Settings, DatabaseBackup, Workflow
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
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Technologies</h2>
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
            <div
              key={index}
              className="skill-tag p-4 rounded-xl text-center group cursor-pointer"
            >
              <div className="flex items-center justify-center mb-2 text-purple-600 dark:text-purple-400">
                {skill.icon}
              </div>
              <span className="font-medium">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
