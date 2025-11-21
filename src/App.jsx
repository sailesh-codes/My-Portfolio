import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from './components/ui/toaster';
import Header from './components/layout/layout/Header';
import MobileNav from './components/layout/MobileNav';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/layout/layout/Footer';
import ThemeToggle from './components/layout/layout/ThemeToggle';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
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

      <div className="min-h-screen relative overflow-x-hidden">
        <div className="background-text">SAILESH</div>
        
        <Header activeSection={activeSection} />
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

        <div className="content-wrapper">
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