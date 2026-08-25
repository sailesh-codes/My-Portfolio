import React, { useState } from 'react';
import { KageAudio } from '../utils/KageAudio';
import { CHAPTERS } from '../data/chapters';

interface KageHeaderProps {
  activeChapterId: string;
}

export const KageHeader: React.FC<KageHeaderProps> = ({ activeChapterId }) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const state = KageAudio.toggle();
    setIsAudioActive(state);
  };

  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex items-center justify-between pointer-events-auto mix-blend-difference text-[#EAE6DF]">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <a
            href="#threshold"
            className="text-2xl font-serif tracking-widest font-semibold hover:text-[#C83B2B] transition-colors"
            aria-label="Kage Home"
          >
            KAGE <span className="font-sans text-xs ml-1 tracking-widest text-[#E5A93B]">影</span>
          </a>
          <span className="hidden sm:inline-block text-xs font-mono tracking-widest opacity-60">
            · KYOTO NIGHT WALK
          </span>
        </div>

        {/* Center Active Chapter Tag (Desktop) */}
        <div className="hidden md:flex items-center gap-3 text-xs font-mono tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#C83B2B] animate-pulse" />
          <span className="text-[#E5A93B]">{activeChapter.number}</span>
          <span className="opacity-40">/</span>
          <span className="opacity-80">{activeChapter.title.toUpperCase()}</span>
          <span className="opacity-40">({activeChapter.kanji})</span>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-6">
          {/* Audio Synthesizer Button */}
          <button
            onClick={handleAudioToggle}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#EAE6DF]/20 rounded-full text-xs font-mono tracking-wider hover:border-[#E5A93B] hover:text-[#E5A93B] transition-all"
            aria-label={isAudioActive ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
          >
            <span className={`w-2 h-2 rounded-full ${isAudioActive ? 'bg-[#E5A93B] animate-ping' : 'bg-white/40'}`} />
            <span>SOUND: {isAudioActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-[#EAE6DF] transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-[#EAE6DF] transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-[#EAE6DF] transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-[#0A0B0E]/95 backdrop-blur-xl flex flex-col justify-center px-8 py-12 text-[#EAE6DF] pointer-events-auto"
        >
          <div className="flex justify-between items-center mb-12">
            <span className="text-xl font-serif font-bold tracking-wider">CHAPTERS</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-mono text-[#C83B2B]"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <ul className="flex flex-col gap-6 font-serif text-2xl">
            {CHAPTERS.map((ch) => (
              <li key={ch.id}>
                <button
                  onClick={() => scrollToSection(ch.id)}
                  className="flex items-center gap-4 text-left w-full hover:text-[#E5A93B] transition-colors"
                >
                  <span className="text-xs font-mono text-[#C83B2B]">{ch.number}</span>
                  <span>{ch.title}</span>
                  <span className="text-sm font-sans opacity-50 ml-auto">{ch.kanji}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};
