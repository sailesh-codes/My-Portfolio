import React, { useEffect, useState } from 'react';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#work' },
    { label: 'Journal', href: '#journal' },
    { label: 'Resume', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-black/30 border-white/15' : 'shadow-sm shadow-black/10'
        }`}
      >
        {/* 1. Logo */}
        <a
          href="#home"
          aria-label="Michael Smith Home"
          className="group relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full accent-gradient group-hover:rotate-180 transition-transform duration-500" />
          <div className="relative w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">JA</span>
          </div>
        </a>

        {/* 2. Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5 hidden sm:block" />

        {/* 3. Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.label.toLowerCase();
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium ${
                  isActive
                    ? 'text-text-primary bg-stroke/50'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5 hidden sm:block" />

        {/* 5. "Say hi" button */}
        <a
          href="mailto:hello@michaelsmith.com"
          className="group relative inline-flex items-center justify-center rounded-full text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 sm:py-2 text-text-primary transition-all duration-300 cursor-pointer"
        >
          <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 inline-flex items-center gap-1.5 bg-surface px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full backdrop-blur-md">
            <span>Say hi</span>
            <span className="text-[11px] font-sans transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </a>
      </nav>
    </header>
  );
};
