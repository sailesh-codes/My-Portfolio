import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Wrench, Mail } from 'lucide-react';
import { scrollToTarget } from '../providers/SmoothScroll';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef(null);

  const navItems = [
    { id: 'home', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { id: 'about', icon: <User className="w-6 h-6" />, label: 'About' },
    { id: 'projects', icon: <Briefcase className="w-6 h-6" />, label: 'Projects' },
    { id: 'skills', icon: <Wrench className="w-6 h-6" />, label: 'Skills' },
    { id: 'contact', icon: <Mail className="w-6 h-6" />, label: 'Contact' },
  ];

  const scrollToSection = (sectionId) => {
    scrollToTarget(sectionId, -20);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Toggle menu"]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mobile-nav-shell md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
    >
      {/* Floating Glass Pill */}
      <nav
        ref={menuRef}
        className="mobile-nav-pill pointer-events-auto"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`mobile-nav-item${activeSection === item.id ? ' active' : ''}`}
            aria-label={item.label}
          >
            {/* Active glow bubble behind icon */}
            {activeSection === item.id && (
              <motion.span
                layoutId="mobile-nav-active-bg"
                className="mobile-nav-active-bg"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
