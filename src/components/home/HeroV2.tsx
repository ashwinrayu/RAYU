'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { CinematicBackground } from '@/components/ui/CinematicBackground';

export const HeroV2: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rawRef = useRef<HTMLHeadingElement | null>(null);
  const awarenessRef = useRef<HTMLHeadingElement | null>(null);
  const youRef = useRef<HTMLHeadingElement | null>(null);
  const unfilteredRef = useRef<HTMLHeadingElement | null>(null);

  const wordmarkRef = useRef<HTMLHeadingElement | null>(null);
  const brandStatementRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLDivElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline();

      // Initial state setup — autoAlpha: 0 completely hides opacity + visibility
      gsap.set([rawRef.current, awarenessRef.current, youRef.current, unfilteredRef.current], {
        autoAlpha: 0,
        scale: 0.85,
      });

      gsap.set([wordmarkRef.current, brandStatementRef.current, taglineRef.current, ctaGroupRef.current], {
        autoAlpha: 0,
        y: 35,
      });

      // PHASE 01 -> PHASE 02: RAW
      mainTl.set(rawRef.current, { autoAlpha: 1, y: 40, scale: 0.9 })
        .to(rawRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' })
        .to(rawRef.current, { autoAlpha: 0, y: -30, duration: 0.3, ease: 'power2.in' }, '+=0.15');

      // PHASE 03: AWARENESS (PURE KINETIC TYPOGRAPHY — NO IMAGE BOX)
      mainTl.set(awarenessRef.current, { autoAlpha: 1, scale: 0.9, y: 30 })
        .to(awarenessRef.current, { autoAlpha: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' })
        .to(awarenessRef.current, { autoAlpha: 0, y: -30, scale: 0.95, duration: 0.3, ease: 'power2.in' }, '+=0.2');

      // PHASE 04: YOU
      mainTl.set(youRef.current, { autoAlpha: 1, y: 40, scale: 0.9 })
        .to(youRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' })
        .to(youRef.current, { autoAlpha: 0, y: -30, duration: 0.25, ease: 'power2.in' }, '+=0.15');

      // PHASE 05: UNFILTERED.
      mainTl.set(unfilteredRef.current, { autoAlpha: 1, y: 40, scale: 0.9 })
        .to(unfilteredRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power4.out' })
        .to(unfilteredRef.current, { autoAlpha: 0, scale: 1.05, duration: 0.3, ease: 'power2.in' }, '+=0.2');

      // PHASE 06-08: RAYU. Final Hero Assembly
      mainTl.to(wordmarkRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'expo.out',
      })
      .to(brandStatementRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      }, '-=0.2')
      .to([taglineRef.current, ctaGroupRef.current], {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power3.out',
      }, '-=0.1');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#030303] text-white flex flex-col justify-between pt-24 pb-6 overflow-hidden select-none"
    >
      {/* 100% Exact User-Provided Background Image */}
      <CinematicBackground />

      {/* Left Vertical Sidebar Metadata (100% Exact to reference image) */}
      <div className="hidden lg:flex flex-col justify-between absolute left-8 top-28 bottom-10 z-20 pointer-events-none">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-xs font-mono font-bold text-white tracking-widest">01</span>
          <div className="w-[1px] h-12 bg-neutral-700" />
          <div
            className="text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase font-medium"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            THINKING AS IT HAPPENS
          </div>
          <div className="w-[1px] h-8 bg-neutral-700" />
        </div>

        <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-[10px] font-mono text-neutral-300 font-bold">
          N
        </div>
      </div>

      {/* Right Vertical Pagination Indicators (100% Exact to reference image) */}
      <div className="hidden lg:flex flex-col items-center space-y-3.5 absolute right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00]" />
        <div className="w-2 h-2 rounded-full border border-neutral-600" />
        <div className="w-2 h-2 rounded-full border border-neutral-600" />
        <div className="w-2 h-2 rounded-full border border-neutral-600" />
      </div>

      {/* Hero Central Stage Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full relative z-10 my-auto min-h-[500px] flex items-center">
        {/* Pure Kinetic Typography Intro Overlay (Phases 02-05 — NO IMAGE BOX) */}
        <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-30">
          <h2
            ref={rawRef}
            className="text-7xl sm:text-9xl md:text-[12rem] font-black tracking-tighter text-white uppercase leading-none invisible opacity-0"
          >
            RAW
          </h2>

          <h2
            ref={awarenessRef}
            className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-[#CCFF00] uppercase leading-none invisible opacity-0"
          >
            AWARENESS
          </h2>

          <h2
            ref={youRef}
            className="text-7xl sm:text-9xl md:text-[12rem] font-black tracking-tighter text-white uppercase leading-none invisible opacity-0"
          >
            YOU
          </h2>

          <h2
            ref={unfilteredRef}
            className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-[#CCFF00] uppercase leading-none invisible opacity-0"
          >
            UNFILTERED.
          </h2>
        </div>

        {/* 100% Exact RAYU. Hero State */}
        <div className="max-w-3xl w-full text-left relative z-20">
          {/* RAYU. Wordmark (Matching reference image) */}
          <h1
            ref={wordmarkRef}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[12.5rem] font-black tracking-tighter leading-none mb-6 select-none opacity-0 invisible"
          >
            <span className="text-[#EBEBEB] inline-block">RA</span>
            <span className="text-[#CCFF00] inline-block drop-shadow-[0_0_35px_rgba(204,255,0,0.8)]">Y</span>
            <span className="text-[#EBEBEB] inline-block">U.</span>
          </h1>

          {/* Subtitle Line */}
          <div ref={brandStatementRef} className="mb-8 opacity-0 invisible">
            <h2 className="text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] text-neutral-200 uppercase font-semibold">
              RAW AWARENESS. STRAIGHT TO YOU. <span className="text-[#CCFF00] font-bold">UNFILTERED.</span>
            </h2>
          </div>

          {/* Tagline Paragraph */}
          <div ref={taglineRef} className="opacity-0 invisible">
            <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed mb-10 max-w-xl">
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

          {/* Buttons Group (Matching reference image) */}
          <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-5 opacity-0 invisible">
            <Link
              href="#latest-thoughts"
              data-cursor-label="GO"
              className="cta-element btn-sweep group inline-flex items-center gap-3 bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-[#b5e600] transition-colors duration-200 shadow-[0_0_25px_rgba(204,255,0,0.35)]"
            >
              <span>LATEST THOUGHTS</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              data-cursor-label="GO"
              className="group inline-flex items-center gap-3 bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-sm hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors duration-200 backdrop-blur-sm"
            >
              <span>ABOUT RAYU</span>
              <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar Layout (100% Exact to reference image) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full relative z-10 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="w-12" />

          {/* Center Capsule Pill Mouse Icon & Scroll Label */}
          <div className="flex flex-col items-center space-y-1">
            <div className="w-4 h-7 rounded-full border border-neutral-500 flex items-center justify-center">
              <div className="w-1 h-2 bg-[#CCFF00] rounded-full animate-bounce" />
            </div>
            <span className="uppercase tracking-[0.25em] text-neutral-400 font-semibold text-[10px]">
              SCROLL TO EXPLORE
            </span>
          </div>

          {/* Right ESTD. 2024 */}
          <div className="font-mono text-neutral-400 tracking-widest text-xs font-semibold">
            ESTD. 2024
          </div>
        </div>
      </div>
    </section>
  );
};
