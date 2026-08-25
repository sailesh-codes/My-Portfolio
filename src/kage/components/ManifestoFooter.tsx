import React from 'react';
import { MANIFESTO } from '../data/chapters';

export const ManifestoFooter: React.FC = () => {
  return (
    <footer
      aria-label="Art Book Manifesto & Colophon"
      className="relative z-10 w-full bg-[#060709] text-[#EAE6DF] border-t border-[#EAE6DF]/15 px-6 md:px-16 py-24 pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Title & Vertical Kanji */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-xs font-mono tracking-widest text-[#E5A93B]">
            {MANIFESTO.colophon}
          </span>

          <div className="flex items-baseline gap-6">
            <span
              className="writing-mode-vertical text-5xl font-serif text-[#C83B2B] font-bold tracking-widest"
              style={{ writingMode: 'vertical-rl' }}
            >
              {MANIFESTO.kanji}
            </span>
            <h3 className="text-3xl md:text-5xl font-serif font-light leading-tight">
              {MANIFESTO.title}
            </h3>
          </div>

          <div className="w-16 h-[1px] bg-[#C83B2B] my-2" />
        </div>

        {/* Right Column: Manifesto Essay & Credits Grid */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-4 font-sans text-base md:text-lg leading-relaxed text-[#EAE6DF]/85 font-light">
            {MANIFESTO.text.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Credits Grid */}
          <div className="pt-8 border-t border-[#EAE6DF]/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono tracking-wider">
            {MANIFESTO.credits.map((cred, cIdx) => (
              <div key={cIdx} className="flex flex-col gap-1">
                <span className="text-[#E5A93B]/70 text-[10px]">{cred.role}</span>
                <span className="text-white font-medium">{cred.name}</span>
              </div>
            ))}
          </div>

          {/* Copyright & Subpath Compatibility Notice */}
          <div className="mt-8 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/40 border-t border-white/5 pt-6">
            <span>© 2026 KAGE 影 — ALL RIGHTS RESERVED</span>
            <span>GITHUB PAGES READY · RELATIVE ASSET PATHS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
