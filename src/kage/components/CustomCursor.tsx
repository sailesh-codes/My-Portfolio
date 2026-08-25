import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on fine pointer devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsPointer(true);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isPointer || !isVisible) return null;

  return (
    <div className="hidden md:block fixed pointer-events-none z-50 mix-blend-difference">
      {/* Outer Ring */}
      <div
        className="fixed w-8 h-8 rounded-full border border-[#E5A93B] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Inner Dot */}
      <div
        className="fixed w-1.5 h-1.5 rounded-full bg-[#C83B2B] -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
    </div>
  );
};
