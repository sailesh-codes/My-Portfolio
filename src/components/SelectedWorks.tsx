import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  span: string;
  aspect: string;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Automotive Motion',
    category: 'Design Engineering / 3D',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    id: '02',
    title: 'Urban Architecture',
    category: 'Spatial Design / UI',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-5',
    aspect: 'aspect-[4/3] md:aspect-auto',
  },
  {
    id: '03',
    title: 'Human Perspective',
    category: 'Creative Direction',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-5',
    aspect: 'aspect-[4/3] md:aspect-auto',
  },
  {
    id: '04',
    title: 'Brand Identity',
    category: 'Design Systems & Web',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-7',
    aspect: 'aspect-[16/10]',
  },
];

export const SelectedWorks: React.FC = () => {
  return (
    <section id="work" className="bg-bg py-16 md:py-24 relative z-10">
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
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-light">
              Featured <span className="font-display italic text-[#89AACC]">projects</span>
            </h2>
            <p className="text-muted text-sm sm:text-base mt-3 max-w-lg">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          {/* View all work button (desktop only) */}
          <a
            href="#work"
            className="group hidden md:inline-flex items-center gap-2 text-sm text-text-primary px-5 py-2.5 rounded-full border border-stroke bg-surface hover:border-transparent relative transition-all duration-300 hover:scale-105"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              <span>View all work</span>
              <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: '-50px' }}
              className={`${project.span} ${project.aspect} bg-surface border border-stroke rounded-3xl overflow-hidden relative group cursor-pointer min-h-[320px]`}
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Halftone Pattern Overlay */}
              <div className="absolute inset-0 halftone-pattern opacity-20 mix-blend-multiply pointer-events-none" />

              {/* Subtle Default Gradient at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-between transition-opacity duration-300 group-hover:opacity-0">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                    {project.id}
                  </span>
                  <span className="text-xs text-white/60 uppercase tracking-widest">
                    {project.year}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display italic text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70">{project.category}</p>
                </div>
              </div>

              {/* Hover Backdrop Overlay & Label */}
              <div className="absolute inset-0 bg-bg/75 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6 text-center">
                <div className="relative inline-flex items-center justify-center p-[1.5px] rounded-full">
                  <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
                  <div className="relative bg-white text-gray-950 px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl">
                    <span className="text-xs sm:text-sm font-medium">View —</span>
                    <span className="font-display italic text-sm sm:text-base font-semibold">
                      {project.title}
                    </span>
                    <span className="text-xs">↗</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
