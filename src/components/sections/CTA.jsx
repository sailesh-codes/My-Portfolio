import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileScrollReveal from '../ui/MobileScrollReveal';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

const parallaxImages = [
  {
    speed: 2.4,
    src: 'https://images.unsplash.com/photo-1530569673472-307dc017a82d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM2NTUwMDA&ixlib=rb-4.0.3&q=80&w=400',
    alt: 'Modern Architecture Structure',
  },
  {
    speed: 1.8,
    src: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM2NTQ5Njk&ixlib=rb-4.0.3&q=80&w=400',
    alt: 'Misty Atmospheric Nature',
  },
  {
    speed: 2.2,
    src: 'https://images.unsplash.com/photo-1551376347-075b0121a65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM2NTQ5MTE&ixlib=rb-4.0.3&q=80&w=400',
    alt: 'Geometric Architecture Details',
  },
  {
    speed: 1.5,
    src: 'https://images.unsplash.com/photo-1500817487388-039e623edc21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM2NTQ5MTE&ixlib=rb-4.0.3&q=80&w=400',
    alt: 'Moody Natural Landscape',
  },
];


const CTA = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const drawPathRef = useRef(null);
  const headingRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP ONLY (min-width: 1024px) ──
      // EXACT EXISTING DESKTOP BEHAVIOR - 100% UNCHANGED
      mm.add('(min-width: 1024px)', () => {
        // 1. Animated SVG stroke drawing with ScrollTrigger scrub
        const path = drawPathRef.current;
        if (path) {
          const length = path.getTotalLength ? path.getTotalLength() : 2400;
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'clamp(top top)',
              end: 'clamp(top -25%)',
              scrub: 0.8,
            },
          });
        }

        if (!prefersReducedMotion) {
          // 2. Pin the unified stage container while the background parallax scrolls
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: pinRef.current,
            pinSpacing: false,
          });

          // 3. Images emerge from below the text, glide through, and exit top before the text
          imagesRef.current.forEach((imgEl, index) => {
            if (!imgEl) return;
            const speed = parallaxImages[index]?.speed || 1.8;

            gsap.fromTo(
              imgEl,
              {
                y: () => window.innerHeight * (0.5 + (2.5 - speed) * 0.08),
              },
              {
                y: () => -window.innerHeight * (1.12 + speed * 0.14),
                ease: 'none',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'clamp(top top)',
                  end: 'clamp(bottom bottom)',
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              }
            );
          });
        }
      });

      // ── MOBILE & TABLET (max-width: 1023px) ──
      // Normal fluid site, no scroll triggers, text 100% visible, accent loop drawn
      mm.add('(max-width: 1023px)', () => {
        const path = drawPathRef.current;
        if (path) {
          const length = path.getTotalLength ? path.getTotalLength() : 2400;
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: 0, // Accent loop is fully visible
          });
        }

        if (pinRef.current) {
          gsap.set(pinRef.current, { clearProps: 'all' });
        }
        imagesRef.current.forEach((imgEl) => {
          if (imgEl) {
            gsap.set(imgEl, { clearProps: 'all' });
          }
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="cta-section">
      {/* ── Unified Pinned Stage (Holds background images, difference-blended text, and button) ── */}
      <div ref={pinRef} className="cta-pin-stage">
        {/* ── Multi-speed Parallax Background Images Track ── */}
        <div className="cta-images-track" aria-hidden="true">
          {parallaxImages.map((item, index) => (
            <div
              key={index}
              ref={(el) => (imagesRef.current[index] = el)}
              className="cta-image-wrapper"
              data-speed={`clamp(${item.speed})`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="cta-image-item"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* ── See-Through Heading Overlay with Difference Blend Mode & Mobile Scroll Reveal ── */}
        <MobileScrollReveal mobileOnly={true} yOffset={45} scaleFrom={0.94} className="w-full flex justify-center">
          <div ref={headingRef} className="cta-heading-overlay">
            <h2 className="cta-display-heading">
              <span className="cta-heading-top">WANT TO BUILD A SITE WITH</span>
              <span className="cta-clamp">
                WOW FACTOR?
                <svg
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 842.14 500"
                  preserveAspectRatio="none"
                  className="cta-clamp-svg"
                  aria-hidden="true"
                >
                  <path
                    ref={drawPathRef}
                    className="cta-draw"
                    d="M336.2,130.05C261.69,118,16.52,122,20.65,244.29c4.17,123,484.3,299.8,734.57,108.37,244-186.65-337.91-311-546.54-268.47"
                  />
                </svg>
              </span>
            </h2>
          </div>
        </MobileScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
