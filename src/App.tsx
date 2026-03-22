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
import Galaxy from './components/ui/Galaxy';
import CTA from './components/sections/CTA';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);



  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
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

        {/* ── Galaxy Background (fixed, covers entire site) ── */}
        <div className="fixed inset-0 w-full h-full z-0" style={{ background: '#000000' }}>
          <Galaxy
            mouseRepulsion
            mouseInteraction
            globalMouse
            density={1}
            glowIntensity={0.2}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={0.5}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
            transparent
          />
        </div>
        <div className="content-wrapper relative z-10">
          <Header activeSection={activeSection} />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <CTA />
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