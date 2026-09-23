import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Globe, Linkedin, Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { FloatingDock } from '../ui/floating-dock';

const socialLinks = [
  {
    title: "Email",
    icon: <Mail className="h-full w-full text-white/90" />,
    href: "mailto:saileshtrn06@gmail.com",
  },
  {
    title: "CodeCraft",
    icon: <Globe className="h-full w-full text-white/90" />,
    href: "https://www.codecraftnet.com/",
  },
  {
    title: "GitHub",
    icon: <Github className="h-full w-full text-white/90" />,
    href: "https://github.com/sailesh-codes",
  },
  {
    title: "LinkedIn",
    icon: <Linkedin className="h-full w-full text-white/90" />,
    href: "https://www.linkedin.com/in/sailesh-t-955780323/",
  },
  {
    title: "Blog",
    icon: <MessageSquare className="h-full w-full text-white/90" />,
    href: "https://codelogics.hashnode.dev/",
  }
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingMagneticRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen width for desktop-only lateral reveal (md breakpoint = 768px)
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // ── Header Scroll Reveal Trajectory ──
  const { scrollYProgress: headerScrollProgress } = useScroll({
    target: headerRef,
    offset: ['start end', 'center 60%'],
  });

  const headerY = useTransform(headerScrollProgress, [0, 0.75], [55, 0]);
  const headerScale = useTransform(headerScrollProgress, [0, 0.75], [0.92, 1.0]);
  const headerOpacity = useTransform(headerScrollProgress, [0, 0.35, 0.75], [0.15, 0.85, 1.0]);
  const headerRotateX = useTransform(headerScrollProgress, [0, 0.75], [8, 0]);

  // Subtitle description stagger
  const subY = useTransform(headerScrollProgress, [0.12, 0.85], [30, 0]);
  const subOpacity = useTransform(headerScrollProgress, [0.12, 0.45, 0.85], [0.2, 0.85, 1.0]);

  // ── Grid Scroll Reveal Trajectory ──
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'center 55%'],
  });

  // 1. Left Column ("Let's Connect") Reveal Transforms
  const connectY = useTransform(scrollYProgress, [0, 0.72], [65, 0]);
  const connectX = useTransform(scrollYProgress, [0, 0.72], [-28, 0]);
  const connectScale = useTransform(scrollYProgress, [0, 0.72], [0.94, 1.0]);
  const connectOpacity = useTransform(scrollYProgress, [0, 0.3, 0.72], [0.15, 0.85, 1.0]);

  // Socials FloatingDock stagger
  const dockY = useTransform(scrollYProgress, [0.1, 0.78], [30, 0]);
  const dockOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.78], [0.2, 0.85, 1.0]);

  // 2. Right Column ("Input fields" side) Reveal Transforms
  const formY = useTransform(scrollYProgress, [0, 0.72], [65, 0]);
  const formX = useTransform(scrollYProgress, [0, 0.72], [28, 0]);
  const formScale = useTransform(scrollYProgress, [0, 0.72], [0.94, 1.0]);
  const formOpacity = useTransform(scrollYProgress, [0, 0.3, 0.72], [0.15, 0.85, 1.0]);

  // 3. Staggered reveal for individual input fields
  const field1Y = useTransform(scrollYProgress, [0.05, 0.65], [25, 0]);
  const field1Opacity = useTransform(scrollYProgress, [0.05, 0.35, 0.65], [0.2, 0.85, 1.0]);

  const field2Y = useTransform(scrollYProgress, [0.10, 0.70], [30, 0]);
  const field2Opacity = useTransform(scrollYProgress, [0.10, 0.40, 0.70], [0.2, 0.85, 1.0]);

  const field3Y = useTransform(scrollYProgress, [0.15, 0.75], [35, 0]);
  const field3Opacity = useTransform(scrollYProgress, [0.15, 0.45, 0.75], [0.2, 0.85, 1.0]);

  const btnY = useTransform(scrollYProgress, [0.20, 0.80], [40, 0]);
  const btnScale = useTransform(scrollYProgress, [0.20, 0.80], [0.94, 1.0]);
  const btnOpacity = useTransform(scrollYProgress, [0.20, 0.50, 0.80], [0.2, 0.85, 1.0]);

  // Magnetic attraction when hovering near/over the "Get In Touch" heading
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

  useEffect(() => {
    return () => {
      if (headingMagneticRef.current) {
        gsap.killTweensOf(headingMagneticRef.current);
      }
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/saileshtrn06@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      toast({
        title: 'Message sent successfully',
        description: "Thanks! I'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: 'Failed to send message',
        description: 'Please try again or email me directly.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative overflow-hidden flex flex-col items-center justify-center pt-16 pb-24 md:pt-20 md:pb-16 px-4 sm:px-6 md:px-8 w-full bg-transparent"
      style={{
        paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
        paddingBottom: 'max(5.5rem, calc(4rem + env(safe-area-inset-bottom, 0px)))',
      }}
    >
      <div className="max-w-5xl lg:max-w-6xl mx-auto w-full relative z-10">
        {/* ── Section Header with Smooth Scroll Reveal & Magnetic Cursor Effect ── */}
        <div ref={headerRef} className="contact-header-wrapper relative select-none">
          <motion.div
            style={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    y: headerY,
                    scale: headerScale,
                    opacity: headerOpacity,
                    rotateX: headerRotateX,
                    transformPerspective: 1000,
                    transformOrigin: 'bottom center',
                  }
            }
            className="inline-block relative mb-4 z-10 will-change-transform"
          >
            <div
              ref={headingMagneticRef}
              onMouseMove={handleHeadingMouseMove}
              onMouseLeave={handleHeadingMouseLeave}
              className="cursor-default select-none py-1 px-4 inline-block"
              style={{
                willChange: 'transform',
              }}
            >
              <h2 className="contact-display-word">
                Get In Touch
              </h2>
            </div>
          </motion.div>

          <motion.p
            style={prefersReducedMotion ? {} : { y: subY, opacity: subOpacity }}
            className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto font-normal z-10 leading-relaxed text-center px-2"
          >
            Let's discuss your next project or just say hello. I'm always open to new opportunities.
          </motion.p>
        </div>

        {/* ── Contact Columns Grid with Smooth Scroll Reveal ── */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-14 items-start w-full">
          {/* Left Column: Let's Connect */}
          <motion.div
            style={
              prefersReducedMotion || !isDesktop
                ? {
                    y: connectY,
                    scale: connectScale,
                    opacity: connectOpacity,
                  }
                : {
                    y: connectY,
                    x: connectX,
                    scale: connectScale,
                    opacity: connectOpacity,
                  }
            }
            className="flex flex-col items-center md:items-start text-center md:text-left will-change-transform w-full"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-2.5 tracking-tight text-center md:text-left">Let's Connect</h3>
            <p className="text-sm sm:text-base text-neutral-400 mb-5 font-normal leading-relaxed text-center md:text-left max-w-md mx-auto md:mx-0">
              Reach out directly via email, check my repositories, or connect across socials.
            </p>
            <motion.div
              style={prefersReducedMotion ? {} : { y: dockY, opacity: dockOpacity }}
              className="flex items-center justify-center md:justify-start w-full py-2"
            >
              <FloatingDock mobileClassName="translate-y-0 justify-center" desktopClassName="!ml-0 !mr-auto !mx-0 mt-1 h-[5.25rem] gap-5 px-4 pb-2.5" items={socialLinks} />
            </motion.div>
          </motion.div>

          {/* Right Column: Input fields side */}
          <motion.div
            style={
              prefersReducedMotion || !isDesktop
                ? {
                    y: formY,
                    scale: formScale,
                    opacity: formOpacity,
                  }
                : {
                    y: formY,
                    x: formX,
                    scale: formScale,
                    opacity: formOpacity,
                  }
            }
            className="will-change-transform w-full max-w-lg mx-auto md:max-w-none md:mx-0"
          >
            <form onSubmit={handleContactSubmit} className="space-y-4 w-full">
              <input type="hidden" name="_subject" value="New message from portfolio contact form" />
              <input type="hidden" name="_captcha" value="false" />

              {/* Name Input */}
              <motion.div
                style={prefersReducedMotion ? {} : { y: field1Y, opacity: field1Opacity }}
                className="space-y-1.5"
              >
                <label htmlFor="name" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl text-white placeholder:text-white/30 text-base font-normal tracking-wide transition-all duration-200 ease-out backdrop-blur-md focus:outline-none focus:border-white/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  placeholder="Your name"
                  required
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                style={prefersReducedMotion ? {} : { y: field2Y, opacity: field2Opacity }}
                className="space-y-1.5"
              >
                <label htmlFor="email" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl text-white placeholder:text-white/30 text-base font-normal tracking-wide transition-all duration-200 ease-out backdrop-blur-md focus:outline-none focus:border-white/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  placeholder="your.email@example.com"
                  required
                />
              </motion.div>

              {/* Message Input */}
              <motion.div
                style={prefersReducedMotion ? {} : { y: field3Y, opacity: field3Opacity }}
                className="space-y-1.5"
              >
                <label htmlFor="message" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  className="w-full px-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl text-white placeholder:text-white/30 text-base font-normal tracking-wide leading-relaxed transition-all duration-200 ease-out resize-none backdrop-blur-md focus:outline-none focus:border-white/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </motion.div>

              {/* Send Button */}
              <motion.div
                style={prefersReducedMotion ? {} : { y: btnY, scale: btnScale, opacity: btnOpacity }}
              >
                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="apple-glass-btn apple-glass-submit-btn group w-full h-12 rounded-xl text-sm sm:text-base font-semibold tracking-wide cursor-pointer flex items-center justify-center gap-2.5 transition-all"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 text-white/90 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
