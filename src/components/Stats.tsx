import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    value: '20+',
    label: 'Years Experience',
    description: 'Mastering digital craft across design & code',
  },
  {
    value: '95+',
    label: 'Projects Done',
    description: 'From enterprise platforms to boutique apps',
  },
  {
    value: '200%',
    label: 'Satisfied Clients',
    description: 'Consistent delivery with measurable impact',
  },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-20 md:py-28 border-y border-stroke/50 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface/20 border border-stroke/40 hover:border-stroke hover:bg-surface/40 transition-all duration-300"
            >
              <span className="font-display italic text-6xl md:text-7xl lg:text-8xl text-text-primary mb-2 leading-none">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-text-primary/90 font-medium uppercase tracking-[0.25em] mb-2">
                {stat.label}
              </span>
              <span className="text-xs text-muted max-w-[200px] leading-relaxed">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
