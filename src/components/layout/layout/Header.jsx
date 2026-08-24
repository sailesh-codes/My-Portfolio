import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLenis } from '../SmoothScroll';

const Header = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const { scrollTo } = useLenis();

  const navLinks = [
    { id: 'home', title: 'START', index: '01' },
    { id: 'about', title: 'ABOUT', index: '02' },
    { id: 'projects', title: 'WORK', index: '03' },
    { id: 'skills', title: 'STACK', index: '04' },
    { id: 'contact', title: 'CONTACT', index: '05' },
  ];

  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      scrollTo(el, -80);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Toggle menu"]')) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-16 py-4 flex items-center justify-between border-b ${
          isScrolled
            ? 'bg-[#08080a]/90 backdrop-blur-2xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Left: Brand Identity */}
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <span className="font-serif-editorial text-lg tracking-widest text-white uppercase group-hover:text-purple-400 transition-colors">
            SAILESH
          </span>
          <span className="scfo-tag border-l border-white/20 pl-3 text-white/40">
            STUDIO
          </span>
        </a>

        {/* Center: Editorial Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className={`nav-link text-xs tracking-[0.25em] font-medium transition-colors ${
                activeSection === link.id
                  ? 'active text-white font-bold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {link.title}
            </a>
          ))}
        </nav>

        {/* Right: SCFO Style Pill Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-xs tracking-widest uppercase font-semibold text-white hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-purple-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#08080a]/95 backdrop-blur-2xl z-40 md:hidden pt-28 px-8 border-b border-white/10"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  className={`flex items-center justify-between py-3 border-b border-white/10 text-xl font-serif-editorial tracking-wider ${
                    activeSection === link.id ? 'text-purple-400 font-bold' : 'text-white/70'
                  }`}
                >
                  <span>{link.title}</span>
                  <span className="font-mono text-xs text-white/40">{link.index}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;