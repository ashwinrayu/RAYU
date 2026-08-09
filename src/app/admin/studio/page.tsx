'use client';

import React, { useState } from 'react';
import { InstagramPostStudio } from '@/components/admin/InstagramPostStudio';
import { OMNI_NEWS_DATA, OmniNewsItem } from '@/services/newsFetcher';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { CONTACT_EMAIL, INSTAGRAM_HANDLE } from '@/data/instagram';

export default function AdminStudioPage() {
  const [selectedStory, setSelectedStory] = useState<OmniNewsItem>(OMNI_NEWS_DATA[0]);

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase mb-1">
              <Sparkles size={14} />
              <span>RAYU CREATOR STUDIO • INSTAGRAM CROSS-PUBLISHER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              INSTAGRAM <span className="text-[#CCFF00]">POST STUDIO</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <span>OFFICIAL ACCOUNT: <span className="text-[#CCFF00] font-bold">@{INSTAGRAM_HANDLE}</span></span>
            <span className="text-neutral-600">•</span>
            <span>CONTACT: <span className="text-white font-bold">{CONTACT_EMAIL}</span></span>
          </div>
        </div>

        {/* Story Selector Stream Grid */}
        <div className="mb-10">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase block mb-4">
            SELECT A LIVE STORY TO GENERATE INSTAGRAM POST & CAPTION FOR @THISISRAYU:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OMNI_NEWS_DATA.map((item) => {
              const isSelected = selectedStory.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedStory(item)}
                  className={`text-left p-4 rounded-sm border transition-all ${
                    isSelected
                      ? 'bg-[#CCFF00]/10 border-[#CCFF00] text-white shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                      : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span className="text-[#CCFF00] font-bold">[{item.category}]</span>
                    {isSelected && <CheckCircle2 size={12} className="text-[#CCFF00]" />}
                  </div>
                  <h4 className="text-xs font-bold uppercase line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Story Instagram Studio Component */}
        <InstagramPostStudio newsItem={selectedStory} />
      </div>
    </div>
  );
}
