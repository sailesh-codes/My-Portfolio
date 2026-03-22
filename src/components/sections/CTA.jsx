import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Tooltip } from '../ui/tooltip-card';

const ImageTooltipCard = ({ title, description, src }) => (
  <div className="w-56 md:w-64">
    <div className="aspect-video w-full rounded-sm bg-neutral-900 overflow-hidden flex items-center justify-center">
      <img
        src={src}
        alt={title}
        className="w-full h-full object-contain"
      />
    </div>
    <div className="my-4 flex flex-col">
      <p className="text-lg font-bold text-white mb-0">{title}</p>
      <p className="mt-1 text-xs text-neutral-400">
        {description}
      </p>
    </div>
  </div>
);

const CTA = () => {
  return (
    <section className="w-full py-32 relative overflow-hidden flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12">
          Want to build a site with <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">WOW Factor?</span>
        </h2>
        <p className="text-lg md:text-2xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
          Let's collaborate and bring your{" "}
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
            <span className="font-bold text-purple-400 cursor-pointer border-b border-purple-400/50 hover:border-purple-400 transition-colors">ideas</span>
          </Tooltip>{" "}
          to life with modern, engaging, and{" "}
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
            <span className="font-bold text-blue-400 cursor-pointer border-b border-blue-400/50 hover:border-blue-400 transition-colors">high-performance</span>
          </Tooltip>{" "}
          web applications. I'm ready for the next{" "}
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
            <span className="font-bold text-cyan-400 cursor-pointer border-b border-cyan-400/50 hover:border-cyan-400 transition-colors">challenge</span>
          </Tooltip>.
        </p>
        <a href="#contact" className="inline-block" onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById('contact');
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/20 hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
          >
            Contact Me <ArrowRight className="w-5 h-5" />
          </motion.button>
        </a>
      </motion.div>
    </section>
  );
};

export default CTA;
