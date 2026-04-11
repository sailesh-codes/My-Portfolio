import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, Camera, Sparkles, X, ShieldCheck, MousePointer2 } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { FloatingDock } from '../ui/floating-dock';
import { WebcamPixelGrid } from '../ui/webcam-pixel-grid';

const socialLinks = [
  {
    title: "Email",
    icon: <Mail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "mailto:saileshtrn06@gmail.com",
  },
  {
    title: "GitHub",
    icon: <Github className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "https://github.com/sailesh-codes",
  },
  {
    title: "LinkedIn",
    icon: <Linkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "https://www.linkedin.com/in/sailesh-t-955780323/",
  },
  {
    title: "Blog",
    icon: <MessageSquare className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "https://codelogics.hashnode.dev/",
  }
];

const Contact = () => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
    // Show instruction modal with a slight delay so they see the grid first
    setTimeout(() => {
      setShowInstructionModal(true);
    }, 500);
  };

  return (
    <section 
      id="contact" 
      className={`section-padding md:px-6 relative overflow-hidden min-h-screen flex flex-col items-center pt-32 pb-32 md:pb-12 transition-colors duration-700 ${showWebcam ? 'bg-black' : 'bg-transparent'}`}
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
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto w-[85%] md:w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Get In Touch</h2>
          
          {/* Mode Toggle Button - Glassmorphic Purple */}
          <div className="flex justify-center mb-12">
            <motion.button
              onClick={toggleMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={showWebcam ? {} : {
                y: [0, -8, 0],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className={`flex items-center gap-3 px-6 py-4 rounded-full font-bold text-lg backdrop-blur-md border-2 transition-all duration-500 ${
                showWebcam 
                  ? 'bg-purple-600/10 border-purple-500 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]' 
                  : 'bg-white/5 border-white/20 text-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:bg-white/10 hover:border-purple-500/50'
              }`}
            >
              <div className={`p-2 rounded-full ${showWebcam ? 'bg-purple-500/20' : 'bg-purple-500/10 ring-4 ring-purple-500/5'}`}>
                {showWebcam ? (
                  <Sparkles className="w-5 h-5 text-purple-400" />
                ) : (
                  <Camera className="w-5 h-5 text-purple-400 animate-pulse" />
                )}
              </div>
              <span className={`tracking-tight text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] ${!showWebcam ? 'animate-pulse' : ''}`}>
                {showWebcam ? 'Return to Galaxy' : 'Try the Mirror Universe'}
              </span>
            </motion.button>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your next project or just say hello. I'm always open to new opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
            <div className="flex items-center justify-start w-full py-8">
              <FloatingDock mobileClassName="translate-y-0" desktopClassName="ml-0 mx-0" items={socialLinks} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <input type="hidden" name="_subject" value="New message from portfolio contact form" />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  name="message"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none backdrop-blur-sm"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] text-white font-semibold h-12 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      <footer className="relative z-20 py-12 px-6 text-center mt-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Sailesh. All rights reserved.<br/>
            <span className="text-xs opacity-70">(Disclaimer: All bugs were harmed during development)</span>
          </p>
        </div>
      </footer>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 pt-20 sm:pt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacyModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -60 }}
              exit={{ opacity: 0, scale: 0.9, y: 0 }}
              className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-purple-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Hello friend!</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  To create this interactive experience, I'd like to use your camera. 
                  Don't worry—your video is processed <strong>locally in your browser</strong> and is never recorded. 
                  It's just for the visual effect!
                </p>

                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={enableWebcam}
                    className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Let's See it
                  </button>
                  <button
                    onClick={() => setShowPrivacyModal(false)}
                    className="w-full bg-white/5 text-white/70 py-4 rounded-2xl hover:bg-white/10 transition-all"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Instruction Modal (Second Modal) */}
      <AnimatePresence>
        {showInstructionModal && (
          <div className="fixed inset-0 z-[110] flex items-start sm:items-center justify-center p-4 pt-20 sm:pt-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: isMobile ? -20 : -100 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl pointer-events-auto flex flex-col items-center gap-4 text-center max-w-xs"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center animate-bounce">
                <MousePointer2 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Grid Active!</h4>
                <p className="text-white/70 text-sm mt-1">
                  Move around and wave your hands to see the pixel play in the background.
                </p>
              </div>
              <button
                onClick={() => setShowInstructionModal(false)}
                className="mt-2 text-xs text-purple-400 hover:text-purple-300 font-bold tracking-widest uppercase"
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
