import React, { useState, useEffect } from 'react';
import SmoothScroll from './components/layout/SmoothScroll';
import Header from './components/layout/layout/Header';
import Footer from './components/layout/layout/Footer';
import ScfoGridAndIndex from './components/layout/ScfoGridAndIndex';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import ResponsiveSection from './components/sections/ResponsiveSection';
import CTA from './components/sections/CTA';
import Contact from './components/sections/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'responsive', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 350;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-[#050508] text-[#f0f0f5] min-h-screen relative selection:bg-purple-500/30 selection:text-white">
        {/* SCFO Architectural Grid & Side Index */}
        <ScfoGridAndIndex activeSection={activeSection} />

        {/* Global Navigation Header */}
        <Header activeSection={activeSection} />

        {/* Main Content Sections */}
        <main className="relative z-10 flex flex-col w-full">
          {/* 01: Hero Section */}
          <Hero />

          {/* 02: About Section */}
          <About />

          {/* 03: Projects Timeline */}
          <Projects />

          {/* 04: Responsive Morph Showcase */}
          <ResponsiveSection />

          {/* 05: Collaboration CTA */}
          <CTA />

          {/* 06: Contact Form & Webcam Interactive Grid */}
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}