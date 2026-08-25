import React, { useState } from 'react';
import { ChapterData } from '../data/chapters';
import { KageAudio } from '../utils/KageAudio';

interface EditorialCardProps {
  chapter: ChapterData;
  imageSrc: string;
  isReversed?: boolean;
}

export const EditorialCard: React.FC<EditorialCardProps> = ({ chapter, imageSrc, isReversed }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayMedia = () => {
    KageAudio.playTempleBell(chapter.number === '01' ? 440 : chapter.number === '02' ? 520 : chapter.number === '03' ? 380 : chapter.number === '04' ? 660 : 290);
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  // Split title into words for word-by-word reveal animation
  const titleWords = chapter.title.split(' ');

  return (
    <section
      id={chapter.id}
      className="min-h-screen w-full relative flex items-center justify-center px-6 md:px-16 py-24 text-[#EAE6DF] z-10 pointer-events-auto"
      aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left/Right Text Content (6 cols) */}
        <div className={`lg:col-span-6 flex flex-col gap-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          
          {/* Chapter Metadata & Fine Rule */}
          <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-[#E5A93B]">
            <span className="text-xl font-bold text-[#C83B2B]">{chapter.number}</span>
            <span className="w-8 h-[1px] bg-[#E5A93B]/40" />
            <span>{chapter.reading}</span>
            <span className="opacity-40">·</span>
            <span className="text-white/60">{chapter.elevation}</span>
          </div>

          {/* Vertical Japanese Display Kanji & Oversized Left-Aligned English Heading */}
          <div className="relative flex items-baseline gap-6 my-2">
            
            {/* Large Vertical Japanese Display Type */}
            <div
              className="writing-mode-vertical text-5xl md:text-7xl font-serif text-[#C83B2B]/70 tracking-widest leading-none select-none font-bold shrink-0"
              style={{ writingMode: 'vertical-rl' }}
              aria-hidden="true"
            >
              {chapter.kanji}
            </div>

            {/* Oversized Word-by-Word English Title */}
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight leading-[1.1] text-[#EAE6DF]">
              {titleWords.map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block mr-3 animate-fade-in"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>

          <p className="text-sm font-mono text-[#E5A93B]/90 tracking-wider font-light">
            {chapter.subtitle}
          </p>

          {/* Editorial Quote */}
          <blockquote className="border-l-2 border-[#C83B2B] pl-4 italic font-serif text-lg md:text-xl text-[#EAE6DF]/90 my-2">
            "{chapter.quote}"
          </blockquote>

          {/* Narrative Paragraphs */}
          <div className="flex flex-col gap-3 font-sans text-sm md:text-base leading-relaxed text-[#EAE6DF]/80 font-light max-w-xl">
            {chapter.narrative.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Technical Specs Table */}
          <div className="mt-4 pt-4 border-t border-[#EAE6DF]/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] font-mono tracking-wider">
            {chapter.specs.map((spec, sIdx) => (
              <div key={sIdx} className="flex flex-col gap-1">
                <span className="text-[#E5A93B]/60 text-[9px]">{spec.label}</span>
                <span className="text-white/80 font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cinematic Card Image Frame (6 cols) */}
        <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative group rounded-none overflow-hidden border border-[#EAE6DF]/15 bg-[#0D1117] shadow-2xl transition-all duration-500 hover:border-[#E5A93B]/40">
            
            {/* Image Frame Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={imageSrc}
                alt={`${chapter.title} - ${chapter.subtitle}`}
                className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-[105%] group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Subtle Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-black/30 opacity-70" />

              {/* CENTERED PLAY ICON BUTTON (Centered within image frame itself, excluding caption area) */}
              <button
                onClick={handlePlayMedia}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#0A0B0E]/70 border border-[#E5A93B]/60 text-[#E5A93B] flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-[#C83B2B] group-hover:text-[#C83B2B] transition-all duration-300 shadow-[0_0_20px_rgba(200,59,43,0.3)] focus:outline-none"
                aria-label={`Listen to chapter audio ambience for ${chapter.title}`}
              >
                {isPlayingAudio ? (
                  <span className="w-4 h-4 bg-[#C83B2B] animate-ping rounded-sm" />
                ) : (
                  <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Editorial Caption Area */}
            <div className="p-4 bg-[#0A0B0E]/90 border-t border-[#EAE6DF]/10 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#EAE6DF]/70">
              <span>CAMERA: {chapter.lensSpec}</span>
              <span>GPS: {chapter.coordinates}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
