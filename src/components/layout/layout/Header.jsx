import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollToTarget } from '../../providers/SmoothScroll';

function NavItem({ link, isActive, scrollToSection }) {
  return (
    <a
      href={`#${link.id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(link.id);
      }}
      className={`relative px-4.5 py-2 sm:px-5 sm:py-2 rounded-full text-sm sm:text-[0.9375rem] font-medium tracking-wide transition-colors duration-200 select-none flex items-center justify-center cursor-pointer ${
        isActive
          ? 'text-white font-semibold'
          : 'text-neutral-400 hover:text-white hover:bg-white/[0.08]'
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="normalNavActivePill"
          className="absolute inset-0 rounded-full bg-white/15 border border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-md"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative z-10">{link.title}</span>
    </a>
  );
}

const Header = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'projects', title: 'Projects' },
    { id: 'skills', title: 'Skills' },
    { id: 'contact', title: 'Contact' },
  ];

  const scrollToSection = (sectionId) => {
    scrollToTarget(sectionId, -80);
    setIsOpen(false);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 20);

          // If the fullscreen menu overlay is open, keep states steady
          if (!isOpen) {
            // Always show navbar near the very top of the page
            if (currentScrollY < 60) {
              setIsNavVisible(true);
            } else {
              const delta = currentScrollY - lastScrollY.current;
              if (delta > 8) {
                // Scrolling down -> hide navbar, show hamburger
                setIsNavVisible(false);
              } else if (delta < -8) {
                // Scrolling up -> show navbar, hide hamburger
                setIsNavVisible(true);
              }
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle navigation menu"]')
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
        delay: i * 0.08,
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <>
      {/* Floating Hamburger Menu Button popping into the top-right corner on scroll down (always accessible on mobile) */}
      <motion.div
        initial={false}
        animate={{
          scale: isMobileScreen || !isNavVisible || isOpen ? 1 : 0,
          opacity: isMobileScreen || !isNavVisible || isOpen ? 1 : 0,
          y: isMobileScreen || !isNavVisible || isOpen ? 0 : -20,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 25,
        }}
        className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-[70] ${
          isMobileScreen || !isNavVisible || isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-11 w-11 sm:h-12 sm:w-12 rounded-full flex items-center justify-center transition-colors duration-300 shadow-xl border cursor-pointer"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%), rgba(12, 14, 18, 0.85)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            borderColor: isOpen ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.16)',
            boxShadow:
              '0 12px 28px -6px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
          }}
          whileHover={{
            scale: 1.06,
            boxShadow:
              '0 0 20px rgba(255, 255, 255, 0.2), 0 12px 28px -6px rgba(0, 0, 0, 0.6)',
          }}
          whileTap={{ scale: 0.94 }}
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Main Navigation Bar (Hides when scrolling down, slides back when scrolling up) */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{
          opacity: isNavVisible ? 1 : 0,
          y: isNavVisible ? 0 : -90,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none`}
      >
        <div
          className={`hidden md:flex px-2.5 py-1.5 sm:px-3 sm:py-2 items-center rounded-full transition-all duration-300 shadow-xl border ${
            isNavVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%), rgba(12, 14, 18, 0.72)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderColor: 'rgba(255, 255, 255, 0.16)',
            boxShadow:
              '0 12px 32px -8px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <nav className="hidden md:flex items-center gap-1.5 sm:gap-2">
            {navLinks.map((link) => (
              <NavItem
                key={link.id}
                link={link}
                isActive={activeSection === link.id}
                scrollToSection={scrollToSection}
              />
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Fullscreen Navigation Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[60] flex flex-col justify-center items-center px-6 overflow-y-auto py-12"
            style={{
              backdropFilter: 'blur(36px) saturate(190%)',
              WebkitBackdropFilter: 'blur(36px) saturate(190%)',
            }}
          >
            <nav className="container mx-auto px-6 max-w-md flex flex-col items-center my-auto">
              <ul className="flex flex-col items-center space-y-5 sm:space-y-7 text-center">
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
                      className={`block py-1.5 sm:py-2 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight transition-all duration-300 hover:scale-105 active:scale-95 ${
                        activeSection === link.id 
                          ? 'text-white' 
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {link.title}
                      {activeSection === link.id && (
                        <motion.span 
                          className="block h-1 w-10 mx-auto bg-white rounded-full mt-2"
                          layoutId="menuNavIndicator"
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