'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';
import { IconX, IconInstagram, IconYoutube } from '@/components/ui/SocialIcons';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section id="subscribe" className="bg-[#050505] text-white py-24 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Block: Form & Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-3">
              STAY IN THE LOOP
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-tight mb-6">
              NEW THOUGHTS.<br />
              STRAIGHT TO YOU.<br />
              <span className="text-[#CCFF00]">NO SPAM. NO BULLSHIT.</span>
            </h2>

            {/* Newsletter Form */}
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-[#CCFF00]/10 border border-[#CCFF00] rounded-sm flex items-center gap-3 text-[#CCFF00] text-sm font-mono"
              >
                <CheckCircle2 size={18} />
                <span>You&apos;re subscribed. Raw awareness straight to your inbox.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-[#0B0B0B] border border-white/15 focus:border-[#CCFF00] px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 rounded-sm outline-none transition-colors"
                />
                <button
                  type="submit"
                  data-cursor-label="GO"
                  className="cta-element btn-sweep bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-sm hover:bg-[#b8e600] transition-colors shadow-[0_0_15px_rgba(204,255,0,0.25)] whitespace-nowrap"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Block: Faint Ghost Watermark & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12 flex flex-col justify-center"
          >
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-white/[0.04] select-none tracking-tighter leading-none mb-4">
              RAYU.
            </div>

            <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase leading-relaxed mb-6">
              RAW AWARENESS.<br />
              STRAIGHT TO YOU.<br />
              <span className="text-[#CCFF00]">UNFILTERED.</span>
            </p>

            <div className="flex items-center space-x-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors"
              >
                <IconX size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors"
              >
                <IconInstagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors"
              >
                <IconYoutube size={18} />
              </a>
              <a
                href="mailto:contact@rayu.com"
                aria-label="Email"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
