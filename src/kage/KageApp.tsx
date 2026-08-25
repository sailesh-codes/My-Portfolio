import React, { useState, useEffect } from 'react';
import { KageCanvas } from './webgl/KageCanvas';
import { KageHeader } from './components/KageHeader';
import { ChapterRail } from './components/ChapterRail';
import { EditorialCard } from './components/EditorialCard';
import { ForegroundCutouts } from './components/ForegroundCutouts';
import { ManifestoFooter } from './components/ManifestoFooter';
import { CustomCursor } from './components/CustomCursor';
import { CHAPTERS } from './data/chapters';
import { CHAPTER_IMAGES } from './data/images';
import './styles/kage.css';

export const KageApp: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState('threshold');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalScroll > 0 ? Math.max(0, Math.min(1, currentScroll / totalScroll)) : 0;
          
          setScrollProgress(progress);

          // Active section detection
          const viewportMid = window.scrollY + window.innerHeight * 0.4;
          for (const ch of CHAPTERS) {
            const el = document.getElementById(ch.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (viewportMid >= top && viewportMid < top + height) {
                setActiveChapterId(ch.id);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0B0E] text-[#EAE6DF] selection:bg-[#C83B2B] selection:text-white font-serif">
      {/* 1. Custom Pointer Cursor */}
      <CustomCursor />

      {/* 2. Fixed Full-Viewport WebGL 3D Environmental Layer */}
      <KageCanvas scrollProgress={scrollProgress} />

      {/* 3. Fixed Top Navigation & Header */}
      <KageHeader activeChapterId={activeChapterId} />

      {/* 4. Fixed Right Editorial Chapter Rail */}
      <ChapterRail activeChapterId={activeChapterId} />

      {/* 5. Main Editorial Chapter Walk Content */}
      <main className="relative z-10">
        
        {/* Editorial Hero Intro Section */}
        <section className="min-h-screen w-full flex flex-col justify-end px-6 md:px-16 pb-20 pointer-events-auto">
          <div className="max-w-5xl flex flex-col gap-6">
            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-[#E5A93B]">
              <span>KAGE · 影</span>
              <span className="w-12 h-[1px] bg-[#E5A93B]/40" />
              <span>FIVE-CHAPTER NIGHT WALK</span>
              <span className="opacity-40">·</span>
              <span>KYOTO MOUNTAIN TEMPLE</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-serif font-light tracking-tight leading-[1.05] text-[#EAE6DF]">
              Walk into the <span className="italic font-normal text-[#C83B2B]">shadows</span> of Mount Higashiyama.
            </h1>

            <p className="text-base md:text-xl font-sans font-light text-[#EAE6DF]/75 max-w-2xl leading-relaxed">
              An editorial art book moving through a live 3D WebGL world. Five chapters of stone lanterns, rain mist, cypress woodcraft, and vermilion moonlight.
            </p>

            <div className="pt-8 flex items-center gap-4 text-xs font-mono text-[#E5A93B]">
              <span className="w-3 h-3 border border-[#E5A93B] rounded-full flex items-center justify-center animate-bounce">
                ↓
              </span>
              <span className="tracking-widest">SCROLL TO ENTER THE THRESHOLD</span>
            </div>
          </div>
        </section>

        {/* Five Chapters */}
        {CHAPTERS.map((chapter, index) => (
          <EditorialCard
            key={chapter.id}
            chapter={chapter}
            imageSrc={CHAPTER_IMAGES[chapter.audioKey]}
            isReversed={index % 2 !== 0}
          />
        ))}

        {/* Manifesto & Colophon Footer */}
        <ManifestoFooter />
      </main>

      {/* 6. Viewport Pinned Foreground Silhouette Cutouts */}
      <ForegroundCutouts activeChapterId={activeChapterId} />
    </div>
  );
};
