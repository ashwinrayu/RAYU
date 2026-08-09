'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Globe, Compass, Zap, BookOpen, ArrowRight } from 'lucide-react';
import { TOPICS_DATA } from '@/data/topics';

export const ExploreTopics: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu size={22} className="text-[#CCFF00]" />;
      case 'Globe':
        return <Globe size={22} className="text-[#CCFF00]" />;
      case 'Compass':
        return <Compass size={22} className="text-[#CCFF00]" />;
      case 'Zap':
        return <Zap size={22} className="text-[#CCFF00]" />;
      case 'BookOpen':
        return <BookOpen size={22} className="text-[#CCFF00]" />;
      default:
        return <Cpu size={22} className="text-[#CCFF00]" />;
    }
  };

  const topicsList = Object.values(TOPICS_DATA);

  return (
    <section className="bg-[#050505] text-white py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 pb-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-2">
              CURATED DOMAINS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
              EXPLORE BY <span className="text-[#CCFF00]">TOPIC</span>
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-neutral-500 uppercase">
            5 CORE DOMAINS
          </span>
        </div>

        {/* 5 Topic Cards Grid linking to dedicated /topics/[slug] pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {topicsList.map((topic, idx) => (
            <motion.div
              key={topic.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link
                href={`/topics/${topic.slug}`}
                data-cursor-label="EXPLORE"
                className="cta-element btn-sweep group flex flex-col justify-between h-64 p-6 bg-[#0B0B0B] border border-white/10 rounded-sm hover:border-[#CCFF00]/70 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Top Icon & Title */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00]/10 transition-colors">
                      {getIcon(topic.iconName)}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 font-bold border border-white/10 px-2 py-0.5 rounded-sm">
                      {topic.articleCount}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold tracking-wider text-white group-hover:text-[#CCFF00] transition-colors mb-2 uppercase">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal line-clamp-3">
                    {topic.description}
                  </p>
                </div>

                {/* Bottom Arrow Indicator */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono text-neutral-500 group-hover:text-white transition-colors">
                  <span className="text-[10px] font-bold text-[#CCFF00]">EXPLORE →</span>
                  <ArrowRight
                    size={14}
                    className="text-neutral-500 group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-all"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
