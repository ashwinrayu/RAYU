'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ARTICLES', href: '/articles' },
  { label: 'THOUGHTS', href: '/thoughts' },
  { label: 'RESOURCES', href: '/resources' },
  { label: 'ABOUT', href: '/about' },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-2xl font-black tracking-tighter text-white"
            data-cursor-label="RAYU"
          >
            <span className="text-white group-hover:text-[#CCFF00] transition-colors duration-200">
              RAY<span className="text-[#CCFF00]">U.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative text-xs font-mono font-bold tracking-widest transition-colors duration-200 uppercase ${
                    isActive ? 'text-[#CCFF00]' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#CCFF00] rounded-full shadow-[0_0_8px_rgba(204,255,0,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls (Visible on BOTH Mobile & Desktop) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/admin/studio"
              className="inline-flex items-center gap-1.5 bg-[#0B0B0B] border border-white/20 text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-wider px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-sm hover:border-[#CCFF00] transition-colors shadow-[0_0_10px_rgba(204,255,0,0.15)]"
            >
              <Sparkles size={12} className="text-[#CCFF00]" />
              <span>STUDIO</span>
            </Link>

            <Link
              href="#subscribe"
              data-cursor-label="GO"
              className="cta-element btn-sweep hidden sm:inline-flex items-center justify-center bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm hover:bg-[#b8e600] transition-colors duration-200 shadow-[0_0_15px_rgba(204,255,0,0.25)]"
            >
              SUBSCRIBE
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors duration-200 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest text-[#CCFF00]">
                NAVIGATION
              </span>
              {NAV_ITEMS.map((item, idx) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl font-bold tracking-tight block ${
                        isActive ? 'text-[#CCFF00]' : 'text-white hover:text-[#CCFF00]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col space-y-3">
              <Link
                href="/admin/studio"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#0B0B0B] border border-[#CCFF00] text-[#CCFF00] text-sm font-bold uppercase tracking-wider py-3.5 rounded-sm flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>OPEN CREATOR STUDIO</span>
              </Link>

              <Link
                href="#subscribe"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#CCFF00] text-[#050505] text-sm font-bold uppercase tracking-wider py-3.5 rounded-sm"
              >
                SUBSCRIBE TO RAYU
              </Link>
              <div className="flex justify-between items-center text-xs text-neutral-500 font-mono pt-2">
                <span>© 2026 RAYU.</span>
                <span>UNFILTERED COMMENTARY</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
