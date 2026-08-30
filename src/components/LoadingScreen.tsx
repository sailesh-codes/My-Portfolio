import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ['Design', 'Create', 'Inspire'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter from 000 to 100 over 2700ms
  useEffect(() => {
    const duration = 2700;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * 100);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  // Rotating words cycling every 900ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-14 select-none overflow-hidden"
    >
      {/* Top-left: Portfolio Label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex items-center gap-3"
      >
        <span className="w-2 h-2 rounded-full accent-gradient inline-block" />
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
          Portfolio
        </span>
      </motion.div>

      {/* Center: Rotating Words */}
      <div className="flex items-center justify-center my-auto overflow-hidden h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={words[wordIndex]}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 tracking-wide text-center"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Row: Counter & Progress Bar */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-end justify-between">
          <span className="text-xs text-muted/60 tracking-wider uppercase font-mono">
            Loading System
          </span>
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none tracking-tight">
            {String(count).padStart(3, '0')}
          </span>
        </div>

        {/* Bottom progress bar */}
        <div className="h-[3px] bg-stroke/50 w-full overflow-hidden rounded-full">
          <div
            className="h-full accent-gradient transition-transform duration-75 ease-linear rounded-full"
            style={{
              transform: `scaleX(${count / 100})`,
              transformOrigin: 'left',
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
