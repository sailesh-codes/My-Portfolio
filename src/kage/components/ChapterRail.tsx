import React from 'react';
import { CHAPTERS } from '../data/chapters';

interface ChapterRailProps {
  activeChapterId: string;
}

export const ChapterRail: React.FC<ChapterRailProps> = ({ activeChapterId }) => {
  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Chapter Rail Navigation"
      className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-6 pointer-events-auto"
    >
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#EAE6DF]/30" />

      {CHAPTERS.map((ch) => {
        const isActive = ch.id === activeChapterId;
        return (
          <button
            key={ch.id}
            onClick={() => scrollToChapter(ch.id)}
            className="group relative flex items-center justify-end p-1 focus:outline-none"
            aria-label={`Navigate to Chapter ${ch.number}: ${ch.title}`}
          >
            {/* Hover tooltip */}
            <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-mono tracking-widest text-[#E5A93B] bg-[#0A0B0E]/90 px-2 py-1 border border-[#E5A93B]/30 rounded">
              {ch.number} · {ch.title.toUpperCase()}
            </span>

            {/* Indicator Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-[#C83B2B] shadow-[0_0_10px_#C83B2B]'
                  : 'w-1.5 h-1.5 bg-[#EAE6DF]/40 group-hover:bg-[#E5A93B]'
              }`}
            />
          </button>
        );
      })}

      <div className="w-[1px] h-12 bg-gradient-to-b from-[#EAE6DF]/30 to-transparent" />
    </aside>
  );
};
