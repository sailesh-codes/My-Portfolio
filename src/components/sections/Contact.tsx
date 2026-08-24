import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, Camera, Sparkles, X, ShieldCheck, MousePointer2 } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { FloatingDock } from '../ui/floating-dock';
import { WebcamPixelGrid } from '../ui/webcam-pixel-grid';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const socialLinks = [
  {
    title: "Email",
    icon: <Mail className="h-full w-full text-neutral-400 dark:text-neutral-200 hover:text-purple-400 transition-colors" />,
    href: "mailto:saileshtrn06@gmail.com",
  },
  {
    title: "GitHub",
    icon: <Github className="h-full w-full text-neutral-400 dark:text-neutral-200 hover:text-purple-400 transition-colors" />,
    href: "https://github.com/sailesh-codes",
  },
  {
    title: "LinkedIn",
    icon: <Linkedin className="h-full w-full text-neutral-400 dark:text-neutral-200 hover:text-purple-400 transition-colors" />,
    href: "https://www.linkedin.com/in/sailesh-t-955780323/",
  },
  {
    title: "Blog",
    icon: <MessageSquare className="h-full w-full text-neutral-400 dark:text-neutral-200 hover:text-purple-400 transition-colors" />,
    href: "https://codelogics.hashnode.dev/",
  }
];

const Contact = () => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const gridProps = useMemo(() => {
    if (isMobile) {
      return {
        gridCols: 40,
        gridRows: 70,
        maxElevation: 60,
      };
    }
    return {
      gridCols: 60,
      gridRows: 40,
      maxElevation: 80,
    };
  }, [isMobile]);

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

  const toggleMode = () => {
    if (!showWebcam) {
      setShowPrivacyModal(true);
    } else {
      setShowWebcam(false);
    }
  };

  const enableWebcam = () => {
    setShowWebcam(true);
    setShowPrivacyModal(false);
    setTimeout(() => {
      setShowInstructionModal(true);
    }, 500);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`section-padding px-6 lg:px-24 relative overflow-hidden min-h-screen border-t border-white/10 ${showWebcam ? 'bg-black' : 'bg-transparent'}`}
    >
      <AnimatePresence>
        {showWebcam && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <WebcamPixelGrid
              {...gridProps}
              motionSensitivity={0.8}
              elevationSmoothing={0.1}
              colorMode="webcam"
              backgroundColor="#000000"
              mirror={true}
              gapRatio={0.05}
              invertColors={false}
              darken={0.4}
              borderColor="#ffffff"
              borderOpacity={0.06}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* SCFO Section 05 Header */}
        <div ref={headerRef} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="scfo-tag font-mono text-purple-400 font-bold">05</span>
            <span className="h-[1px] w-8 bg-purple-500/40" />
            <span className="scfo-tag">INITIATE CONTACT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-editorial text-white tracking-tight mb-6">
            Get In Touch
          </h2>

          {/* Mirror Universe Toggle */}
          <div className="flex mb-8">
            <button
              onClick={toggleMode}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-xs font-mono tracking-wider uppercase text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all duration-300 shadow-lg"
            >
              {showWebcam ? (
                <Sparkles className="w-4 h-4 text-purple-400" />
              ) : (
                <Camera className="w-4 h-4 text-purple-400 animate-pulse" />
              )}
              <span>{showWebcam ? 'Exit Mirror Universe' : 'Try the Mirror Universe'}</span>
            </button>
          </div>

          <p className="text-lg text-white/70 max-w-xl font-normal">
            Let's discuss your next project or just say hello. I'm always open to new opportunities.
          </p>
        </div>

        <div ref={formRef} className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-xl font-serif-editorial text-white mb-4">Connect Directly</h3>
            <div className="flex items-center justify-start w-full py-4">
              <FloatingDock mobileClassName="translate-y-0" desktopClassName="ml-0 mx-0" items={socialLinks} />
            </div>
          </div>

          <div>
            <form onSubmit={handleContactSubmit} className="space-y-5 scfo-card p-6 sm:p-8 rounded-2xl border border-white/10">
              <input type="hidden" name="_subject" value="New message from portfolio contact form" />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <label htmlFor="name" className="block text-xs font-mono tracking-wider uppercase text-white/60 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono tracking-wider uppercase text-white/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono tracking-wider uppercase text-white/60 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-widest uppercase h-12 rounded-lg transition-all duration-300 shadow-lg"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* SCFO Studio Footer */}
      <footer className="relative z-20 pt-16 pb-8 text-center mt-28 border-t border-white/10 w-full max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} SAILESH STUDIO. ALL RIGHTS RESERVED.</p>
          <p className="text-[0.65rem] opacity-70">(DISCLAIMER: ALL BUGS WERE HARMED DURING DEVELOPMENT)</p>
        </div>
      </footer>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacyModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-[#0a0a0f] border border-white/15 rounded-2xl p-8 shadow-2xl z-10"
            >
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 border border-purple-500/30">
                  <ShieldCheck className="w-7 h-7 text-purple-400" />
                </div>
                
                <h3 className="text-2xl font-serif-editorial text-white mb-3">Hello friend!</h3>
                <p className="text-white/70 mb-6 text-xs font-mono leading-relaxed">
                  To create this interactive experience, I'd like to use your camera. 
                  Your video is processed <strong>locally in your browser</strong> and is never recorded.
                </p>

                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={enableWebcam}
                    className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-neutral-200 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Let's See it
                  </button>
                  <button
                    onClick={() => setShowPrivacyModal(false)}
                    className="w-full bg-white/5 text-white/60 py-3.5 rounded-xl hover:bg-white/10 text-xs font-mono uppercase tracking-widest transition-all"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Instruction Modal */}
      <AnimatePresence>
        {showInstructionModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-[#0a0a0f]/95 backdrop-blur-2xl border border-purple-500/40 rounded-xl p-6 shadow-2xl pointer-events-auto flex flex-col items-center gap-3 text-center max-w-xs"
            >
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center animate-bounce">
                <MousePointer2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-base font-serif-editorial text-white">Grid Active!</h4>
                <p className="text-white/70 text-xs font-mono mt-1">
                  Move around and wave your hands to see the pixel play.
                </p>
              </div>
              <button
                onClick={() => setShowInstructionModal(false)}
                className="mt-1 text-xs text-purple-400 font-mono tracking-widest uppercase"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
