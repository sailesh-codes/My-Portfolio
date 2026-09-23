import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileScrollReveal from '../ui/MobileScrollReveal';
import './ScrollShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const gridImages = [
  // Column 1 (3 images)
  [
    '/images/1.jpg',
    '/images/10.jpg',
    '/images/3.jpg',
  ],
  // Column 2 (3 images)
  [
    '/images/15.jpg',
    '/images/2.jpg',
    '/images/6.jpg',
  ],
  // Column 3 (3 images)
  [
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
  ],
];

const parallaxImage = '/images/12.jpg';

const pinImagesRow1 = [
  '/images/14.jpg',
  '/images/5.jpg',
];

const pinImagesRow2 = [
  '/images/4.jpg',
  '/images/11.jpg',
];

// 4 Curated Showcase Images exclusively for mobile view
const mobileShowcaseImages = [
  {
    src: '/images/1.jpg',
    alt: 'High-Performance Visual Experience',
  },
  {
    src: '/images/15.jpg',
    alt: 'Spatial 3D Digital Storytelling',
  },
  {
    src: '/images/12.jpg',
    alt: 'Cinematic Widescreen Architecture',
  },
  {
    src: '/images/14.jpg',
    alt: 'Interactive High-Speed Motion',
  },
];

const ScrollShowcase = () => {
  const containerRef = useRef(null);
  const gridSectionRef = useRef(null);
  const gridLayoutRef = useRef(null);
  const parallaxSectionRef = useRef(null);
  const pinSectionRef = useRef(null);
  const pinContent1Ref = useRef(null);
  const pinContent2Ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP ONLY (min-width: 1024px) ──
      // EXACT EXISTING DESKTOP BEHAVIOR - 100% UNCHANGED
      mm.add('(min-width: 1024px)', () => {
        // 1. Grid Zoom & Multi-corner Fly-in Timeline
        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: gridSectionRef.current,
            scrub: 1,
            start: 'top center',
            end: 'bottom+=10% bottom',
          },
          defaults: {
            ease: 'power1.inOut',
          },
        });

        gridTl
          .add('start')
          .from(
            gridLayoutRef.current,
            {
              ease: 'power1',
              scale: 3,
            },
            'start'
          )
          .from(
            '.showcase-column-1 .showcase-grid-image',
            {
              duration: 0.6,
              xPercent: (i) => -((i + 1) * 40 + i * 100),
              yPercent: (i) => (i + 1) * 40 + i * 100,
            },
            'start'
          )
          .from(
            '.showcase-column-3 .showcase-grid-image',
            {
              duration: 0.6,
              xPercent: (i) => (i + 1) * 40 + i * 100,
              yPercent: (i) => (i + 1) * 40 + i * 100,
            },
            'start'
          );

        // 2. Parallax Section Fade and Rise
        gsap.from(parallaxSectionRef.current, {
          y: 40,
          opacity: 0.85,
          scrollTrigger: {
            trigger: parallaxSectionRef.current,
            scrub: 1,
            start: 'top bottom',
            end: 'center center',
          },
        });

        // 3. Pinned Dual-Row Opposing Horizontal Gallery
        const pinContent1 = pinContent1Ref.current;
        const pinContent2 = pinContent2Ref.current;

        if (pinContent1 && pinContent2) {
          const pinTl = gsap.timeline({
            scrollTrigger: {
              pin: true,
              trigger: pinSectionRef.current,
              scrub: 1,
              start: 'top top',
              end: () => `+=${pinContent1.offsetWidth || window.innerWidth * 2}`,
              invalidateOnRefresh: true,
            },
          });

          pinTl
            .fromTo(
              pinContent1,
              {
                x: () => document.body.clientWidth * 0.9,
              },
              {
                x: () => -(pinContent1.offsetWidth || window.innerWidth * 2),
                ease: 'none',
              },
              0
            )
            .fromTo(
              pinContent2,
              {
                x: () => -(pinContent2.offsetWidth || window.innerWidth * 2) + document.body.clientWidth * 0.1,
              },
              {
                x: () => document.body.clientWidth,
                ease: 'none',
              },
              0
            );
        }
      });

      // ── MOBILE & TABLET (max-width: 1023px) ──
      // Desktop ScrollTriggers skipped on mobile
      mm.add('(max-width: 1023px)', () => {
        if (gridLayoutRef.current) {
          gsap.set(gridLayoutRef.current, { clearProps: 'transform' });
        }
        gsap.set('.showcase-grid-image', { clearProps: 'all' });
        if (parallaxSectionRef.current) {
          gsap.set(parallaxSectionRef.current, { clearProps: 'all' });
        }
        if (pinContent1Ref.current) {
          gsap.set(pinContent1Ref.current, { clearProps: 'all' });
        }
        if (pinContent2Ref.current) {
          gsap.set(pinContent2Ref.current, { clearProps: 'all' });
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="scroll-showcase-container" id="visual-showcase">
      {/* ── MOBILE VIEW ONLY: Keep only 4 curated images with scroll-to-reveal animation (all other images removed) ── */}
      <div className="showcase-mobile-container">
        {mobileShowcaseImages.map((item, idx) => (
          <MobileScrollReveal
            key={idx}
            mobileOnly={true}
            yOffset={28}
            scaleFrom={0.96}
            duration={0.45}
            className="showcase-mobile-reveal-item"
          >
            <div className="showcase-mobile-image-card">
              <img
                src={item.src}
                alt={item.alt}
                className="showcase-mobile-image"
                loading="lazy"
                draggable={false}
              />
            </div>
          </MobileScrollReveal>
        ))}
      </div>

      {/* ── DESKTOP VIEW ONLY (min-width: 1024px): 100% UNTOUCHED 3-Part Interactive Showcase ── */}
      <div className="showcase-desktop-container">
        {/* ── Section 1: Zooming Fly-in 3-Column Grid ── */}
        <div ref={gridSectionRef} className="showcase-grid-section">
          <div ref={gridLayoutRef} className="showcase-grid-layout">
            {gridImages.map((columnImages, colIdx) => (
              <div
                key={colIdx}
                className={`showcase-column showcase-column-${colIdx + 1}`}
                data-speed={colIdx === 1 ? '1.01' : '1.1'}
              >
                <div className="showcase-column-content">
                  {columnImages.map((imgSrc, imgIdx) => (
                    <div key={imgIdx} className="showcase-grid-image">
                      <img
                        src={imgSrc}
                        alt={`Visual showcase ${colIdx * 3 + imgIdx + 1}`}
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="showcase-spacer" />

        {/* ── Section 2: Scale-Up Cinematic Parallax Panel ── */}
        <section ref={parallaxSectionRef} className="showcase-parallax-section">
          <img
            className="showcase-parallax-image"
            src={parallaxImage}
            alt="Cinematic Parallax Showcase"
            loading="lazy"
            data-speed="auto"
            draggable={false}
          />
        </section>

        <div className="showcase-spacer" />

        {/* ── Section 3: Pinned Opposing Horizontal Dual-Track Gallery ── */}
        <div ref={pinSectionRef} className="showcase-pin-section">
          <div ref={pinContent1Ref} className="showcase-pin-content showcase-pin-content-1">
            {pinImagesRow1.map((src, i) => (
              <div key={i} className="showcase-pin-box">
                <img
                  className="showcase-pin-image"
                  src={src}
                  alt={`Horizontal gallery item 1-${i + 1}`}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div ref={pinContent2Ref} className="showcase-pin-content showcase-pin-content-2">
            {pinImagesRow2.map((src, i) => (
              <div key={i} className="showcase-pin-box">
                <img
                  className="showcase-pin-image"
                  src={src}
                  alt={`Horizontal gallery item 2-${i + 1}`}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="showcase-spacer showcase-spacer-end" />
      </div>
    </section>
  );
};

export default ScrollShowcase;
