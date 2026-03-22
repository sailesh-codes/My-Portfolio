import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Zap, Palette, Server } from 'lucide-react';
import { EncryptedText } from '../ui/encrypted-text';

const Hero = () => {
  const techButtons = [
    { name: 'Frontend', icon: <Code className="w-4 h-4" /> },
    { name: 'Backend', icon: <Server className="w-4 h-4" /> },
    { name: 'Database', icon: <Database className="w-4 h-4" /> },
    { name: 'UI/UX', icon: <Palette className="w-4 h-4" /> },
    { name: 'API', icon: <Globe className="w-4 h-4" /> },
    { name: 'Performance', icon: <Zap className="w-4 h-4" /> }
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">

      <motion.div
        className="w-full max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ── Main Heading ── */}
        <h1 className="text-5xl md:text-7xl font-bold relative z-20 mb-0 text-white">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Sailesh</span>
        </h1>



        {/* ── Subtitle & rest of content ── */}
        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-xl md:text-2xl text-cyan-100 mb-4 max-w-2xl mx-auto pt-10">
            <EncryptedText
              text="Full Stack Developer and AI Solution Architect."
              encryptedClassName="text-white/30"
              revealedClassName="text-white/90"
              revealDelayMs={100}
            />
          </p>

          <h3 className="text-lg text-white/70 mb-6 tracking-wide">
            Founder –{' '}
            <a href="https://www.codecraftnet.com/" className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent hover:text-cyan-300 transition-colors">
              Code Craft
            </a>
          </h3>

          <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
            I create modern, scalable web applications with clean code and exceptional user experiences.
            Passionate about building solutions that make a difference.
          </p>

          {/* Tech Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {techButtons.map((button, index) => (
              <motion.button
                key={button.name}
                className="relative px-4 py-2 rounded-full font-medium text-sm cursor-pointer transition-all duration-300 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-purple-400">{button.icon}</span>
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
                    {button.name}
                  </span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;