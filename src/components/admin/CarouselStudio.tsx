'use client';

import React, { useState, useRef } from 'react';
import { Download, Sparkles, ChevronRight, ChevronLeft, Check, Layers, Quote, ArrowRight } from 'lucide-react';
import { OmniNewsItem } from '@/services/newsFetcher';
import { INSTAGRAM_HANDLE } from '@/data/instagram';
import { toPng } from 'html-to-image';

interface Props {
  newsItem: OmniNewsItem;
}

export const CarouselStudio: React.FC<Props> = ({ newsItem }) => {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [downloading, setDownloading] = useState(false);
  const slideRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadSingleSlide = async () => {
    if (!slideRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(slideRef.current, { quality: 1.0, pixelRatio: 3, cacheBust: true });
      const link = document.createElement('a');
      link.download = `rayu-carousel-slide-${activeSlide}-${newsItem.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Slide export failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-[#050505] border border-white/10 p-6 rounded-sm text-white">
      {/* Slide Navigation Tabs (1 to 5) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 p-4 bg-[#090909] border border-white/10 rounded-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase mb-1">
            <Layers size={14} />
            <span>1080x1080 5-SLIDE INSTAGRAM CAROUSEL DECK</span>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            SLIDE {activeSlide} OF 5 SELECTED FOR EXPORT
          </span>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setActiveSlide(num)}
              className={`px-3 py-2 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
                activeSlide === num
                  ? 'bg-[#CCFF00] text-black border border-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                  : 'bg-black border border-white/15 text-neutral-300 hover:text-white'
              }`}
            >
              SLIDE 0{num}
            </button>
          ))}

          <button
            onClick={handleDownloadSingleSlide}
            disabled={downloading}
            className="ml-2 inline-flex items-center gap-2 text-xs font-mono font-bold bg-[#0B0B0B] border border-white/20 text-[#CCFF00] hover:border-[#CCFF00] px-4 py-2 rounded transition-colors uppercase cursor-pointer"
          >
            <Download size={14} />
            <span>{downloading ? 'EXPORTING...' : `EXPORT SLIDE 0${activeSlide}`}</span>
          </button>
        </div>
      </div>

      {/* Slide Preview Canvas Container */}
      <div className="flex flex-col items-center">
        <div
          ref={slideRef}
          className="relative aspect-square w-full max-w-[480px] bg-[#050505] border border-white/20 rounded-sm p-8 flex flex-col justify-between overflow-hidden shadow-2xl"
        >
          {/* Background Image Layer */}
          {newsItem.imageUrl && (
            <img
              src={newsItem.imageUrl}
              alt={newsItem.title}
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            />
          )}

          {/* SLIDE 1: COVER HEADLINE */}
          {activeSlide === 1 && (
            <>
              <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-4">
                <div className="text-3xl font-black text-white">RAY<span className="text-[#CCFF00]">U.</span></div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-[#CCFF00] text-black rounded uppercase">
                  [{newsItem.category} • SLIDE 01/05]
                </span>
              </div>
              <div className="relative z-10 my-auto py-6">
                <span className="text-xs font-mono text-[#CCFF00] uppercase block mb-3 font-bold">
                  ● CAROUSEL COVER STORY • {newsItem.region}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase mb-4">
                  {newsItem.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed line-clamp-4">
                  {newsItem.summary}
                </p>
              </div>
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-[#CCFF00] font-bold">SWIPE RIGHT FOR FACTS 👉</span>
                <span>@THISISRAYU</span>
              </div>
            </>
          )}

          {/* SLIDE 2: KEY FACTS PART 1 */}
          {activeSlide === 2 && (
            <>
              <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase">KEY FACTS ANALYSIS</span>
                <span className="text-xs font-mono text-neutral-400">SLIDE 02/05</span>
              </div>
              <div className="relative z-10 my-auto py-4 space-y-4">
                <h4 className="text-lg font-bold text-white uppercase border-l-2 border-[#CCFF00] pl-3">
                  PRIMARY FACT BREAKDOWN
                </h4>
                {newsItem.keyFacts && newsItem.keyFacts.length > 0 ? (
                  <div className="space-y-3">
                    {newsItem.keyFacts.slice(0, 2).map((fact, i) => (
                      <div key={i} className="p-4 bg-neutral-900/80 border border-white/10 rounded text-xs font-mono text-neutral-200">
                        <span className="text-[#CCFF00] font-bold block mb-1">FACT 0{i + 1}</span>
                        {fact}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-neutral-300">{newsItem.summary}</p>
                )}
              </div>
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>CONTINUE SWIPING 👉</span>
                <span>@THISISRAYU</span>
              </div>
            </>
          )}

          {/* SLIDE 3: KEY FACTS PART 2 & CONTEXT */}
          {activeSlide === 3 && (
            <>
              <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase">CONTEXT & DEEP DIVE</span>
                <span className="text-xs font-mono text-neutral-400">SLIDE 03/05</span>
              </div>
              <div className="relative z-10 my-auto py-4 space-y-4">
                <div className="p-4 bg-neutral-900/80 border border-white/10 rounded text-xs font-mono text-neutral-200">
                  <span className="text-[#CCFF00] font-bold block mb-1">FACT 03</span>
                  {newsItem.keyFacts && newsItem.keyFacts[2] ? newsItem.keyFacts[2] : newsItem.summary}
                </div>
                <div className="p-4 bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded text-xs font-mono text-white">
                  <span className="text-[#CCFF00] font-bold block mb-1">STRATEGIC IMPACT</span>
                  Reported by {newsItem.source} in {newsItem.region} region. Published {newsItem.publishedAt}.
                </div>
              </div>
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>SWIPE FOR UNFILTERED TAKE 👉</span>
                <span>@THISISRAYU</span>
              </div>
            </>
          )}

          {/* SLIDE 4: UNFILTERED TAKEAWAY */}
          {activeSlide === 4 && (
            <>
              <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase">RAYU'S UNFILTERED TAKE</span>
                <span className="text-xs font-mono text-neutral-400">SLIDE 04/05</span>
              </div>
              <div className="relative z-10 my-auto py-6 text-center">
                <Quote size={36} className="text-[#CCFF00] mx-auto mb-4 opacity-70" />
                <p className="text-lg sm:text-xl font-bold text-white leading-relaxed italic mb-4">
                  "{newsItem.rayuTakeaway || newsItem.summary}"
                </p>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">— RAYU EDITORIAL</span>
              </div>
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>FINAL SLIDE 👉</span>
                <span>@THISISRAYU</span>
              </div>
            </>
          )}

          {/* SLIDE 5: OUTRO & CALL TO ACTION */}
          {activeSlide === 5 && (
            <>
              <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-4">
                <div className="text-3xl font-black text-white">RAY<span className="text-[#CCFF00]">U.</span></div>
                <span className="text-xs font-mono text-neutral-400">SLIDE 05/05</span>
              </div>
              <div className="relative z-10 my-auto text-center py-6">
                <h3 className="text-2xl font-black text-white uppercase mb-4">
                  THINKING AS IT HAPPENS.
                </h3>
                <p className="text-xs font-mono text-neutral-300 mb-6 max-w-xs mx-auto leading-relaxed">
                  Join the independent unfiltered stream on tech, world shifts, life, and sovereign ideas.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#CCFF00] text-black font-black text-xs font-mono uppercase rounded shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                  <span>FOLLOW @THISISRAYU</span>
                  <ArrowRight size={14} />
                </div>
              </div>
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-[#CCFF00]">RAYU-360.VERCEL.APP</span>
                <span>INSTAGRAM FEED</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
