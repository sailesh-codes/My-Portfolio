import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileScrollReveal from '../ui/MobileScrollReveal';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

import SkillIcon from './SkillIcon';

const skillColumns = [
  {
    speed: 1.3,
    skills: [
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Docker", slug: "docker" },
    ],
  },
  {
    speed: 0.8,
    skills: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Three.js", slug: "threedotjs" },
      { name: "Python", slug: "python" },
    ],
  },
  {
    speed: 1.1,
    skills: [
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "GSAP", slug: "gsap" },
      { name: "Framer Motion", slug: "framer" },
      { name: "Lenis", slug: "lenis" },
    ],
  },
  {
    speed: 1.45,
    skills: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Redis", slug: "redis" },
      { name: "Prisma", slug: "prisma" },
    ],
  },
  {
    speed: 0.85,
    skills: [
      { name: "LangChain", slug: "langchain" },
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Vercel", slug: "vercel" },
      { name: "Jenkins", slug: "jenkins" },
    ],
  },
];

// Curated rows for the mobile marquee display
const mobileMarqueeRow1 = [
  { name: "React" },
  { name: "TypeScript" },
  { name: "Next.js" },
  { name: "JavaScript" },
  { name: "Three.js" },
  { name: "Tailwind CSS" },
  { name: "GSAP" },
];

const mobileMarqueeRow2 = [
  { name: "Framer Motion" },
  { name: "Lenis" },
  { name: "Python" },
  { name: "Node.js" },
  { name: "Docker" },
  { name: "LangChain" },
  { name: "PostgreSQL" },
];

const mobileMarqueeRow3 = [
  { name: "MongoDB" },
  { name: "Redis" },
  { name: "Prisma" },
  { name: "Git" },
  { name: "GitHub" },
  { name: "Vercel" },
  { name: "Jenkins" },
];

const SkillsMarqueeRow = ({ skills, direction = 'left', duration = '28s', rowIdx = 0, activeTooltipId, onSkillClick }) => {
  // 2 sets are mathematically optimal for seamless infinite looping without DOM bloat
  const sets = [0, 1];

  const hasActiveTooltip = Boolean(activeTooltipId && activeTooltipId.startsWith(`${rowIdx}-`));

  return (
    <div className={`skills-marquee-row-wrapper ${hasActiveTooltip ? 'has-active-tooltip' : ''}`}>
      <div
        className={`skills-marquee-track ${
          direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left'
        }`}
        style={{
          animationDuration: duration,
          animationPlayState: hasActiveTooltip ? 'paused' : 'running',
        }}
      >
        {sets.map((setIdx) =>
          skills.map((skill, sIdx) => {
            const itemId = `${rowIdx}-${setIdx}-${skill.name}`;
            const isTooltipOpen = activeTooltipId === itemId;

            return (
              <div
                key={`${setIdx}-${skill.name || sIdx}`}
                className={`skills-marquee-item ${isTooltipOpen ? 'tooltip-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSkillClick(itemId);
                }}
                title={skill.name}
                role="button"
                tabIndex={0}
                aria-label={skill.name}
              >
                {isTooltipOpen && (
                  <div className="skills-mobile-tooltip">
                    {skill.name}
                  </div>
                )}
                <div className="skills-marquee-pill-icon">
                  <SkillIcon name={skill.name} size={76} stroke={1.2} className="skills-marquee-icon-svg" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const SkillCard = ({ skill }) => {
  return (
    <div
      className="skill-card"
      title={skill.name}
    >
      <div className="skill-card-icon-wrapper flex items-center justify-center">
        <SkillIcon name={skill.name} size={64} className="skill-card-icon" />
      </div>
      <span className="sm:hidden text-[11px] text-neutral-400 mt-1 font-mono tracking-tight text-center truncate max-w-full px-0.5">
        {skill.name}
      </span>
      <div className="skill-tooltip">
        {skill.name}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const columnsGroupRef = useRef(null);
  const headingMagneticRef = useRef(null);

  // Click-to-display tooltip state on mobile marquee
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const tooltipTimerRef = useRef(null);

  const handleSkillClick = (id) => {
    if (activeTooltipId === id) {
      setActiveTooltipId(null);
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    } else {
      setActiveTooltipId(id);
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      // Auto-dismiss tooltip after 2.8 seconds
      tooltipTimerRef.current = setTimeout(() => {
        setActiveTooltipId(null);
      }, 2800);
    }
  };

  // Close tooltip on tap/click outside
  useEffect(() => {
    const handleOutsideInteraction = (e) => {
      if (!e.target.closest('.skills-marquee-item')) {
        setActiveTooltipId(null);
      }
    };
    document.addEventListener('touchstart', handleOutsideInteraction, { passive: true });
    document.addEventListener('click', handleOutsideInteraction);
    return () => {
      document.removeEventListener('touchstart', handleOutsideInteraction);
      document.removeEventListener('click', handleOutsideInteraction);
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    };
  }, []);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Magnetic attraction when hovering near/over the "Skills" heading
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

  // Multi-speed parallax scroll animation using GSAP ScrollTrigger
  // Active ONLY on desktop (min-width: 1024px).
  // On mobile & tablet (max-width: 1023px), columns display naturally in a clean responsive grid without scroll triggers.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // ── DESKTOP (min-width: 1024px): 100% UNTOUCHED MULTI-SPEED PARALLAX ──
    mm.add('(min-width: 1024px)', () => {
      const columns = gsap.utils.toArray('.skills-column');
      const maxTravel = 320;

      columns.forEach((col) => {
        const speed = parseFloat(col.getAttribute('data-speed') || '1');
        const yOffset = (1 - speed) * maxTravel;

        gsap.fromTo(
          col,
          { y: -yOffset },
          {
            y: yOffset,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    // ── MOBILE & TABLET (max-width: 1023px): Natural grid, no parallax scroll triggers ──
    mm.add('(max-width: 1023px)', () => {
      const columns = gsap.utils.toArray('.skills-column');
      gsap.set(columns, { y: 0, clearProps: 'transform' });
    });

    return () => {
      mm.revert();
      if (headingMagneticRef.current) {
        gsap.killTweensOf(headingMagneticRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <section id="skills" ref={sectionRef} className="skills-section">
      {/* ── Section Header with Magnetic Cursor Effect ── */}
      <MobileScrollReveal mobileOnly={true} yOffset={40} scaleFrom={0.94}>
        <div className="skills-header-wrapper">
          <div className="skills-header-glow" />

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
              <h2 className="skills-display-word">
                Skills
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto font-normal z-10 px-4">
            My technical toolkit for building modern, scalable web applications.
          </p>
        </div>
      </MobileScrollReveal>

      {/* ── Mobile Marquee Animation (Mobile & Tablet ONLY: max-width: 1023px) ── */}
      <div className="skills-mobile-marquee-wrapper">
        <div className="skills-marquee-container">
          <SkillsMarqueeRow
            skills={mobileMarqueeRow1}
            direction="left"
            duration="16s"
            rowIdx={1}
            activeTooltipId={activeTooltipId}
            onSkillClick={handleSkillClick}
          />
          <SkillsMarqueeRow
            skills={mobileMarqueeRow2}
            direction="right"
            duration="20s"
            rowIdx={2}
            activeTooltipId={activeTooltipId}
            onSkillClick={handleSkillClick}
          />
          <SkillsMarqueeRow
            skills={mobileMarqueeRow3}
            direction="left"
            duration="18s"
            rowIdx={3}
            activeTooltipId={activeTooltipId}
            onSkillClick={handleSkillClick}
          />
        </div>
      </div>

      {/* ── Multi-speed Parallax Columns (DESKTOP ONLY: min-width: 1024px) ── */}
      <div ref={columnsGroupRef} className="skills-columns-group">
        {skillColumns.map((colGroup, colIdx) => (
          <div
            key={colIdx}
            className="skills-column"
            data-speed={colGroup.speed}
          >
            {colGroup.skills.map((skill, sIdx) => (
              <div key={sIdx} className="w-full flex justify-center">
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
