"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const headingMagneticRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [headingMagneticOffset, setHeadingMagneticOffset] = useState({ x: 0, y: 0 });
  const [isHeadingHovered, setIsHeadingHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Section-wide mouse parallax tracker (active when Projects section is in view)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Track when section is in or near viewport
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

  // Magnetic attraction when hovering near/over the "Projects" heading
  const handleHeadingMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      ease: "power2.out",
      overwrite: "auto",
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
      ease: "elastic.out(1.1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <div
      className="w-full font-sans pb-10"
      ref={containerRef}
    >
      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 text-center mb-16 pt-20 relative"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 14, mass: 1 }}
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Ambient Glow Backdrop Layer matching Hero & About */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 w-[60vw] max-w-[650px] h-[260px] rounded-full pointer-events-none opacity-25 blur-[90px]"
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
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and passion for development.
        </p>
      </motion.div>

      <div ref={ref} className="relative max-w-7xl mx-auto mb-20">
        {data.map((item, index) => {
          // even indexes (0, 2...) have content on right, title on left
          const isRight = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -50% 0px" }}
              className={`relative flex flex-col justify-start pt-10 md:pt-40 md:gap-0 ${
                isRight ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Center Dot Column */}
              <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 h-full w-10 z-20 pointer-events-none">
                 <div className="sticky top-[10.5rem] md:top-40 h-10 w-10 rounded-full bg-black flex items-center justify-center border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                   <motion.div 
                     variants={{
                       hidden: { scale: 0, opacity: 0 },
                       visible: { scale: 1, opacity: 1 }
                     }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                     className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]" 
                   />
                 </div>
              </div>

              {/* Title Container */}
              <div
                className={`sticky flex flex-col md:flex-row z-30 items-center top-40 self-start md:w-1/2 w-full ${
                  isRight ? "md:justify-end md:text-right" : "md:justify-start md:text-left"
                }`}
              >
                <h3
                  className={`hidden md:block text-xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent ${
                    isRight ? "md:pr-12 lg:pr-20" : "md:pl-12 lg:pl-20"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              {/* Content Box */}
              <div
                className={`relative w-full md:w-1/2 pl-20 pr-4 ${
                  isRight ? "md:pl-12 lg:pl-20 md:pr-0 md:pr-4" : "md:pr-12 lg:pr-20 md:pl-0 md:pl-4"
                }`}
              >
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                {item.content}{" "}
              </div>
            </motion.div>
          );
        })}
        <div
          className="absolute md:left-1/2 md:-translate-x-1/2 left-8 top-0 bottom-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
