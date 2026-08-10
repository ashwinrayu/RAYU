'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check, Link as LinkIcon, FileText, Globe, Flame, Plus, Radio } from 'lucide-react';
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
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [analysisNotice, setAnalysisNotice] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const analyzeUploadedImage = async (dataUrl: string) => {
    setIsAnalyzingImage(true);
    setAnalysisNotice('AI Reading & Analyzing Image Content via OCR...');
    try {
      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: dataUrl }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (data.title) setTitle(data.title);
          if (data.summary) setSummary(data.summary);
          if (data.rayuTakeaway) setRayuTakeaway(data.rayuTakeaway);
          if (data.category) setCategory(data.category);
          setAnalysisNotice(`✅ AI IDENTIFIED CONTENT: "${data.title}"`);
        } else {
          setAnalysisNotice(`💡 Uploaded image loaded. ${data.error || ''}`);
        }
      }
    } catch (err: any) {
      console.error('Image analysis error:', err);
      setAnalysisNotice('💡 Image loaded. Enter headline above or auto-style into Studio.');
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        analyzeUploadedImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // 1-Click Import from Rockstar Games Newswire
  const handleImportRockstarNewswire = () => {
    setInputMode('URL');
    setNewsUrl('https://www.rockstargames.com/newswire');
    setTitle('ROCKSTAR NEWSWIRE: GTA VI VICE CITY BULLETIN & TELEMETRY');
    setCategory('VIRAL');
    setRegion('GLOBAL');
    setSummary('Official Grand Theft Auto VI Vice City bulletin released via Rockstar Games Newswire confirming Leonida state telemetry.');
    setRayuTakeaway('Rockstar Newswire has confirmed Leonida map scale and physics mechanics.');
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
      url: newsUrl.trim() || 'https://www.rockstargames.com/newswire',
      source: newsUrl.includes('rockstargames.com') ? 'Rockstar Games Newswire' : 'EXTERNAL LINK',
      category: category,
      region: region,
      dateGroup: 'TODAY',
      publishedAt: 'JUST NOW',
      readTime: '2 MIN READ',
      imageUrl: imagePreview || '/images/gta_vice_city.png',
      badgeColor: '#FF00AA',
    };

    onCustomNewsCreated(newItem);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="bg-[#090909] border border-[#CCFF00]/40 p-6 md:p-8 rounded-sm text-white mb-10 shadow-[0_0_30px_rgba(204,255,0,0.1)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase mb-1">
            <Sparkles size={16} />
            <span>CUSTOM CREATOR NEWS INPUT ENGINE • ROCKSTAR NEWSWIRE INTEGRATED</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            UPLOAD SCREENSHOTS, PASTE LINKS, OR IMPORT ROCKSTAR NEWSWIRE
          </h3>
        </div>

        {/* Input Mode Selector Tabs & Rockstar Shortcut */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleImportRockstarNewswire}
            className="px-3.5 py-2 bg-[#FF00AA] text-white font-mono text-xs font-black uppercase rounded-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,0,170,0.4)] cursor-pointer flex items-center gap-1.5"
          >
            <Radio size={14} />
            <span>🌐 ROCKSTAR NEWSWIRE</span>
          </button>

          <div className="flex items-center gap-1 bg-[#050505] p-1 border border-white/15 rounded-sm text-xs font-mono">
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

              {/* AI Image Analysis Status Notice */}
              {analysisNotice && (
                <div className={`mt-3 p-2.5 rounded-sm border text-[11px] font-mono flex items-center justify-between gap-2 ${
                  isAnalyzingImage
                    ? 'bg-[#CCFF00]/10 border-[#CCFF00]/40 text-[#CCFF00] animate-pulse'
                    : 'bg-[#050505] border-white/20 text-neutral-200'
                }`}>
                  <span className="truncate">{analysisNotice}</span>
                  {imagePreview && !isAnalyzingImage && (
                    <button
                      type="button"
                      onClick={() => analyzeUploadedImage(imagePreview)}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] uppercase rounded shrink-0 transition-colors"
                    >
                      RE-ANALYZE
                    </button>
                  )}
                </div>
              )}
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
                  required
                  placeholder="https://www.rockstargames.com/newswire or https://x.com/..."
                  className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] pl-11 pr-4 py-3.5 text-xs font-mono text-white rounded-sm outline-none transition-colors"
                />
              </div>

              <div className="p-4 bg-[#050505] border border-white/10 rounded-sm text-xs font-mono text-neutral-400">
                <span className="text-[#CCFF00] font-bold block mb-1">🌐 ROCKSTAR NEWSWIRE INTEGRATED</span>
                Links from rockstargames.com/newswire are formatted with official Rockstar Games source credentials.
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
              placeholder="e.g. Rockstar Newswire: GTA VI Vice City Map Scale..."
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
              placeholder="e.g. Rockstar Newswire confirms GTA VI will break all sales records."
              className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] p-3 text-xs font-mono text-white rounded-sm outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="cta-element btn-sweep w-full bg-[#CCFF00] text-black font-extrabold text-xs font-mono uppercase tracking-wider py-4 rounded-sm hover:bg-[#b5e600] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)] cursor-pointer"
          >
            {isSuccess ? <Check size={16} /> : <Sparkles size={16} />}
            <span>{isSuccess ? 'STORY IMPORTED & AUTO-STYLED!' : 'AUTO-STYLE & LOAD INTO INSTAGRAM STUDIO 🚀'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
