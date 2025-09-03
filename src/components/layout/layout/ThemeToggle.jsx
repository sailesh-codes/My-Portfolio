import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Button } from '../../ui/button';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 right-6 z-50"
    >
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="bg-background/80 backdrop-blur-sm border-2 hover:scale-110 transition-all duration-300 w-10 h-10 flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={darkMode ? 'moon' : 'sun'}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;