'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorLabelElement = target.closest('[data-cursor-label]') as HTMLElement | null;
      const label = cursorLabelElement ? cursorLabelElement.getAttribute('data-cursor-label') : null;

      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, [role="button"], .interactive')
      );
      const isCta = Boolean(
        target.closest('.cta-element, .bg-neon, button[type="submit"]')
      );

      setCursorLabel(label);
      setIsHovered(isInteractive || Boolean(label));
      setIsCtaHovered(isCta || label === 'GO');
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Central tracking dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#CCFF00] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Context-aware outer ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center font-mono font-bold text-[10px] tracking-widest uppercase transition-colors duration-200 border ${
          isCtaHovered
            ? 'border-[#CCFF00] bg-[#CCFF00]/15 text-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.35)]'
            : cursorLabel
            ? 'border-[#CCFF00] bg-[#050505]/80 text-[#CCFF00] backdrop-blur-sm'
            : isHovered
            ? 'border-[#CCFF00]/70 bg-[#CCFF00]/5 text-white'
            : 'border-white/20 bg-transparent text-transparent'
        }`}
        animate={{
          x: mousePosition.x - (cursorLabel ? 28 : isHovered ? 22 : 12),
          y: mousePosition.y - (cursorLabel ? 28 : isHovered ? 22 : 12),
          width: cursorLabel ? 56 : isHovered ? 44 : 24,
          height: cursorLabel ? 56 : isHovered ? 44 : 24,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.15 }}
      >
        <AnimatePresence mode="wait">
          {cursorLabel && (
            <motion.span
              key={cursorLabel}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
