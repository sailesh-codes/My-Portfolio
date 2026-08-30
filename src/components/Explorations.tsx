import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { motion, AnimatePresence } from 'framer-motion';

interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rotation: number;
}

const items: ExplorationItem[] = [
  {
    id: 'e1',
    title: 'Kinetic Typography 3D',
    category: 'Motion Design',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    rotation: -4,
  },
  {
    id: 'e2',
    title: 'Organic Mesh Fluidity',
    category: 'WebGL Shader',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
    rotation: 5,
  },
  {
    id: 'e3',
    title: 'Monochrome Spatial UI',
    category: 'Interface Concept',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    rotation: -3,
  },
  {
    id: 'e4',
    title: 'Prism Light Dispersion',
    category: 'Visual R&D',
    image:
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
    rotation: 4,
  },
  {
    id: 'e5',
    title: 'Algorithmic Patterning',
    category: 'Creative Coding',
    image:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop',
    rotation: -5,
  },
  {
    id: 'e6',
    title: 'Cybernetic Monogram',
    category: 'Brand Form',
    image:
      'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=800&auto=format&fit=crop',
    rotation: 3,
  },
];

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const colLeftRef = useRef<HTMLDivElement | null>(null);
  const colRightRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin center content while scrolling
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax movement for left & right columns
      gsap.fromTo(
        colLeftRef.current,
        { y: 120 },
        {
          y: -180,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        colRightRef.current,
        { y: -60 },
        {
          y: 160,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const leftItems = items.slice(0, 3);
  const rightItems = items.slice(3, 6);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="min-h-[260vh] relative bg-bg py-20 overflow-hidden"
    >
      {/* Layer 1: Pinned Center Content */}
      <div
        ref={contentRef}
        className="h-screen w-full flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10 sticky top-0"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke inline-block" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke inline-block" />
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl text-text-primary tracking-tight font-light mb-4">
            Visual <span className="font-display italic text-[#89AACC]">playground</span>
          </h2>
          <p className="text-muted text-sm sm:text-base mb-8 max-w-md">
            Uncommissioned experiments, generative art, and interface sketches.
          </p>

          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto group relative inline-flex items-center justify-center rounded-full text-xs sm:text-sm px-6 py-2.5 bg-surface border border-stroke hover:border-transparent text-text-primary transition-all duration-300 hover:scale-105"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <span>Follow on Dribbble</span>
              <span className="text-xs">↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Floating Columns */}
      <div className="relative z-20 max-w-[1300px] mx-auto px-6 pt-16 pointer-events-none">
        <div className="grid grid-cols-2 gap-8 sm:gap-16 md:gap-32 lg:gap-48 items-start">
          {/* Column Left */}
          <div ref={colLeftRef} className="flex flex-col gap-16 md:gap-28 items-center sm:items-start">
            {leftItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="pointer-events-auto group relative aspect-square w-full max-w-[300px] sm:max-w-[340px] rounded-2xl sm:rounded-3xl overflow-hidden bg-surface border border-stroke shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 hover:z-30 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                  <span className="text-xs text-[#89AACC] font-mono">{item.category}</span>
                  <h4 className="text-base sm:text-lg font-display italic text-white">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Column Right */}
          <div ref={colRightRef} className="flex flex-col gap-16 md:gap-28 items-center sm:items-end pt-24">
            {rightItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="pointer-events-auto group relative aspect-square w-full max-w-[300px] sm:max-w-[340px] rounded-2xl sm:rounded-3xl overflow-hidden bg-surface border border-stroke shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 hover:z-30 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                  <span className="text-xs text-[#89AACC] font-mono">{item.category}</span>
                  <h4 className="text-base sm:text-lg font-display italic text-white">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted uppercase tracking-wider font-mono">
                    {activeImage.category}
                  </span>
                  <h3 className="text-2xl font-display italic text-text-primary">
                    {activeImage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveImage(null)}
                  className="px-4 py-2 rounded-full border border-stroke bg-bg text-xs text-text-primary hover:bg-stroke/50 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
