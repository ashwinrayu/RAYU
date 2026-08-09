'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink, Mail } from 'lucide-react';
import { IconInstagram } from '@/components/ui/SocialIcons';
import { INSTAGRAM_POSTS, INSTAGRAM_HANDLE, INSTAGRAM_URL, CONTACT_EMAIL } from '@/data/instagram';

export const InstagramStream: React.FC = () => {
  return (
    <section className="bg-[#050505] text-white py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase flex items-center gap-1.5">
                <IconInstagram size={14} /> INSTAGRAM STREAM
              </span>
              <span className="text-xs font-mono text-neutral-500 uppercase">@{INSTAGRAM_HANDLE}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
              SOCIAL <span className="text-[#CCFF00]">AWARENESS</span> FEED
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-300 hover:text-[#CCFF00] bg-[#0B0B0B] border border-white/10 px-4 py-2.5 rounded-sm transition-colors uppercase"
            >
              <Mail size={14} className="text-[#CCFF00]" />
              <span>{CONTACT_EMAIL}</span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor-label="FOLLOW"
              className="cta-element btn-sweep inline-flex items-center gap-2 bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm hover:bg-[#b5e600] transition-colors"
            >
              <span>FOLLOW @THISISRAYU</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Instagram Post Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              data-cursor-label="INSTAGRAM"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group flex flex-col justify-between bg-[#0B0B0B] border border-white/10 rounded-sm overflow-hidden hover:border-[#CCFF00]/60 transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="relative aspect-square w-full bg-neutral-900 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 border border-white/20 px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold text-[#CCFF00] uppercase backdrop-blur-md">
                    {post.type}
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal line-clamp-3 mb-4">
                    {post.caption}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-white font-bold">
                    <Heart size={13} className="text-[#CCFF00]" /> {post.likesCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={13} /> {post.commentsCount}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-500 uppercase">{post.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
