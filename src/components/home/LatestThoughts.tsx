'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ARTICLES_DATA } from '@/data/articles';

export const LatestThoughts: React.FC = () => {
  const latestFour = ARTICLES_DATA.slice(0, 4);

  return (
    <section id="latest-thoughts" className="bg-[#050505] text-white py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
              LATEST <span className="text-[#CCFF00]">THOUGHTS</span>
            </h2>
          </div>
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-neutral-400 hover:text-[#CCFF00] transition-colors mt-4 sm:mt-0 uppercase"
          >
            <span>VIEW ALL POSTS</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestFour.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link
                href={`/articles/${article.slug}`}
                data-cursor-label="VIEW"
                className="group flex flex-col justify-between h-full bg-[#0B0B0B] border border-white/10 rounded-sm overflow-hidden hover:border-[#CCFF00]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-lg"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
                  </div>

                  {/* Content Container */}
                  <div className="p-5">
                    {/* Category Badge */}
                    <div className="text-[11px] font-mono font-bold tracking-widest text-[#CCFF00] uppercase mb-2">
                      {article.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold tracking-tight text-white group-hover:text-[#CCFF00] transition-colors duration-200 line-clamp-2 mb-2 leading-tight uppercase">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4 font-normal">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>{article.date}</span>
                  <div className="flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>{article.readTime}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform text-[#CCFF00]" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
