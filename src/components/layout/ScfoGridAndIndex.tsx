import React from 'react';
import { useLenis } from './SmoothScroll';

interface ScfoGridAndIndexProps {
  activeSection: string;
}

export const ScfoGridAndIndex: React.FC<ScfoGridAndIndexProps> = ({ activeSection }) => {
  const { scrollTo } = useLenis();

  const sections = [
    { id: 'home', label: 'start', index: '01' },
    { id: 'about', label: 'about', index: '02' },
    { id: 'projects', label: 'work', index: '03' },
    { id: 'skills', label: 'stack', index: '04' },
    { id: 'contact', label: 'contact', index: '05' },
  ];

  const handleIndexClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      scrollTo(el, -80);
    }
  };

  return (
    <>
      {/* SCFO Architectural Grid Lines */}
      <div className="scfo-grid-bg">
        <div className="scfo-grid-line" />
        <div className="scfo-grid-line" />
        <div className="scfo-grid-line hidden md:block" />
        <div className="scfo-grid-line hidden lg:block" />
        <div className="scfo-grid-line" />
      </div>

      {/* SCFO Left Floating Editorial Side Index (Desktop) */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-6 text-xs pointer-events-auto">
        <span className="scfo-tag mb-2 font-bold tracking-widest text-white/30 uppercase">
          ON THIS PAGE
        </span>
        <div className="flex flex-col gap-3 border-l border-white/10 pl-4">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleIndexClick(sec.id)}
                className={`group flex items-center gap-3 text-left transition-all duration-300 ${
                  isActive ? 'text-white font-bold' : 'text-white/40 hover:text-white/80'
                }`}
              >
                <span className={`h-[1px] transition-all duration-300 ${isActive ? 'w-4 bg-purple-400' : 'w-2 bg-white/20 group-hover:w-3'}`} />
                <span className="font-mono text-[0.65rem] text-purple-400">{sec.index}</span>
                <span className="tracking-wider text-[0.72rem] uppercase">{sec.label}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default ScfoGridAndIndex;
