'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, User, Filter } from 'lucide-react';

export const WhatIsRayu: React.FC = () => {
  const columns = [
    {
      letter: 'R',
      icon: (
        <div className="w-6 h-1 bg-[#CCFF00] rounded-full shadow-[0_0_8px_#CCFF00] mt-1" />
      ),
      title: 'RAW',
      description:
        'The first, honest version of a thought, before it gets edited into something safer.',
    },
    {
      letter: 'A',
      icon: <Eye size={18} className="text-[#CCFF00]" />,
      title: 'AWARENESS',
      description:
        "The moment something registers, before it's even fully formed into words.",
    },
    {
      letter: 'Y',
      icon: <User size={18} className="text-[#CCFF00]" />,
      title: 'YOU',
      description:
        'Where that awareness goes — shared straight to you, as it happens.',
    },
    {
      letter: 'U',
      icon: <Filter size={18} className="text-[#CCFF00]" />,
      title: 'UNFILTERED',
      description:
        'No spin, no sugarcoating. What you see is what was actually thought.',
    },
  ];

  return (
    <section className="bg-[#050505] text-white py-24 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Vision Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:pr-8"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-6">
              WHAT IS<br />
              <span className="text-[#CCFF00]">RAYU?</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-normal">
              RAYU isn&apos;t a niche.<br />
              It&apos;s a lens.<br />
              A running commentary on<br />
              tech, the world, and life —<br />
              raw, honest, and unfiltered.<br />
              Straight to you.
            </p>
          </motion.div>

          {/* Right Column: 4 Editorial Columns (R - A - Y - U) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-6 border-l border-white/10 lg:pl-8">
            {columns.map((col, idx) => (
              <motion.div
                key={col.letter}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between p-4 rounded-md border border-white/5 bg-[#0B0B0B]/50 hover:border-[#CCFF00]/40 transition-colors duration-300 group"
              >
                <div>
                  {/* Oversized Letter with Icon Accent */}
                  <div className="flex items-baseline justify-between mb-4 border-b border-white/10 pb-3 relative">
                    <span className="text-5xl md:text-6xl font-black tracking-tighter text-white group-hover:text-[#CCFF00] transition-colors duration-300">
                      {col.letter}
                    </span>
                    <div className="opacity-80 group-hover:scale-110 transition-transform">
                      {col.icon}
                    </div>

                    {/* Left to right lime line draw */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#CCFF00] origin-left"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase mb-2">
                    {col.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {col.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
