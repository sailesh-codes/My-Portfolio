import React from 'react';
import { motion } from 'framer-motion';

interface JournalEntry {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

const entries: JournalEntry[] = [
  {
    id: '01',
    title: 'The Philosophy of Minimal User Experience',
    category: 'Architecture',
    readTime: '6 min read',
    date: 'Oct 24, 2025',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '02',
    title: 'Engineering High-Performance Micro-Interactions',
    category: 'Engineering',
    readTime: '4 min read',
    date: 'Nov 12, 2025',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '03',
    title: 'System Design for Generative AI Interfaces',
    category: 'Product',
    readTime: '8 min read',
    date: 'Jan 08, 2026',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '04',
    title: 'The Evolution of Digital Brand Spaces',
    category: 'Design',
    readTime: '5 min read',
    date: 'Feb 19, 2026',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop',
  },
];

export const Journal: React.FC = () => {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke inline-block" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-light">
              Recent <span className="font-display italic text-[#89AACC]">thoughts</span>
            </h2>
            <p className="text-muted text-sm sm:text-base mt-3 max-w-lg">
              Writings on design engineering, system aesthetics, and creative code.
            </p>
          </div>

          <a
            href="#journal"
            className="group hidden md:inline-flex items-center gap-2 text-sm text-text-primary px-5 py-2.5 rounded-full border border-stroke bg-surface hover:border-transparent relative transition-all duration-300 hover:scale-105"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              <span>View all articles</span>
              <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </motion.div>

        {/* Horizontal Entry Pills */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: '-50px' }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-all duration-300 cursor-pointer"
            >
              {/* Left Group */}
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Thumbnail */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 border border-stroke">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Title & Metadata */}
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-text-primary group-hover:text-[#89AACC] transition-colors leading-snug">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted">
                    <span className="text-text-primary/70">{entry.category}</span>
                    <span className="w-1 h-1 rounded-full bg-stroke" />
                    <span>{entry.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Right Group */}
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:pl-4 border-t sm:border-t-0 border-stroke/40 pt-3 sm:pt-0">
                <span className="text-xs font-mono text-muted/70 whitespace-nowrap">
                  {entry.date}
                </span>
                <div className="w-9 h-9 rounded-full bg-surface border border-stroke flex items-center justify-center text-text-primary text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:border-white/30 group-hover:bg-[#4E85BF]/20">
                  ↗
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
