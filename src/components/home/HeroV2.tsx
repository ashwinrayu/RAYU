'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticleField } from '@/components/ui/ParticleField';

gsap.registerPlugin(ScrollTrigger);

export const HeroV2: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rawRef = useRef<HTMLHeadingElement | null>(null);
  const awarenessRef = useRef<HTMLHeadingElement | null>(null);
  const youRef = useRef<HTMLHeadingElement | null>(null);
  const unfilteredRef = useRef<HTMLHeadingElement | null>(null);
  const mainWordmarkRef = useRef<HTMLHeadingElement | null>(null);
  const brandStatementRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLDivElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setAnimationCompleted(true),
      });

      // PHASE 01: Initial minimal black screen (0.0s - 0.3s)
      tl.set([rawRef.current, awarenessRef.current, youRef.current, unfilteredRef.current, mainWordmarkRef.current], {
        opacity: 0,
        y: 60,
        scale: 0.9,
      });
      tl.set(imageFrameRef.current, { opacity: 0, scale: 0.85, clipPath: 'inset(50% 0% 50% 0%)' });
      tl.set([brandStatementRef.current, taglineRef.current, ctaGroupRef.current], { opacity: 0, y: 30 });

      // PHASE 02: RAW kinetic typography entry (0.4s - 0.9s)
      tl.to(rawRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      });
      tl.to(rawRef.current, {
        opacity: 0.2,
        y: -40,
        duration: 0.4,
        ease: 'power2.in',
      }, '+=0.2');

      // PHASE 03: AWARENESS entry with image mask expansion (1.2s - 1.8s)
      tl.to(awarenessRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2');
      tl.to(imageFrameRef.current, {
        opacity: 1,
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.7,
        ease: 'expo.out',
      }, '-=0.4');
      tl.to([awarenessRef.current, imageFrameRef.current], {
        opacity: 0.2,
        y: -40,
        duration: 0.4,
        ease: 'power2.in',
      }, '+=0.2');

      // PHASE 04: YOU kinetic entry (2.0s - 2.4s)
      tl.to(youRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.2');
      tl.to(youRef.current, {
        opacity: 0.2,
        y: -30,
        duration: 0.3,
        ease: 'power2.in',
      }, '+=0.2');

      // PHASE 05: UNFILTERED. statement (2.6s - 3.1s)
      tl.to(unfilteredRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power4.out',
      }, '-=0.1');
      tl.to(unfilteredRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.4,
        ease: 'power2.in',
      }, '+=0.3');

      // PHASE 06: Convergence into dominant RAYU. wordmark (3.3s - 4.0s)
      tl.to(mainWordmarkRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'expo.out',
      });

      // PHASE 07: Brand statement reveal
      tl.to(brandStatementRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');

      // PHASE 08: Tagline & CTA reveal
      tl.to([taglineRef.current, ctaGroupRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between pt-28 pb-8 overflow-hidden select-none"
    >
      {/* Background Particle Field */}
      <ParticleField />

      {/* Kinetic Stage Overlay Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 my-auto min-h-[520px] flex items-center justify-center">
        {/* Kinetic Phase Typography Canvas */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {/* Phase 02: RAW */}
          <h2
            ref={rawRef}
            className="text-8xl sm:text-9xl md:text-[13rem] font-black tracking-tighter text-white uppercase leading-none opacity-0 absolute"
          >
            RAW
          </h2>

          {/* Phase 03: AWARENESS & Image Mask */}
          <div className="flex flex-col items-center absolute">
            <h2
              ref={awarenessRef}
              className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-[#CCFF00] uppercase leading-none opacity-0 mb-4"
            >
              AWARENESS
            </h2>
            <div
              ref={imageFrameRef}
              className="w-80 sm:w-[480px] h-44 sm:h-64 relative rounded-sm overflow-hidden border border-[#CCFF00]/40 shadow-[0_0_40px_rgba(204,255,0,0.2)] opacity-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop"
                alt="Awareness Kinetic Frame"
                fill
                className="object-cover grayscale contrast-150"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>
          </div>

          {/* Phase 04: YOU */}
          <h2
            ref={youRef}
            className="text-8xl sm:text-9xl md:text-[13rem] font-black tracking-tighter text-white uppercase leading-none opacity-0 absolute"
          >
            YOU
          </h2>

          {/* Phase 05: UNFILTERED. */}
          <h2
            ref={unfilteredRef}
            className="text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-[#CCFF00] uppercase leading-none opacity-0 absolute"
          >
            UNFILTERED.
          </h2>
        </div>

        {/* Phase 06-08: Main RAYU. Hero State */}
        <div className="max-w-3xl w-full text-left relative z-20">
          <h1
            ref={mainWordmarkRef}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[11.5rem] font-extrabold tracking-tighter leading-none mb-6 select-none opacity-0"
          >
            RA<span className="text-[#CCFF00]">Y</span>U.
          </h1>

          <div ref={brandStatementRef} className="mb-8 opacity-0">
            <h2 className="text-sm sm:text-base md:text-lg font-mono tracking-wider text-neutral-200 uppercase font-semibold">
              RAW AWARENESS. STRAIGHT TO YOU. <span className="text-[#CCFF00]">UNFILTERED.</span>
            </h2>
          </div>

          <div ref={taglineRef} className="opacity-0">
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed mb-10 max-w-xl">
              Tech. World. Life.<br />
              Whatever&apos;s actually on my mind —<br />
              posted{' '}
              <span className="relative inline-block font-semibold text-white">
                as it happens,
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CCFF00] rounded-full shadow-[0_0_8px_#CCFF00]" />
              </span>
              <br />
              not after it&apos;s been cleaned up.
            </p>
          </div>

          <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 opacity-0">
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

            <div className="flex items-center gap-2 text-xs font-mono text-[#CCFF00] border border-[#CCFF00]/30 px-3 py-1.5 rounded-sm bg-[#CCFF00]/10 ml-auto sm:ml-0">
              <Sparkles size={14} />
              <span>V2 KINETIC MOTION ENGINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Micro Details Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 pt-12">
        <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-neutral-400">
          <div className="font-bold text-white tracking-widest text-sm">01</div>
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
