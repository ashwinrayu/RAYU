'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Radio, ArrowRight, Sparkles, AlertTriangle, Film, Gamepad2, CloudSun, Landmark, Cpu, Globe, Maximize2, ChevronRight, Clock, Search, ChevronLeft } from 'lucide-react';
import { OMNI_NEWS_DATA, OmniNewsItem } from '@/services/newsFetcher';

const CATEGORY_TABS = [
  { key: 'ALL', label: 'ALL UPDATES', icon: Sparkles },
  { key: 'INDIA', label: 'IN INDIA', icon: Globe },
  { key: 'WAR', label: '⚡ WAR & GEOPOLITICS', icon: AlertTriangle },
  { key: 'POLITICS', label: 'POLITICS & ECONOMY', icon: Landmark },
  { key: 'TECH', label: 'TECH & AI', icon: Cpu },
  { key: 'MOVIES', label: 'MOVIES & SHOWS', icon: Film },
  { key: 'GAMING', label: 'GAMING & ESPORTS', icon: Gamepad2 },
  { key: 'WEATHER', label: 'WEATHER & CLIMATE', icon: CloudSun },
];

const ITEMS_PER_PAGE = 6;

export const LiveNewsFeed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsStream, setNewsStream] = useState<OmniNewsItem[]>(OMNI_NEWS_DATA);

  // Automatic background refresh every 5 minutes (300,000 ms)
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const json = await res.json();
          if (json.items && json.items.length > 0) {
            setNewsStream(json.items);
          }
        }
      } catch {
        // Retain current stream on error
      }
    };

    const interval = setInterval(fetchLatest, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredItems = useMemo(() => {
    return newsStream.filter((item) => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keyFacts.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, newsStream]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  return (
    <section id="live-news" className="bg-[#030303] text-white py-20 border-t border-white/10 relative overflow-hidden select-none">
      {/* Background Laser Glow Streaks matching reference image */}
      <div className="absolute top-12 right-0 w-[600px] h-[300px] bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-[#CCFF00]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 border border-[#CCFF00]/40 text-[#CCFF00] text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(204,255,0,0.15)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-ping" />
              <span>LIVE INDIA & WORLD AWARENESS</span>
            </div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-medium">
              AUTOMATED OMNI-STREAM • {filteredItems.length} STORIES AVAILABLE
            </span>
          </div>

          {/* Automatic 5-Minute Sync Status Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-black/40 border border-white/10 text-xs font-mono text-neutral-400 font-medium">
            <Clock size={13} className="text-[#CCFF00]" />
            <span>AUTO-SYNCING EVERY 5 MINS</span>
          </div>
        </div>

        {/* H1 Main Title */}
        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none mb-8 text-white">
          REAL-TIME <span className="text-[#CCFF00]">WORLD & INDIA</span> STREAM
        </h2>

        {/* Vast Search Input & Category Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch justify-between">
          <div className="relative flex-grow">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH VASTLY ACROSS WORLD & INDIA NEWS (e.g. Semiconductor, ISRO, AI, IMAX, Weather)..."
              className="w-full bg-[#090909] border border-white/15 focus:border-[#CCFF00] pl-11 pr-4 py-3.5 text-xs font-mono text-white placeholder:text-neutral-500 rounded-md outline-none transition-colors shadow-inner"
            />
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-xs font-mono text-neutral-300 rounded-md transition-colors uppercase shrink-0"
            >
              CLEAR SEARCH
            </button>
          )}
        </div>

        {/* Sub-header Ticker Marquee Bar matching reference image */}
        <div className="mb-8 bg-[#090909] border border-white/10 rounded-md p-2.5 flex items-center justify-between overflow-hidden shadow-inner">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-xs font-mono font-bold text-[#CCFF00] tracking-wider uppercase flex items-center gap-1.5 shrink-0 px-2">
              <Radio size={14} /> BREAKING STREAM:
            </span>
            <div className="flex items-center gap-6 animate-marquee whitespace-nowrap text-xs font-mono text-neutral-300">
              {newsStream.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="hover:text-[#CCFF00] transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-[#CCFF00] font-bold">[{item.category}]</span>
                  <span>{item.title}</span>
                  <span className="text-neutral-600">•</span>
                </Link>
              ))}
            </div>
          </div>
          <button className="shrink-0 p-1 text-neutral-400 hover:text-[#CCFF00] transition-colors border-l border-white/10 pl-3 ml-2">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Category Filter Pills Matching Reference Image */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`inline-flex items-center gap-2 text-xs font-mono font-bold px-4 py-2.5 rounded-md transition-all duration-200 uppercase whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#CCFF00] text-black font-extrabold shadow-[0_0_20px_rgba(204,255,0,0.4)] border border-[#CCFF00]'
                    : 'bg-[#090909] border border-white/10 text-neutral-300 hover:text-white hover:border-white/30'
                }`}
              >
                <Icon size={14} className={isSelected ? 'text-black' : 'text-neutral-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* News Cards Grid 100% Matching Reference Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                href={`/news/${item.id}`}
                data-cursor-label="DETAILS"
                className="group flex flex-col justify-between h-full bg-[#080808] border border-white/10 rounded-lg overflow-hidden hover:border-[#CCFF00]/50 transition-all duration-300 hover:-translate-y-1 relative"
              >
                <div>
                  {/* Card Image Area with Top Badges */}
                  <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
                    <Image
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />

                    {/* Top Left Category Badge */}
                    <div className="absolute top-3 left-3 bg-black/75 border border-[#CCFF00]/60 px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#CCFF00] uppercase tracking-wider backdrop-blur-md">
                      {item.category}
                    </div>

                    {/* Top Right Published Time */}
                    <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-neutral-300 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                      {item.publishedAt}
                    </div>

                    {/* Bottom Right Expand Button Icon */}
                    <div className="absolute bottom-3 right-3 w-7 h-7 rounded bg-black/70 border border-white/20 flex items-center justify-center text-white group-hover:border-[#CCFF00] group-hover:text-[#CCFF00] transition-colors">
                      <Maximize2 size={12} />
                    </div>
                  </div>

                  {/* Card Title & Summary */}
                  <div className="p-6">
                    <h3 className="text-base font-bold tracking-tight text-white group-hover:text-[#CCFF00] transition-colors mb-3 leading-snug uppercase">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer Read Full Story Link */}
                <div className="px-6 pb-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono font-bold text-[#CCFF00] group-hover:text-[#CCFF00]">
                  <span>READ FULL STORY</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Bottom Card Hairline Laser Streak */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#CCFF00]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty Search Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 border border-dashed border-white/15 rounded-lg mb-12">
            <p className="text-neutral-400 font-mono text-sm mb-4">No stories found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="text-xs font-mono font-bold text-[#CCFF00] underline uppercase"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Multi-Page Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#090909] border border-white/10 rounded-md">
            <span className="text-xs font-mono text-neutral-400 uppercase">
              SHOWING PAGE <span className="text-white font-bold">{currentPage}</span> OF <span className="text-[#CCFF00] font-bold">{totalPages}</span> ({filteredItems.length} TOTAL STORIES)
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-2.5 rounded bg-black border border-white/15 text-neutral-300 hover:text-white disabled:opacity-40 disabled:hover:text-neutral-300 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded font-mono text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? 'bg-[#CCFF00] text-black border border-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                      : 'bg-black border border-white/15 text-neutral-300 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-2.5 rounded bg-black border border-white/15 text-neutral-300 hover:text-white disabled:opacity-40 disabled:hover:text-neutral-300 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
