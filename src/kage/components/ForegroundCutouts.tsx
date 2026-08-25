import React from 'react';

interface ForegroundCutoutsProps {
  activeChapterId: string;
}

export const ForegroundCutouts: React.FC<ForegroundCutoutsProps> = ({ activeChapterId }) => {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-0 right-0 h-40 md:h-56 z-20 pointer-events-none overflow-hidden select-none"
    >
      {/* Chapter 01 Cutouts: Pine Branches & Mossy Stone Base */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out transform ${
          activeChapterId === 'threshold'
            ? 'opacity-100 translate-y-0 blur-0'
            : 'opacity-0 translate-y-12 blur-md'
        }`}
      >
        <svg className="w-full h-full text-[#08090C]" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 200 L0 140 Q 150 90, 300 120 T 600 110 T 900 130 T 1200 100 L 1200 200 Z" opacity="0.95" />
          <path d="M0 200 L0 160 Q 200 120, 450 150 T 800 140 T 1200 150 L 1200 200 Z" opacity="0.6" />
          {/* Pine Branch Silhouettes */}
          <path d="M50 130 C 80 80, 140 70, 200 100 C 180 120, 120 125, 50 130 Z" fill="#0A0B0E" />
          <path d="M950 120 C 1000 60, 1080 50, 1150 90 C 1120 110, 1060 115, 950 120 Z" fill="#0A0B0E" />
        </svg>
      </div>

      {/* Chapter 02 Cutouts: Stone Lantern Silhouette & Winding Steps Base */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out transform ${
          activeChapterId === 'ascent'
            ? 'opacity-100 translate-y-0 blur-0'
            : 'opacity-0 translate-y-12 blur-md'
        }`}
      >
        <svg className="w-full h-full text-[#060709]" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 200 L0 150 Q 250 110, 500 140 T 900 120 T 1200 135 L 1200 200 Z" />
          {/* Tōrō Lantern Roof & Base Silhouette */}
          <path d="M120 150 L 100 110 L 160 110 L 140 150 Z" />
          <path d="M880 140 L 860 95 L 930 95 L 910 140 Z" />
        </svg>
      </div>

      {/* Chapter 03 Cutouts: Weeping Maple Branches & Zen Sand Ripples */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out transform ${
          activeChapterId === 'stillness'
            ? 'opacity-100 translate-y-0 blur-0'
            : 'opacity-0 translate-y-12 blur-md'
        }`}
      >
        <svg className="w-full h-full text-[#0B0D12]" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 200 L0 165 C 300 145, 600 175, 1200 140 L 1200 200 Z" />
          {/* Weeping Maple Leaves Overhang */}
          <path d="M0 0 L 180 0 C 140 60, 80 100, 0 130 Z" fill="#060709" opacity="0.9" />
          <path d="M1200 0 L 1020 0 C 1060 70, 1120 110, 1200 140 Z" fill="#060709" opacity="0.9" />
        </svg>
      </div>

      {/* Chapter 04 Cutouts: Shoji Frame & Cypress Beam Edges */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out transform ${
          activeChapterId === 'craft'
            ? 'opacity-100 translate-y-0 blur-0'
            : 'opacity-0 translate-y-12 blur-md'
        }`}
      >
        <svg className="w-full h-full text-[#08090C]" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 200 L0 155 Q 350 135, 700 150 T 1200 140 L 1200 200 Z" />
          {/* Geometric Kumiko Border Cutout */}
          <rect x="0" y="160" width="1200" height="40" fill="#050608" />
        </svg>
      </div>

      {/* Chapter 05 Cutouts: Kiyomizu Stage Balcony Railing Silhouette */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out transform ${
          activeChapterId === 'afterlight'
            ? 'opacity-100 translate-y-0 blur-0'
            : 'opacity-0 translate-y-12 blur-md'
        }`}
      >
        <svg className="w-full h-full text-[#050608]" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 200 L0 130 L 1200 130 L 1200 200 Z" opacity="0.95" />
          {/* Balcony Rail Posts */}
          <rect x="100" y="80" width="16" height="50" />
          <rect x="350" y="80" width="16" height="50" />
          <rect x="600" y="80" width="16" height="50" />
          <rect x="850" y="80" width="16" height="50" />
          <rect x="1100" y="80" width="16" height="50" />
          {/* Handrail Bar */}
          <rect x="0" y="75" width="1200" height="12" />
        </svg>
      </div>
    </div>
  );
};
