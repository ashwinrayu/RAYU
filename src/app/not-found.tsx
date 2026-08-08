'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Home, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#050505] text-white min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Background Laser Glow Beam */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#CCFF00]/30 shadow-[0_0_30px_#CCFF00] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-4">
          ERROR 404 — PAGE NOT FOUND
        </span>

        <h1 className="text-8xl sm:text-9xl font-black tracking-tighter uppercase leading-none mb-6">
          4<span className="text-[#CCFF00]">0</span>4.
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-white mb-4">
          THAT THOUGHT DOESN&apos;T EXIST (YET).
        </h2>

        <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed mb-10 max-w-lg mx-auto">
          The page or article you are looking for has moved, been un-published, or was never formed into words in the raw state.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            data-cursor-label="GO"
            className="cta-element btn-sweep inline-flex items-center gap-3 bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-sm hover:bg-[#b5e600] transition-colors shadow-[0_0_20px_rgba(204,255,0,0.3)]"
          >
            <Home size={16} />
            <span>RETURN HOME</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/articles"
            data-cursor-label="GO"
            className="inline-flex items-center gap-3 bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-sm hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors backdrop-blur-sm"
          >
            <BookOpen size={16} />
            <span>READ ARTICLES</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
