'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ARTICLES', href: '/articles' },
  { label: 'THOUGHTS', href: '/thoughts' },
  { label: 'RESOURCES', href: '/resources' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-0.5">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white">
              RA<span className="text-[#CCFF00]">Y</span>U.
            </span>
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wider">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-1 transition-colors duration-200 uppercase ${
                    isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-[#CCFF00] rounded-full shadow-[0_0_8px_#CCFF00]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            <Link
              href="#subscribe"
              data-cursor-label="GO"
              className="cta-element btn-sweep hidden sm:inline-flex items-center justify-center bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm hover:bg-[#b8e600] transition-colors duration-200 shadow-[0_0_15px_rgba(204,255,0,0.25)]"
            >
              SUBSCRIBE
            </Link>

            {/* Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors duration-200"
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

            <div className="border-t border-white/10 pt-6 flex flex-col space-y-4">
              <Link
                href="#subscribe"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#CCFF00] text-[#050505] text-sm font-bold uppercase tracking-wider py-3.5 rounded-sm"
              >
                SUBSCRIBE TO RAYU
              </Link>
              <div className="flex justify-between items-center text-xs text-neutral-500 font-mono">
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
