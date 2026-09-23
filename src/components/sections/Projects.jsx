import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileScrollReveal from '../ui/MobileScrollReveal';
import './Projects.css';


gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    number: '01 / 06',
    title: 'Code Craft',
    description:
      'A professional web service platform specializing in bespoke web development, performant digital infrastructure, and modern software architectures to help high-growth businesses thrive online.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/projectcodecraft-img.png',
    demo: 'https://www.codecraftnet.com/',
    github: 'https://www.codecraftnet.com/',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    accentColor: '#a855f7',
  },
  {
    id: '02',
    number: '02 / 06',
    title: 'Megasifi',
    description:
      'A sleek, high-conversion modern e-commerce storefront featuring curated style collections, fluid animations, instant search, and real-time state management.',
    tech: ['TypeScript', 'REST API', 'Tailwind CSS', 'React'],
    image: '/images/megasifi.jpeg',
    demo: 'https://megasifi.shop/',
    github: 'https://megasifi.shop/',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    accentColor: '#3b82f6',
  },
  {
    id: '03',
    number: '03 / 06',
    title: 'Studio6 Interiors',
    description:
      'An editorial design portfolio crafting elegant, functional spaces tailored to modern residential and commercial architectures with rich visual storytelling.',
    tech: ['React', 'Tailwind CSS', 'Motion UI', 'API'],
    image: '/images/studio6.jpeg',
    demo: 'https://www.studio6interiors.in/',
    github: 'https://www.studio6interiors.in/',
    glowColor: 'rgba(234, 179, 8, 0.22)',
    accentColor: '#eab308',
  },
  {
    id: '04',
    number: '04 / 06',
    title: 'GRIDO1 — F1 Experience',
    description:
      'A high-performance Formula 1 digital experience engineered with GSAP scroll-triggered timelines and buttery smooth scrolling. Features dynamic aerodynamic telemetry, interactive trackside visual effects, and high-speed motion physics.',
    tech: ['GSAP', 'Smooth Scroll', 'Three.js', 'F1 Motion'],
    image: '/images/3d-3.png',
    demo: 'https://f1-theta-neon.vercel.app/',
    github: 'https://f1-theta-neon.vercel.app/',
    glowColor: 'rgba(2, 210, 227, 0.28)',
    accentColor: '#02d2e3',
  },
  {
    id: '05',
    number: '05 / 06',
    title: 'Pure Zero 3D',
    description:
      'A luxury 3D interactive web experience engineered with high-fidelity WebGL rendering, fluid spatial physics, and bespoke visual storytelling for next-generation brand immersion.',
    tech: ['Three.js', 'WebGL', 'React', '3D Motion'],
    image: '/images/3d-1.png',
    demo: 'https://t1-soda.vercel.app/',
    github: 'https://t1-soda.vercel.app/',
    glowColor: 'rgba(56, 189, 248, 0.28)',
    accentColor: '#38bdf8',
  },
  {
    id: '06',
    number: '06 / 06',
    title: '3D Character Carousel',
    description:
      'A smooth 3D character carousel effect featuring interactive spatial transitions, fluid motion physics, and modern WebGL depth rendering.',
    tech: ['Three.js', 'React', 'WebGL', '3D Motion'],
    image: '/images/3d-2.png',
    demo: 'https://3dcharacter-three.vercel.app/',
    github: 'https://3dcharacter-three.vercel.app/',
    glowColor: 'rgba(249, 115, 22, 0.28)',
    accentColor: '#f97316',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const slidesWrapperRef = useRef(null);
  const headingMagneticRef = useRef(null);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [headingMagneticOffset, setHeadingMagneticOffset] = useState({ x: 0, y: 0 });
  const [isHeadingHovered, setIsHeadingHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Ambient mouse parallax tracker when Projects section is in view
  useEffect(() => {
    if (prefersReducedMotion) return;

    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX / innerWidth - 0.5) * 2;
        const normY = (e.clientY / innerHeight - 0.5) * 2;
        setMouseOffset({ x: normX, y: normY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Magnetic attraction for the "PROJECTS" header
  const handleHeadingMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const el = headingMagneticRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.38;
    const deltaY = (e.clientY - centerY) * 0.38;

    gsap.to(el, {
      x: deltaX,
      y: deltaY,
      duration: 0.32,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleHeadingMouseLeave = () => {
    if (prefersReducedMotion) return;
    const el = headingMagneticRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.85,
      ease: 'elastic.out(1.1, 0.4)',
      overwrite: 'auto',
    });
  };

  // GSAP 3D Stacking Panels ScrollTrigger Timeline
  // Active ONLY on desktop (min-width: 1024px).
  // On mobile & tablet (max-width: 1023px), panels flow naturally as a clean scrollable project showcase.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // ── DESKTOP (min-width: 1024px): 100% UNTOUCHED 3D STACKING PANELS ──
    mm.add('(min-width: 1024px)', () => {
      const panels = gsap.utils.toArray('.project-panel');
      if (panels.length <= 1) return;

      // All panels except the last one get pinned and scaled down
      const panelsToPin = panels.slice(0, -1);

      panelsToPin.forEach((panel) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'bottom bottom',
            pinSpacing: false,
            pin: true,
            scrub: true,
            onRefresh: () => {
              gsap.set(panel, {
                transformOrigin:
                  'center ' + (panel.offsetHeight - window.innerHeight / 2) + 'px',
              });
            },
          },
        });

        tl.fromTo(
          panel,
          { y: 0, rotate: 0, scale: 1, opacity: 1 },
          { y: 0, rotateX: 0, scale: 0.5, opacity: 0.45, ease: 'none', duration: 1 },
          0
        ).to(panel, { opacity: 0, duration: 0.1, ease: 'power1.out' });
      });

      ScrollTrigger.refresh();
    });

    // ── MOBILE & TABLET (max-width: 1023px): Normal natural scroll, no pins ──
    mm.add('(max-width: 1023px)', () => {
      gsap.set('.project-panel', { clearProps: 'all', opacity: 1, scale: 1, y: 0 });
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="projects" ref={sectionRef} className="projects-section-container">
      {/* ── Section Header with Magnetic Cursor Effect ── */}
      <MobileScrollReveal mobileOnly={true} yOffset={40} scaleFrom={0.94}>
        <div className="projects-header-wrapper">
          {/* Ambient Glow Backdrop Layer matching About Me */}
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-[60vw] max-w-[650px] h-[260px] rounded-full pointer-events-none opacity-25 blur-[90px]"
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 70%)',
              transform: prefersReducedMotion ? 'none' : `translate3d(${mouseOffset.x * -18}px, ${mouseOffset.y * -12}px, 0)`,
              transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
              willChange: 'transform',
            }}
          />

          <div className="inline-block relative mb-6 z-10">
            <div
              ref={headingMagneticRef}
              onMouseMove={handleHeadingMouseMove}
              onMouseLeave={handleHeadingMouseLeave}
              className="cursor-default select-none py-1 px-4 inline-block"
              style={{
                willChange: 'transform',
              }}
            >
              <h2 className="projects-display-word">
                Projects
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto font-normal z-10 px-4">
            A showcase of bespoke web applications, interactive motion, and full-stack systems.
          </p>
        </div>
      </MobileScrollReveal>

      {/* ── 3D Stacking Panels Slides Wrapper ── */}
      <div ref={slidesWrapperRef} className={`projects-slides-wrapper${isMobile ? ' projects-stack-mobile' : ''}`}>
        {projects.map((project, index) => (
          <section
            key={project.id}
            className={`project-panel${isMobile ? ' project-panel-stacked' : ''}`}
            data-index={index}
            style={isMobile ? { '--card-index': index } : {}}
          >
            {/* Ambient Radial Color Accent */}
            <div
              className="project-panel-glow"
              style={{
                background: `radial-gradient(circle, ${project.glowColor} 0%, transparent 70%)`,
              }}
            />

            {/* Project Card Inner — Mobile: glass card, Desktop: transparent panel */}
            {isMobile ? (
              <div className="project-mobile-card">
                {/* Card number badge */}
                <span className="project-mobile-badge">{project.number}</span>

                {/* Featured image */}
                <div className="project-mobile-image">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                  {/* Accent color overlay strip */}
                  <div
                    className="project-mobile-image-accent"
                    style={{ background: `linear-gradient(135deg, ${project.accentColor}22 0%, transparent 60%)` }}
                  />
                </div>

                {/* Info */}
                <div className="project-mobile-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech-tags">
                    {project.tech.map((tag, tIdx) => (
                      <span key={tIdx} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a
                      href={project.demo || project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn project-btn-primary"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <MobileScrollReveal
                mobileOnly={true}
                yOffset={55}
                scaleFrom={0.93}
                opacityFrom={0.18}
                className="w-full flex items-center justify-center"
              >
                <div className="project-card-inner">
                  {/* Left Column: Project Info */}
                  <div className="project-info-col">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech-tags">
                      {project.tech.map((tag, tIdx) => (
                        <span key={tIdx} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      <a
                        href={project.demo || project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn project-btn-primary"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  {/* Right Column: Featured Mockup Image */}
                  <div className="project-image-col">
                    <div className="project-image-frame">
                      <img
                        src={project.image}
                        alt={`${project.title} project preview`}
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>
                </div>
              </MobileScrollReveal>
            )}
          </section>
        ))}
      </div>
    </section>
  );
};

export default Projects;