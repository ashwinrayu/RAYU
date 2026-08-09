'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check, Link as LinkIcon, FileText, Globe, Flame, Plus } from 'lucide-react';
import { OmniNewsItem } from '@/services/newsFetcher';

interface Props {
  onCustomNewsCreated: (item: OmniNewsItem) => void;
}

export const CustomNewsUploader: React.FC<Props> = ({ onCustomNewsCreated }) => {
  const [inputMode, setInputMode] = useState<'IMAGE' | 'URL' | 'TEXT'>('IMAGE');
  const [title, setTitle] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [rawTextContent, setRawTextContent] = useState('');
  const [category, setCategory] = useState<OmniNewsItem['category']>('VIRAL');
  const [region, setRegion] = useState<'INDIA' | 'GLOBAL'>('GLOBAL');
  const [summary, setSummary] = useState('');
  const [rayuTakeaway, setRayuTakeaway] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto-parse Link details when pasting URL
  const handleUrlBlur = () => {
    if (newsUrl.trim()) {
      try {
        const parsedUrl = new URL(newsUrl.trim());
        const host = parsedUrl.hostname.replace('www.', '');
        if (!title) {
          setTitle(`Breaking Report via ${host}`);
        }
      } catch {
        // Invalid URL ignore
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalTitle = title.trim();
    if (!finalTitle) {
      if (newsUrl) finalTitle = `News Link: ${newsUrl.slice(0, 40)}...`;
      else if (rawTextContent) finalTitle = rawTextContent.slice(0, 55) + '...';
      else finalTitle = 'Custom Creator News Entry';
    }

    let finalSummary = summary.trim();
    if (!finalSummary) {
      if (rawTextContent) finalSummary = rawTextContent;
      else if (newsUrl) finalSummary = `Imported article link from ${newsUrl}`;
      else finalSummary = finalTitle;
    }

    const newItem: OmniNewsItem = {
      id: `custom-${Date.now()}`,
      title: finalTitle,
      summary: finalSummary,
      fullArticleContent: rawTextContent || finalSummary,
      keyFacts: [
        `Category: ${category}`,
        newsUrl ? `Link Source: ${newsUrl}` : `Region: ${region}`,
        rayuTakeaway ? `Takeaway: ${rayuTakeaway}` : 'Custom Creator Entry',
      ],
      rayuTakeaway: rayuTakeaway.trim() || finalSummary || finalTitle,
      url: newsUrl.trim() || 'https://rayu-360.vercel.app',
      source: newsUrl ? 'EXTERNAL LINK' : 'RAYU CREATOR',
      category: category,
      region: region,
      dateGroup: 'TODAY',
      publishedAt: 'JUST NOW',
      readTime: '2 MIN READ',
      imageUrl: imagePreview || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      badgeColor: '#CCFF00',
    };

    onCustomNewsCreated(newItem);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="bg-[#090909] border border-[#CCFF00]/40 p-6 md:p-8 rounded-sm text-white mb-10 shadow-[0_0_30px_rgba(204,255,0,0.1)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase mb-1">
            <Sparkles size={16} />
            <span>CUSTOM CREATOR NEWS INPUT ENGINE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            UPLOAD SCREENSHOTS, PASTE LINKS, OR RAW CONTENT
          </h3>
        </div>

        {/* Input Mode Selector Tabs */}
        <div className="flex items-center gap-2 bg-[#050505] p-1 border border-white/15 rounded-sm text-xs font-mono">
          <button
            type="button"
            onClick={() => setInputMode('IMAGE')}
            className={`px-3 py-1.5 rounded-sm font-bold transition-all cursor-pointer ${
              inputMode === 'IMAGE' ? 'bg-[#CCFF00] text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            📸 SCREENSHOT
          </button>
          <button
            type="button"
            onClick={() => setInputMode('URL')}
            className={`px-3 py-1.5 rounded-sm font-bold transition-all cursor-pointer ${
              inputMode === 'URL' ? 'bg-[#CCFF00] text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🔗 URL LINK
          </button>
          <button
            type="button"
            onClick={() => setInputMode('TEXT')}
            className={`px-3 py-1.5 rounded-sm font-bold transition-all cursor-pointer ${
              inputMode === 'TEXT' ? 'bg-[#CCFF00] text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            📝 RAW TEXT
          </button>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Area Based on Selected Mode */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          {inputMode === 'IMAGE' && (
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-2">
                1. UPLOAD SCREENSHOT / IMAGE
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-square w-full bg-[#050505] border-2 border-dashed border-white/20 hover:border-[#CCFF00] rounded-sm p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors overflow-hidden group"
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-mono font-bold text-[#CCFF00]">
                      CLICK TO CHANGE IMAGE
                    </div>
                  </>
                ) : (
                  <>
                    <Upload size={36} className="text-neutral-500 mb-3 group-hover:text-[#CCFF00] group-hover:scale-110 transition-all" />
                    <span className="text-xs font-mono font-bold text-white uppercase mb-1">
                      DROP OR CLICK TO UPLOAD IMAGE
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      SUPPORTS PNG, JPG, WEBP NEWS SCREENSHOTS
                    </span>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          )}

          {inputMode === 'URL' && (
            <div className="space-y-4">
              <label className="block text-xs font-mono font-bold text-neutral-300 uppercase">
                1. PASTE ANY ARTICLE OR TWEET URL LINK
              </label>

              <div className="relative">
                <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCFF00]" />
                <input
                  type="url"
                  value={newsUrl}
                  onChange={(e) => setNewsUrl(e.target.value)}
                  onBlur={handleUrlBlur}
                  required
                  placeholder="https://techcrunch.com/... or https://x.com/..."
                  className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] pl-11 pr-4 py-3.5 text-xs font-mono text-white rounded-sm outline-none transition-colors"
                />
              </div>

              <div className="p-4 bg-[#050505] border border-white/10 rounded-sm text-xs font-mono text-neutral-400">
                <span className="text-[#CCFF00] font-bold block mb-1">⚡ LINK AUTO-PARSER</span>
                Pasting a link automatically formats website source telemetry into Instagram Studio card footers.
              </div>
            </div>
          )}

          {inputMode === 'TEXT' && (
            <div className="space-y-4">
              <label className="block text-xs font-mono font-bold text-neutral-300 uppercase">
                1. PASTE RAW NEWS TEXT / ARTICLE EXCERPT
              </label>

              <textarea
                value={rawTextContent}
                onChange={(e) => setRawTextContent(e.target.value)}
                required
                rows={7}
                placeholder="Paste news text, press releases, or raw notes here..."
                className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] p-4 text-xs font-mono text-white rounded-sm outline-none transition-colors"
              />
            </div>
          )}
        </div>

        {/* Right Details Form Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <label className="block text-xs font-mono font-bold text-neutral-300 uppercase">
            2. ENTER STORY HEADLINE & TAKEAWAY
          </label>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">NEWS TITLE / HEADLINE</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. GTA VI Vice City Map Size Details Leaked..."
              className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] p-3 text-xs font-mono text-white rounded-sm outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as OmniNewsItem['category'])}
                className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] p-3 text-xs font-mono text-white rounded-sm outline-none transition-colors"
              >
                <option value="VIRAL">🔥 VIRAL & GTA VI</option>
                <option value="HACKS">💡 TECH HACKS & DIY</option>
                <option value="INDIA">🇮🇳 IN INDIA</option>
                <option value="TECH">🤖 TECH & AI</option>
                <option value="WAR">⚡ WAR & GEOPOLITICS</option>
                <option value="POLITICS">🏛️ POLITICS & ECONOMY</option>
                <option value="MOVIES">🎬 MOVIES & SHOWS</option>
                <option value="GAMING">🎮 GAMING & ESPORTS</option>
                <option value="WEATHER">🌦️ WEATHER & CLIMATE</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">REGION</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as 'INDIA' | 'GLOBAL')}
                className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] p-3 text-xs font-mono text-white rounded-sm outline-none transition-colors"
              >
                <option value="GLOBAL">GLOBAL</option>
                <option value="INDIA">INDIA</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">STORY SUMMARY</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={2}
              placeholder="Brief news summary..."
              className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] p-3 text-xs font-mono text-white rounded-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">RAYU'S UNFILTERED TAKE (FOR QUOTE POSTS & REELS)</label>
            <input
              type="text"
              value={rayuTakeaway}
              onChange={(e) => setRayuTakeaway(e.target.value)}
              placeholder="e.g. Local hardware beats cloud moats every single time."
              className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] p-3 text-xs font-mono text-white rounded-sm outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="cta-element btn-sweep w-full bg-[#CCFF00] text-black font-extrabold text-xs font-mono uppercase tracking-wider py-4 rounded-sm hover:bg-[#b5e600] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)] cursor-pointer"
          >
            {isSuccess ? <Check size={16} /> : <Sparkles size={16} />}
            <span>{isSuccess ? 'CUSTOM STORY CREATED & AUTO-STYLED!' : 'AUTO-STYLE & LOAD INTO INSTAGRAM STUDIO 🚀'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
