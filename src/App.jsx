import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from './components/ui/toaster';
import Header from './components/layout/layout/Header';
import MobileNav from './components/layout/MobileNav';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/layout/layout/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Generate static particle positions once
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      xEnd1: Math.random() * 100 - 50,
      xEnd2: Math.random() * 200 - 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 4,
    }));
  }, []);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (isMobile) return; // Don't track cursor on mobile
      
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      setTimeout(() => {
        setFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    const handleMouseDown = () => {
      if (isMobile) return; // Don't track clicks on mobile
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      if (isMobile) return; // Don't track clicks on mobile
      setIsClicking(false);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

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

  return (
    <>
      <Helmet>
        <title>Sailesh - Full Stack Developer Portfolio</title>
        <meta name="description" content="Full-stack React, Node.js & Express developer specializing in modern web applications. View my projects and skills." />
        <meta property="og:title" content="Sailesh - Full Stack Developer Portfolio" />
        <meta property="og:description" content="Full-stack React, Node.js & Express developer specializing in modern web applications. View my projects and skills." />
      </Helmet>
      
      <div className="min-h-screen relative overflow-x-hidden bg-black">
        {/* Global Particle Dots Effect - Completely Static Movement */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -150, -300],
                x: [0, particle.xEnd1, particle.xEnd2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeOut"
              }}
              whileHover={undefined}
              whileTap={undefined}
            />
          ))}
        </div>
        
        {/* Custom Cursor - Only on Desktop */}
        {!isMobile && (
          <>
            <div 
              className={`cursor ${isClicking ? 'clicking' : ''}`} 
              style={{ left: cursorPosition.x, top: cursorPosition.y }}
            ></div>
            <div 
              className={`cursor-follower ${isClicking ? 'clicking' : ''}`} 
              style={{ left: followerPosition.x, top: followerPosition.y }}
            ></div>
          </>
        )}
        
        <div className="content-wrapper relative z-10">
          <Header activeSection={activeSection} />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
        
        <MobileNav />
        <Toaster />
      </div>
    </>
  );
}

export default App;