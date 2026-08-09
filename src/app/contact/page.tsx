'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { IconX, IconInstagram, IconYoutube } from '@/components/ui/SocialIcons';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-3">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-6">
            LET&apos;S <span className="text-[#CCFF00]">TALK.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-xl leading-relaxed">
            Have something worth saying?<br />
            Want to collaborate?<br />
            Found something Rayu should talk about?<br />
            Get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Block */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#0B0B0B] border border-white/10 p-8 rounded-sm"
          >
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <CheckCircle2 size={48} className="text-[#CCFF00] mx-auto" />
                <h3 className="text-2xl font-bold uppercase">MESSAGE RECEIVED</h3>
                <p className="text-sm text-neutral-400 font-mono">
                  Thanks for reaching out. Rayu will inspect your message soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-neutral-400 mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Jane Doe"
                    className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] p-4 text-sm text-white rounded-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-neutral-400 mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="jane@example.com"
                    className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] p-4 text-sm text-white rounded-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-neutral-400 mb-2">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="What's actually on your mind?"
                    className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] p-4 text-sm text-white rounded-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="cta-element w-full bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-[#b8e600] transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(204,255,0,0.25)]"
                >
                  <span>SEND MESSAGE</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Direct Channels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-[#0B0B0B] border border-white/10 p-8 rounded-sm">
              <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase block mb-3">
                DIRECT EMAIL
              </span>
              <a
                href="mailto:thisisrayu@gmail.com"
                className="text-xl font-mono font-bold text-white hover:text-[#CCFF00] transition-colors"
              >
                thisisrayu@gmail.com
              </a>
              <p className="text-xs text-neutral-500 font-mono mt-2">
                Response time typically within 24 hours.
              </p>
            </div>

            <div className="bg-[#0B0B0B] border border-white/10 p-8 rounded-sm">
              <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase block mb-4">
                SOCIAL CHANNELS
              </span>
              <div className="space-y-3">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 border border-white/5 rounded-sm hover:border-[#CCFF00] text-xs font-mono transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <IconX size={16} className="text-[#CCFF00]" /> X (TWITTER)
                  </span>
                  <span className="text-neutral-500">@thisisrayu</span>
                </a>

                <a
                  href="https://www.instagram.com/thisisrayu/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 border border-white/5 rounded-sm hover:border-[#CCFF00] text-xs font-mono transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <IconInstagram size={16} className="text-[#CCFF00]" /> INSTAGRAM
                  </span>
                  <span className="text-neutral-500">@thisisrayu</span>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 border border-white/5 rounded-sm hover:border-[#CCFF00] text-xs font-mono transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <IconYoutube size={16} className="text-[#CCFF00]" /> YOUTUBE
                  </span>
                  <span className="text-neutral-500">@rayu_official</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
