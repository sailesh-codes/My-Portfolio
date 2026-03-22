import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Wrench, Mail } from 'lucide-react';

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Mobile Navigation Bar */}
      <div className="bg-black/40 backdrop-blur-xl border-t border-white/20">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                activeSection === item.id 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <span className="flex items-center justify-center mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
              {activeSection === item.id && (
                <div className="w-1 h-1 bg-white rounded-full mt-1"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
