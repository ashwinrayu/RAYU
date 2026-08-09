'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { IconX, IconInstagram, IconYoutube } from '@/components/ui/SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050505] text-white border-t border-white/10 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          {/* Left Block */}
          <div>
            <div className="mb-4 text-[#CCFF00] font-mono text-xs uppercase tracking-widest">
              STAY CONNECTED
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-6 leading-tight">
              RAW AWARENESS.<br />
              STRAIGHT TO YOU.<br />
              <span className="text-[#CCFF00]">UNFILTERED.</span>
            </h3>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors duration-200"
              >
                <IconX size={16} />
              </a>
              <a
                href="https://www.instagram.com/thisisrayu/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram @thisisrayu"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors duration-200"
              >
                <IconInstagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors duration-200"
              >
                <IconYoutube size={18} />
              </a>
              <a
                href="mailto:thisisrayu@gmail.com"
                aria-label="Email thisisrayu@gmail.com"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors duration-200"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right Ghost Watermark & Quick Nav */}
          <div className="lg:text-right flex flex-col lg:items-end justify-between">
            <div className="text-6xl md:text-8xl lg:text-9xl font-black text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none mb-6">
              RAYU.
            </div>
            <div className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <Link href="/" className="hover:text-[#CCFF00] transition-colors">HOME</Link>
              <Link href="/articles" className="hover:text-[#CCFF00] transition-colors">ARTICLES</Link>
              <Link href="/thoughts" className="hover:text-[#CCFF00] transition-colors">THOUGHTS</Link>
              <Link href="/resources" className="hover:text-[#CCFF00] transition-colors">RESOURCES</Link>
              <Link href="/about" className="hover:text-[#CCFF00] transition-colors">ABOUT</Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
          <div>© 2026 Rayu. All rights reserved.</div>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">PRIVACY</Link>
            <Link href="#" className="hover:text-white transition-colors">TERMS</Link>
            <Link href="/contact" className="hover:text-white transition-colors">CONTACT</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
