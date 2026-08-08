'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Bookmark, Search } from 'lucide-react';
import { RESOURCES_DATA } from '@/data/resources';

const RESOURCE_CATEGORIES = [
  'ALL',
  'TOOLS',
  'WEBSITES',
  'BOOKS',
  'VIDEOS',
  'APPS',
  'AI',
  'CREATIVE',
  'PRODUCTIVITY',
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-3">
            CURATED DIRECTORY
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-6">
            USEFUL <span className="text-[#CCFF00]">RESOURCES</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            A handpicked collection of tools, platforms, books, and frameworks worth knowing about.
          </p>
        </div>

        {/* Category Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center mb-12 bg-[#0B0B0B] p-4 rounded-sm border border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono font-bold px-3.5 py-2 rounded-sm transition-all uppercase ${
                  selectedCategory === cat
                    ? 'bg-[#CCFF00] text-[#050505] shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] pl-10 pr-4 py-2 text-xs font-mono text-white placeholder:text-neutral-500 rounded-sm outline-none transition-colors"
            />
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between h-56 p-6 bg-[#0B0B0B] border border-white/10 rounded-sm hover:border-[#CCFF00] transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#CCFF00] uppercase px-2 py-0.5 border border-[#CCFF00]/30 rounded-sm bg-[#CCFF00]/10">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-[#CCFF00] transition-colors mb-2 uppercase">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-white">
                  <span>VISIT RESOURCE</span>
                  <ExternalLink size={14} className="text-[#CCFF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
