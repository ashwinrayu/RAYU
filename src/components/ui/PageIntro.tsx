'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageIntro: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if already visited in this session
    const hasVisited = sessionStorage.getItem('rayu_intro_played');
    if (hasVisited) {
      setShowIntro(false);
      return;
    }

    setShowIntro(true);
    sessionStorage.setItem('rayu_intro_played', 'true');

    // Sequence timings
    const t1 = setTimeout(() => setStep(1), 300);   // Lime point
    const t2 = setTimeout(() => setStep(2), 600);   // Horizontal line
    const t3 = setTimeout(() => setStep(3), 1100);  // Particles & Wordmark reveal
    const t4 = setTimeout(() => setStep(4), 1700);  // Tagline
    const t5 = setTimeout(() => {
      setShowIntro(false);
    }, 2500); // Complete & unmount intro curtain

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        {/* Step 1: Center Lime Point */}
        {step >= 1 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: step >= 2 ? 1 : 1.5, opacity: 1 }}
            className="w-3 h-3 bg-[#CCFF00] rounded-full shadow-[0_0_20px_#CCFF00] mb-4"
          />
        )}

        {/* Step 2: Horizontal Streak Line */}
        {step >= 2 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 sm:w-96 h-[2px] bg-[#CCFF00] shadow-[0_0_15px_#CCFF00] origin-center mb-8"
          />
        )}

        {/* Step 3: Wordmark Staggered Masked Reveal */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-white uppercase mb-3 flex items-center gap-1"
          >
            {['R', 'A', 'Y', 'U', '.'].map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={char === 'Y' ? 'text-[#CCFF00]' : ''}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Step 4: Tagline */}
        {step >= 4 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase"
          >
            THINKING AS IT HAPPENS.
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
