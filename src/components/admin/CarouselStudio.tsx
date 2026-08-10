'use client';

import React, { useState, useRef } from 'react';
import { Download, Sparkles, Layers, ArrowRight, Plus, Trash2, Edit3, Check } from 'lucide-react';
import { OmniNewsItem } from '@/services/newsFetcher';
import { PostContent } from '@/types/postContent';
import { INSTAGRAM_HANDLE, WEBSITE_DOMAIN } from '@/data/instagram';
import { toPng } from 'html-to-image';

interface Props {
  newsItem?: OmniNewsItem;
  postContent?: PostContent;
}

interface SlideItem {
  id: number;
  slideType: 'COVER' | 'CONTENT' | 'CTA';
  headline: string;
  bodyText: string;
}

export const CarouselStudio: React.FC<Props> = ({ newsItem, postContent }) => {
  const itemTitle = postContent?.headline || newsItem?.title || 'UNTITLED POST';
  const itemCategory = postContent?.category || newsItem?.category || 'TECH';
  const itemSummary = postContent?.body || newsItem?.summary || '';
  const itemTakeaway = postContent?.rayuTakeaway || newsItem?.rayuTakeaway || itemSummary;
  const bgImage = postContent?.sourceImage || newsItem?.imageUrl || '';

  // Auto-split text into 4 logical slides
  const autoSlides: SlideItem[] = [
    {
      id: 1,
      slideType: 'COVER',
      headline: itemTitle,
      bodyText: itemTakeaway || 'SWIPE TO READ FULL BREAKDOWN →',
    },
    {
      id: 2,
      slideType: 'CONTENT',
      headline: '01 // THE CORE SHIFT',
      bodyText: itemSummary.slice(0, 180) || itemTitle,
    },
    {
      id: 3,
      slideType: 'CONTENT',
      headline: '02 // THE UNFILTERED TAKE',
      bodyText: itemTakeaway || itemSummary,
    },
    {
      id: 4,
      slideType: 'CTA',
      headline: 'FULL THOUGHTS & SOURCES LIVE AT RAYU',
      bodyText: `Follow @${INSTAGRAM_HANDLE} for daily tech takes, reflections, and macro shifts.\nLink in bio 👉 ${WEBSITE_DOMAIN}`,
    },
  ];

  const [slides, setSlides] = useState<SlideItem[]>(autoSlides);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);
  const slideRef = useRef<HTMLDivElement | null>(null);

  const activeSlide = slides[activeSlideIndex] || slides[0];

  const updateActiveSlideHeadline = (text: string) => {
    setSlides((prev) =>
      prev.map((s, idx) => (idx === activeSlideIndex ? { ...s, headline: text } : s))
    );
  };

  const updateActiveSlideBody = (text: string) => {
    setSlides((prev) =>
      prev.map((s, idx) => (idx === activeSlideIndex ? { ...s, bodyText: text } : s))
    );
  };

  const handleAddSlide = () => {
    if (slides.length >= 7) return;
    const newSlide: SlideItem = {
      id: Date.now(),
      slideType: 'CONTENT',
      headline: `0${slides.length} // KEY POINT`,
      bodyText: 'Enter supporting thoughts or key takeaway for this slide...',
    };
    setSlides((prev) => [...prev, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const handleRemoveSlide = (index: number) => {
    if (slides.length <= 2) return;
    setSlides((prev) => prev.filter((_, idx) => idx !== index));
    if (activeSlideIndex >= slides.length - 1) {
      setActiveSlideIndex(Math.max(0, slides.length - 2));
    }
  };

  const handleDownloadSingleSlide = async () => {
    if (!slideRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(slideRef.current, { quality: 1.0, pixelRatio: 2, cacheBust: false, skipFonts: true, fontEmbedCSS: '' });
      const link = document.createElement('a');
      link.download = `rayu-carousel-slide-${activeSlideIndex + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Slide export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAllSlides = async () => {
    if (!slideRef.current) return;
    setIsExporting(true);
    try {
      for (let i = 0; i < slides.length; i++) {
        setActiveSlideIndex(i);
        // Wait for slide to re-render in DOM
        await new Promise((r) => setTimeout(r, 400));
        const dataUrl = await toPng(slideRef.current, { quality: 1.0, pixelRatio: 2, cacheBust: false, skipFonts: true, fontEmbedCSS: '' });
        const link = document.createElement('a');
        link.download = `rayu-carousel-slide-${i + 1}-of-${slides.length}.png`;
        link.href = dataUrl;
        link.click();
        await new Promise((r) => setTimeout(r, 200));
      }
    } catch (err) {
      console.error('Batch export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-[#050505] border border-white/10 p-5 sm:p-7 rounded-sm text-white space-y-6">
      {/* Slide Navigation Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#090909] border border-[#CCFF00]/30 rounded-sm shadow-[0_0_15px_rgba(204,255,0,0.1)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase mb-1">
            <Layers size={15} />
            <span>MULTI-SLIDE CAROUSEL GENERATOR ({slides.length} SLIDES)</span>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            SLIDE {activeSlideIndex + 1} OF {slides.length} ACTIVE
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlideIndex(idx)}
              className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
                activeSlideIndex === idx
                  ? 'bg-[#CCFF00] text-black border border-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                  : 'bg-black border border-white/15 text-neutral-300 hover:text-white'
              }`}
            >
              0{idx + 1}
            </button>
          ))}

          {slides.length < 7 && (
            <button
              onClick={handleAddSlide}
              className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded font-mono text-xs text-white uppercase flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} />
              <span>ADD SLIDE</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Grid: Left Canvas Preview, Right Slide Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Slide Canvas Preview */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            ref={slideRef}
            className="relative aspect-[4/5] w-full max-w-[440px] bg-[#050505] border border-white/20 rounded-sm p-7 flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            {/* Background Image Layer */}
            {bgImage && (
              <img
                src={bgImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
              />
            )}

            {/* Header branding */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-3">
              <div className="text-2xl font-black text-white tracking-tight">
                RAY<span className="text-[#CCFF00]">U.</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-[#CCFF00] text-black rounded uppercase">
                [{itemCategory} • SLIDE 0{activeSlideIndex + 1}/0{slides.length}]
              </span>
            </div>

            {/* Slide Body */}
            <div className="relative z-10 my-auto py-4 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-snug text-white">
                {activeSlide.headline}
              </h2>
              <p className="text-xs font-mono text-neutral-200 leading-relaxed whitespace-pre-line">
                {activeSlide.bodyText}
              </p>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/15 text-[10px] font-mono text-neutral-400">
              <span className="text-[#CCFF00] font-bold">@{INSTAGRAM_HANDLE}</span>
              <span className="flex items-center gap-1">
                <span>SWIPE</span>
                <ArrowRight size={10} className="text-[#CCFF00]" />
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 w-full max-w-[440px]">
            <button
              onClick={handleDownloadSingleSlide}
              disabled={isExporting}
              className="flex-1 py-2.5 bg-white/10 border border-white/20 hover:border-[#CCFF00] text-white text-xs font-mono font-bold uppercase rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download size={14} />
              <span>EXPORT SLIDE 0{activeSlideIndex + 1} PNG</span>
            </button>

            <button
              onClick={handleExportAllSlides}
              disabled={isExporting}
              className="flex-1 py-2.5 bg-[#CCFF00] text-black hover:bg-[#b5e600] text-xs font-mono font-bold uppercase rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-[0_0_15px_rgba(204,255,0,0.3)]"
            >
              <Download size={14} />
              <span>{isExporting ? 'EXPORTING...' : `EXPORT ALL ${slides.length} SLIDES 🚀`}</span>
            </button>
          </div>
        </div>

        {/* Right Manual Slide Editor */}
        <div className="lg:col-span-6 bg-[#090909] border border-white/15 p-5 rounded-sm space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase flex items-center gap-1.5">
              <Edit3 size={14} />
              <span>EDIT SLIDE 0{activeSlideIndex + 1} TEXT CONTENT:</span>
            </span>

            {slides.length > 2 && (
              <button
                onClick={() => handleRemoveSlide(activeSlideIndex)}
                className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer uppercase"
              >
                <Trash2 size={13} />
                <span>DELETE SLIDE</span>
              </button>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-neutral-400 uppercase mb-1">
              SLIDE HEADLINE:
            </label>
            <input
              type="text"
              value={activeSlide.headline}
              onChange={(e) => updateActiveSlideHeadline(e.target.value)}
              className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] px-3 py-2 text-xs font-bold text-white rounded-sm outline-none font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-neutral-400 uppercase mb-1">
              SLIDE BODY TEXT:
            </label>
            <textarea
              rows={5}
              value={activeSlide.bodyText}
              onChange={(e) => updateActiveSlideBody(e.target.value)}
              className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] px-3 py-2.5 text-xs text-neutral-200 rounded-sm outline-none font-mono resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
