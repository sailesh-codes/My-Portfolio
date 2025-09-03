import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="gradient-text">Sailesh</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
             Full Stack Developer and AI Solution Architect 
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            I create modern, scalable web applications with clean code and exceptional user experiences.
            Passionate about building solutions that make a difference.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;