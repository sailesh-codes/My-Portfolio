import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'projects', title: 'Projects' },
    { id: 'skills', title: 'Skills' },
    { id: 'contact', title: 'Contact' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for the fixed header height
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Toggle menu"]')) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeInOut" 
      } 
    },
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      } 
    },
  };
  
  const navItemVariants = {
    closed: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  const menuButtonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-4 left-0 right-0 z-40 flex justify-end md:justify-center pointer-events-none px-4 md:px-0"
      >
        <div
          className="pointer-events-auto px-4 md:px-8 py-2 md:py-0 md:h-[4.5rem] flex items-center gap-8 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.25)',
          }}
        >
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className={`nav-link font-medium text-lg tracking-wide transition-colors ${
                  activeSection === link.id
                    ? 'active text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-full text-white/70 hover:text-white transition-colors"
              variants={menuButtonVariants}
              initial="initial"
              whileTap="tap"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-30 md:hidden pt-24"
          >
            <nav className="container mx-auto px-6">
              <ul className="flex flex-col space-y-6">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.id}
                    custom={i}
                    variants={navItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className={`block py-3 text-2xl font-medium transition-colors ${
                        activeSection === link.id 
                          ? 'text-primary' 
                          : 'text-foreground/90 hover:text-primary'
                      }`}
                    >
                      {link.title}
                      {activeSection === link.id && (
                        <motion.span 
                          className="block h-0.5 bg-primary mt-1"
                          layoutId="mobileNavIndicator"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;