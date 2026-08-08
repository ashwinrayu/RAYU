'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen">
        {/* Black Curtain Flash with RAYU watermark */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] bg-[#050505] pointer-events-none flex items-center justify-center"
        >
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-4xl font-extrabold tracking-tighter text-white uppercase font-mono"
          >
            RA<span className="text-[#CCFF00]">Y</span>U.
          </motion.span>
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
};
