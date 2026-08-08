'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const metrics = [
    { label: 'POSTS', value: '120+' },
    { label: 'THOUGHTS', value: '∞' },
    { label: 'CUPS OF COFFEE', value: 'Too Many', isAccent: true },
    { label: 'OVERTHINKING', value: '24/7', isAccent: true },
  ];

  return (
    <section className="bg-[#050505] text-white py-24 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Mask Revealed Laser Silhouette Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            data-cursor-label="OPEN"
            className="lg:col-span-5 relative min-h-[380px] lg:min-h-[460px] rounded-sm overflow-hidden bg-neutral-950 border border-white/10 group"
          >
            <Image
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop"
              alt="Rayu Creator Silhouette"
              fill
              className="object-cover grayscale contrast-150 brightness-75 opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />

            {/* Moving Laser Streak */}
            <motion.div
              animate={{ y: [-150, 150] }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4, ease: 'easeInOut' }}
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#CCFF00] shadow-[0_0_20px_#CCFF00] z-10"
            />
          </motion.div>

          {/* Middle Column: Creator Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-between p-6 md:p-8 bg-[#0B0B0B] border border-white/10 rounded-sm"
          >
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-4">
                ABOUT THE CREATOR
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight uppercase mb-6">
                THERE&apos;S A PERSON<br />
                BEHIND RAYU.<br />
                BUT RAYU IS NOT<br />
                <span className="text-[#CCFF00]">ABOUT THAT PERSON.</span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal mb-8">
                Rayu is the voice.<br />
                The perspective.<br />
                The thoughts.<br />
                The running commentary.<br />
                The unfiltered lens.<br />
                The rest? Not that important.
              </p>
            </div>

            <div>
              <Link
                href="/about"
                data-cursor-label="GO"
                className="group inline-flex items-center gap-3 text-xs font-mono font-bold tracking-widest text-white hover:text-[#CCFF00] transition-colors uppercase"
              >
                <span>READ MORE ABOUT ME</span>
                <div className="w-6 h-6 rounded-full border border-white/20 group-hover:border-[#CCFF00] flex items-center justify-center transition-colors">
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Stats Metric Grid with Animated Entry */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col justify-between gap-4"
          >
            {metrics.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                className="flex-1 p-6 bg-[#0B0B0B] border border-white/10 rounded-sm flex items-center justify-between hover:border-white/20 transition-colors"
              >
                <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
                  {item.label}
                </span>
                <span
                  className={`text-2xl sm:text-3xl font-black tracking-tight ${
                    item.isAccent ? 'text-[#CCFF00]' : 'text-white'
                  }`}
                >
                  {item.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
