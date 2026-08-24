import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from './components/ui/toaster';
import Header from './components/layout/layout/Header';
import MobileNav from './components/layout/MobileNav';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import About from './components/sections/About';
import Contact from './components/sections/Contact.tsx';
import CTA from './components/sections/CTA';
import SmoothScroll from './components/layout/SmoothScroll';
import ScfoGridAndIndex from './components/layout/ScfoGridAndIndex';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'about', 'projects', 'skills', 'contact'];
          const scrollPosition = window.scrollY + 120;

          for (const section of sections) {
            const element = document.getElementById(section) as HTMLElement | null;
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SmoothScroll>
      <Helmet>
        <title>Sailesh - Full Stack Developer Portfolio</title>
        <meta name="description" content="Full-stack React, Node.js & Express developer specializing in modern web applications. View my projects and skills." />
        <meta property="og:title" content="Sailesh - Full Stack Developer Portfolio" />
        <meta property="og:description" content="Full-stack React, Node.js & Express developer specializing in modern web applications. View my projects and skills." />
      </Helmet>
      
      <div className="min-h-screen relative overflow-x-hidden bg-[#08080a]">
        {/* SCFO Architectural Grid Lines & Floating Side Index */}
        <ScfoGridAndIndex activeSection={activeSection} />

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
        </div>
        
        <MobileNav />
        <Toaster />
      </div>
    </SmoothScroll>
  );
}

export default App;