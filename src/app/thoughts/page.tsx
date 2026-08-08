'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, Clock, Sparkles } from 'lucide-react';
import { THOUGHTS_DATA } from '@/data/thoughts';

export default function ThoughtsPage() {
  const [likes, setLikes] = useState<{ [key: string]: number }>(
    THOUGHTS_DATA.reduce((acc, t) => ({ ...acc, [t.id]: t.likesCount || 0 }), {})
  );
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: liked[id] ? prev[id] - 1 : prev[id] + 1,
    }));
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-3">
            REAL-TIME FEED
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-6">
            RAW <span className="text-[#CCFF00]">THOUGHTS</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            Short-form observations, unpolished ideas, and real-time realizations. No draft state, no filters.
          </p>
        </div>

        {/* Thoughts Timeline Feed */}
        <div className="space-y-6">
          {THOUGHTS_DATA.map((thought, idx) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 md:p-8 bg-[#0B0B0B] border border-white/10 rounded-sm hover:border-[#CCFF00]/40 transition-colors relative group"
            >
              {/* Header Info */}
              <div className="flex items-center justify-between mb-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#CCFF00] uppercase px-2 py-0.5 border border-[#CCFF00]/30 rounded-sm bg-[#CCFF00]/10">
                    {thought.category}
                  </span>
                  <span className="text-neutral-500">{thought.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-500">
                  <Clock size={12} />
                  <span>{thought.timestamp}</span>
                </div>
              </div>

              {/* Thought Content */}
              <p className="text-lg sm:text-xl text-neutral-200 font-normal leading-relaxed mb-6">
                {thought.content}
              </p>

              {/* Action Bar */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(thought.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      liked[thought.id] ? 'text-[#CCFF00]' : 'hover:text-white'
                    }`}
                  >
                    <Heart
                      size={15}
                      className={liked[thought.id] ? 'fill-[#CCFF00] text-[#CCFF00]' : ''}
                    />
                    <span>{likes[thought.id]}</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-neutral-500">
                    <Sparkles size={14} className="text-[#CCFF00]" />
                    <span>RAW OBSERVED</span>
                  </div>
                </div>

                <div className="text-[10px] text-neutral-600 uppercase font-mono">
                  RAYU STREAM #{thought.id}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
