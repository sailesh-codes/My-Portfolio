import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  onExitFinished?: () => void;
  minDuration?: number; // in milliseconds
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  onExitFinished,
  minDuration = 1600,
}) => {
  const [isDone, setIsDone] = useState(false);

  // Lock scroll while loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__lenis?.stop();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.__lenis?.start();
        document.body.style.overflow = '';
      }
    };
  }, []);

  // Duration timer for seamless transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
      onLoadingComplete?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onLoadingComplete]);

  // When exit animation finishes
  const handleExitComplete = () => {
    if (typeof window !== 'undefined') {
      window.__lenis?.start();
      document.body.style.overflow = '';
    }
    onExitFinished?.();
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {!isDone && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.85,
              ease: 'easeOut',
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 bg-[#070709] text-white select-none pointer-events-auto overflow-hidden"
          style={{ willChange: 'opacity' }}
        >
          {/* Ambient luminous glow backdrops */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[650px] h-[350px] rounded-full pointer-events-none opacity-20 blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(59, 130, 246, 0.25) 45%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[40vw] h-[300px] rounded-full pointer-events-none opacity-10 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(2, 210, 227, 0.35) 0%, transparent 70%)',
            }}
          />

          {/* Centerpiece: Monumental Brand Title & Shimmer */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block"
            >
              <h1
                className="text-[clamp(2.75rem,10vw,8.5rem)] font-extrabold tracking-tight sm:tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 leading-none select-none"
                style={{
                  fontFamily: "'Krona One', 'Clash Display', 'Space Grotesk', sans-serif",
                }}
              >
                SAILESH
              </h1>

              {/* Subtle light sweep reflection */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none -skew-x-12 animate-shimmer"
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 sm:mt-5 text-xs sm:text-sm md:text-base tracking-[0.25em] text-neutral-400 uppercase font-medium"
            >
              Interactive Frontend & Full-Stack Developer
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
