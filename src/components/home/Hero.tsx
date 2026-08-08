'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ParticleField } from '@/components/ui/ParticleField';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const titleScale = useTransform(scrollY, [0, 500], [1, 0.94]);
  const titleOpacity = useTransform(scrollY, [0, 400], [1, 0.7]);

  const letterVariants = {
    hidden: { opacity: 0, y: 35, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        delay: 0.2 + i * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between pt-28 pb-8 overflow-hidden">
      {/* Particle Light Field Background */}
      <ParticleField />

      {/* Hero Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 my-auto">
        <div className="max-w-3xl">
          {/* Dominant RAYU. Title with Staggered Character Reveal */}
          <motion.div style={{ scale: titleScale, opacity: titleOpacity }} className="origin-left">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11.5rem] font-extrabold tracking-tighter leading-none mb-6 select-none flex items-center">
              {['R', 'A', 'Y', 'U', '.'].map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className={char === 'Y' ? 'text-[#CCFF00]' : ''}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Subheading / Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h2 className="text-sm sm:text-base md:text-lg font-mono tracking-wider text-neutral-200 uppercase font-semibold">
              RAW AWARENESS. STRAIGHT TO YOU. <span className="text-[#CCFF00]">UNFILTERED.</span>
            </h2>
          </motion.div>

          {/* Core Brand Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed mb-10 max-w-xl"
          >
            Tech. World. Life.<br />
            Whatever&apos;s actually on my mind —<br />
            posted{' '}
            <span className="relative inline-block font-semibold text-white">
              as it happens,
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CCFF00] rounded-full shadow-[0_0_8px_#CCFF00] origin-left"
              />
            </span>
            <br />
            not after it&apos;s been cleaned up.
          </motion.p>

          {/* CTA Buttons with Light Sweep & Custom Cursor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="#latest-thoughts"
              data-cursor-label="GO"
              className="cta-element btn-sweep group inline-flex items-center gap-3 bg-[#CCFF00] text-[#050505] text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-4 rounded-sm hover:bg-[#b5e600] transition-colors duration-200 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            >
              <span>LATEST THOUGHTS</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              data-cursor-label="GO"
              className="group inline-flex items-center gap-3 bg-black/40 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-4 rounded-sm hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors duration-200 backdrop-blur-sm"
            >
              <span>ABOUT RAYU</span>
              <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero Micro Details Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 pt-12">
        <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-neutral-400">
          {/* Left: 01 */}
          <div className="font-bold text-white tracking-widest text-sm">01</div>

          {/* Center: SCROLL TO EXPLORE */}
          <div className="flex items-center gap-3 tracking-widest">
            <span className="uppercase text-neutral-400 font-semibold">SCROLL TO EXPLORE</span>
            <div className="w-12 h-[1px] bg-neutral-700 relative overflow-hidden">
              <motion.div
                animate={{ x: [-48, 48] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-12 h-full bg-[#CCFF00]"
              />
            </div>
          </div>

          {/* Right: Tagline metadata & Dots */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="text-right leading-tight uppercase font-semibold text-[10px] text-neutral-400">
              THINKING<br />AS IT<br />HAPPENS
            </div>
            <div className="flex space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] shadow-[0_0_6px_#CCFF00]" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
