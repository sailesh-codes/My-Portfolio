import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from './components/ui/toaster';
import Header from './components/layout/layout/Header';
import MobileNav from './components/layout/MobileNav';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import HorizontalText from './components/sections/HorizontalText';
import Skills from './components/sections/Skills';
import About from './components/sections/About';
import Contact from './components/sections/Contact.tsx';
import CTA from './components/sections/CTA';
import ScrollShowcase from './components/sections/ScrollShowcase';
import Footer from './components/layout/layout/Footer';
import { SmoothScroll } from './components/providers/SmoothScroll';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
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
  }, []); // Only run on mount

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  useEffect(() => {
    // Ensure viewport lands directly at the top of the hero section on load/refresh
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleExitFinished = () => {
    // Recalibrate GSAP ScrollTriggers now that the page is fully revealed and interactive
    ScrollTrigger.refresh();
  };

  return (
    <>
      <Helmet>
        <title>Sailesh - Full Stack Developer Portfolio</title>
        <meta name="description" content="Full-stack React, Node.js & Express developer specializing in modern web applications. View my projects and skills." />
        <meta property="og:title" content="Sailesh - Full Stack Developer Portfolio" />
        <meta property="og:description" content="Full-stack React, Node.js & Express developer specializing in modern web applications. View my projects and skills." />
      </Helmet>

      {/* Luxury Preloader Screen with Curtain Reveal */}
      <LoadingScreen
        onLoadingComplete={handleLoadingComplete}
        onExitFinished={handleExitFinished}
      />
      
      <SmoothScroll />

      {/* Main Page Container: Rock-solid, zero glitches or scale shifts */}
      <div className="min-h-screen relative overflow-x-clip bg-black">
        <div className="content-wrapper relative z-10">
          <Header activeSection={activeSection} />
          <main>
            <Hero />
            <About />
            <Projects />
            <HorizontalText />
            <Skills />
            <CTA />
            <ScrollShowcase />
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