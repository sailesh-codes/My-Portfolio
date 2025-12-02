import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Zap, Palette, Server, Star, Sparkles } from 'lucide-react';

const Hero = () => {
  const techButtons = [
    { name: 'Frontend', icon: <Code className="w-4 h-4" />, color: 'from-purple-500 to-blue-500' },
    { name: 'Backend', icon: <Server className="w-4 h-4" />, color: 'from-blue-500 to-purple-500' },
    { name: 'Database', icon: <Database className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
    { name: 'UI/UX', icon: <Palette className="w-4 h-4" />, color: 'from-pink-500 to-purple-500' },
    { name: 'API', icon: <Globe className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
    { name: 'Performance', icon: <Zap className="w-4 h-4" />, color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            Available for Projects
            <Star className="w-4 h-4" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
            Hi, I'm <span className="gradient-text">Sailesh</span>
            
            {/* Decorative underline */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
             Full Stack Developer and AI Solution Architect.
          </p>
          
          <h3 className="text-lg text-muted-foreground mb-6">
            Creator and Founder of <a href="https://www.codecraftnet.com/" className="text-purple-400 hover:underline transition-colors">Code Craft</a>
          </h3>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            I create modern, scalable web applications with clean code and exceptional user experiences.
            Passionate about building solutions that make a difference.
          </p>

          {/* Tech Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {techButtons.map((button, index) => (
              <motion.button
                key={button.name}
                className={`relative px-4 py-2 rounded-full bg-gradient-to-r ${button.color} text-white font-medium text-sm border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  {button.icon}
                  {button.name}
                </span>
                
                {/* Subtle glow effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${button.color} opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;