import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalText.css';

gsap.registerPlugin(ScrollTrigger);

const quoteText = "GREAT WEBSITES DO MORE THAN FUNCTION — THEY CREATE AN EXPERIENCE!";

const HorizontalText = () => {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    // ── DESKTOP (min-width: 1024px): 100% UNTOUCHED HORIZONTAL SCROLL SCRAMBLE ──
    mm.add('(min-width: 1024px)', () => {
      const wrapper = wrapperRef.current;
      const text = textRef.current;
      if (!wrapper || !text) return;

      // 1. Horizontal scroll tween pinned to wrapper
      const scrollTween = gsap.to(text, {
        xPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          start: 'top top',
          end: '+=4200px',
          scrub: 1,
        },
      });

      // 2. Individual character scramble-to-settle animation driven by scrollTween
      const chars = gsap.utils.toArray('.char-split');
      chars.forEach((char) => {
        gsap.from(char, {
          yPercent: 'random(-200, 200)',
          rotation: 'random(-20, 20)',
          opacity: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: 'left 100%',
            end: 'left 30%',
            scrub: 1,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    // ── MOBILE & TABLET (max-width: 1023px): No scroll pinning, all text visible ──
    mm.add('(max-width: 1023px)', () => {
      const chars = gsap.utils.toArray('.char-split');
      gsap.set(chars, { clearProps: 'all', opacity: 1, yPercent: 0, rotation: 0 });
    });

    return () => mm.revert();
  }, []);

  const words = quoteText.split(' ');

  return (
    <section ref={wrapperRef} className="Horizontal" aria-label="Statement Quote">
      <div className="Horizontal__glow" />
      <div className="Horizontal__container">
        {isMobileOrTablet ? (
          /* Mobile & Tablet: Fluid continuous kinetic marquee - zero scroll trapping */
          <div className="Horizontal__mobile-track">
            <h3 className="Horizontal__text-mobile heading-xl">
              <span className="px-4">{quoteText}</span>
              <span className="text-purple-400 mx-3">•</span>
              <span className="px-4">{quoteText}</span>
              <span className="text-purple-400 mx-3">•</span>
            </h3>
          </div>
        ) : (
          /* Desktop: 100% UNTOUCHED Pinned Kinetic Scramble Scroll */
          <h3 ref={textRef} className="Horizontal__text heading-xl">
            {words.map((word, wIdx) => (
              <span
                key={wIdx}
                className="inline-block whitespace-nowrap"
              >
                {word.split('').map((char, cIdx) => (
                  <span key={cIdx} className="char-split">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h3>
        )}
      </div>
    </section>
  );
};

export default HorizontalText;
