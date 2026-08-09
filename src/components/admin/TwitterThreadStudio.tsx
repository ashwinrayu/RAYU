'use client';

import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { OmniNewsItem } from '@/services/newsFetcher';
import { INSTAGRAM_HANDLE } from '@/data/instagram';

interface Props {
  newsItem: OmniNewsItem;
}

export const TwitterThreadStudio: React.FC<Props> = ({ newsItem }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  // Generate 5-Tweet Thread
  const tweets = [
    `1/5 ⚡ RAYU BREAKING ANALYSIS: [${newsItem.category}]

${newsItem.title.toUpperCase()}

Thread on why this matters for South Asia and global tech tech stacks 👇 🧵 #RAYU #IndiaTech`,
    `2/5 Summary & Context:

${newsItem.summary}

📍 Region: ${newsItem.region}
⏱️ Published: ${newsItem.publishedAt}`,
    `3/5 Key Data Points:

1️⃣ ${newsItem.keyFacts && newsItem.keyFacts[0] ? newsItem.keyFacts[0] : newsItem.summary}
2️⃣ ${newsItem.keyFacts && newsItem.keyFacts[1] ? newsItem.keyFacts[1] : 'Sovereign infrastructure focus'}`,
    `4/5 💡 RAYU'S UNFILTERED TAKE:

"${newsItem.rayuTakeaway || newsItem.summary}"`,
    `5/5 Read the full deep dive, primary sources, and live stream analysis at:

🔗 https://rayu.com/news/${newsItem.id}

Follow @${INSTAGRAM_HANDLE} for daily updates.`,
  ];

  const handleCopySingleTweet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyEntireThread = () => {
    const fullThreadText = tweets.join('\n\n---\n\n');
    navigator.clipboard.writeText(fullThreadText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <div className="bg-[#050505] border border-white/10 p-6 rounded-sm text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase mb-1">
            <Sparkles size={14} />
            <span>TWITTER / X THREAD BUILDER</span>
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight">
            5-TWEET THREAD DECK
          </h3>
        </div>

        <button
          onClick={handleCopyEntireThread}
          className="cta-element btn-sweep inline-flex items-center gap-2 bg-[#CCFF00] text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded cursor-pointer"
        >
          {allCopied ? <Check size={14} /> : <Copy size={14} />}
          <span>{allCopied ? 'ENTIRE THREAD COPIED!' : 'COPY ENTIRE THREAD'}</span>
        </button>
      </div>

      <div className="space-y-4">
        {tweets.map((tweet, idx) => (
          <div key={idx} className="p-5 bg-[#090909] border border-white/10 rounded-sm relative">
            <div className="flex items-center justify-between text-xs font-mono mb-3">
              <span className="text-[#CCFF00] font-bold">TWEET {idx + 1}/5 ({tweet.length}/280 CHARS)</span>
              <button
                onClick={() => handleCopySingleTweet(tweet, idx)}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 hover:text-[#CCFF00] transition-colors cursor-pointer"
              >
                {copiedIndex === idx ? <Check size={12} className="text-[#CCFF00]" /> : <Copy size={12} />}
                <span>{copiedIndex === idx ? 'COPIED!' : 'COPY TWEET'}</span>
              </button>
            </div>
            <p className="font-mono text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap">
              {tweet}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
