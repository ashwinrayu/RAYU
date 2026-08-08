'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { ARTICLES_DATA } from '@/data/articles';

const CATEGORIES = ['ALL', 'TECH', 'WORLD', 'LIFE', 'THOUGHTS', 'RANDOM'];

const CATEGORY_DESCRIPTIONS: { [key: string]: string } = {
  ALL: 'Explore long-form essays, observations, and unfiltered commentary across artificial intelligence, internet culture, and modern philosophy.',
  TECH: 'Deep dives into artificial intelligence, autonomous agents, modern software architecture, and the future of technology.',
  WORLD: 'Commentary on internet evolution, changing digital landscapes, dark forest web theories, and global shifts.',
  LIFE: 'Personal reflections, first-principles realizations, mindset shifts, and unvarnished life lessons.',
  THOUGHTS: 'Direct takes, unfiltered opinions, and persistent questions about human capability and AI dependency.',
  RANDOM: 'Eclectic observations, unexpected ideas, and curious discoveries worth sharing.',
};

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchesCategory =
        selectedCategory === 'ALL' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = ARTICLES_DATA[0];

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-3">
            ARCHIVE & WRITINGS
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-6">
            ARTICLES & <span className="text-[#CCFF00]">ESSAYS</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
            {CATEGORY_DESCRIPTIONS[selectedCategory] || CATEGORY_DESCRIPTIONS.ALL}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center mb-12 bg-[#0B0B0B] p-4 rounded-sm border border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono font-bold px-4 py-2 rounded-sm transition-all duration-200 uppercase ${
                  selectedCategory === cat
                    ? 'bg-[#CCFF00] text-[#050505] shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder:text-neutral-500 rounded-sm outline-none transition-colors"
            />
          </div>
        </div>

        {/* Featured Article Banner (Only shown when no search is active) */}
        {!searchQuery && selectedCategory === 'ALL' && featuredArticle && (
          <div className="mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-4">
              ★ FEATURED ARTICLE
            </span>
            <Link
              href={`/articles/${featuredArticle.slug}`}
              data-cursor-label="VIEW"
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0B0B0B] border border-white/15 rounded-sm overflow-hidden hover:border-[#CCFF00] transition-colors duration-300"
            >
              <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto w-full bg-neutral-900 overflow-hidden">
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
              </div>
              <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-3">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-[#CCFF00] transition-colors mb-4 uppercase leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>{featuredArticle.date}</span>
                  <div className="flex items-center gap-2 text-white font-bold group-hover:text-[#CCFF00]">
                    <span>READ ARTICLE</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                href={`/articles/${article.slug}`}
                data-cursor-label="VIEW"
                className="group flex flex-col justify-between h-full bg-[#0B0B0B] border border-white/10 rounded-sm overflow-hidden hover:border-[#CCFF00]/60 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-[#CCFF00] transition-colors mb-2 uppercase leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>{article.date}</span>
                  <div className="flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>{article.readTime}</span>
                    <ArrowRight size={12} className="text-[#CCFF00] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-sm">
            <p className="text-neutral-400 font-mono text-sm mb-4">No articles found matching your query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="text-xs font-mono font-bold text-[#CCFF00] underline uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
