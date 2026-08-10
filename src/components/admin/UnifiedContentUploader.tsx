'use client';

import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Link as LinkIcon, FileText, Plus, Radio, Layers, Lightbulb, MessageSquare, Zap, Target } from 'lucide-react';
import { PostContent, ContentType, PostCategory, LayoutVariant, AspectRatio } from '@/types/postContent';

interface Props {
  onPostContentCreated: (item: PostContent) => void;
}

export const UnifiedContentUploader: React.FC<Props> = ({ onPostContentCreated }) => {
  const [inputMode, setInputMode] = useState<'FREEFORM' | 'IMAGE' | 'URL' | 'TEXT'>('FREEFORM');
  const [contentType, setContentType] = useState<ContentType>('TAKE');
  const [category, setCategory] = useState<PostCategory>('TECH');
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>('HEADLINE_DOMINANT');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  
  const [headline, setHeadline] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [takeaway, setTakeaway] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Helper to format clean headline from uploaded image filename
  const formatHeadlineFromFilename = (filename: string): string => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const cleanName = nameWithoutExt
      .replace(/[_-]+/g, ' ')
      .replace(/ChatGPT Image/i, 'CHATGPT AI RESPONSE ANALYSIS')
      .replace(/Screenshot/i, 'SCREENSHOT CONTENT')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanName.length > 5) {
      return cleanName.toUpperCase().slice(0, 70);
    }
    return 'UPLOADED IMAGE GRAPHIC CONCEPT';
  };

  // Analyze image via Groq Vision API & OCR with 10s timeout controller
  const analyzeImageContent = async (base64: string, filename?: string) => {
    setIsAnalyzing(true);
    setNotice('⚡ Groq Vision Reading Image Text & Visual Content...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, filename }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.title) {
          setHeadline(data.title);
          if (data.summary) setBodyText(data.summary);
          if (data.rayuTakeaway) setTakeaway(data.rayuTakeaway);
          setNotice(`✅ VISION AI EXTRACTED TITLE: "${data.title}"`);
          return;
        }
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn('Vision analysis timeout/error:', err);
    } finally {
      setIsAnalyzing(false);
    }

    // Fallback notice
    setNotice('✅ Image loaded! Style directly into Studio below.');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Instantly format a clean headline from the filename so it is NEVER blank or stuck
      const instantTitle = formatHeadlineFromFilename(file.name);
      setHeadline(instantTitle);
      if (!takeaway) setTakeaway(`Content identified from uploaded image (${file.name}).`);

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        analyzeImageContent(dataUrl, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // 1-Click Preset Examples
  const applyPresetTake = () => {
    setInputMode('FREEFORM');
    setContentType('TAKE');
    setCategory('TECH');
    setLayoutVariant('HEADLINE_DOMINANT');
    setHeadline('THE FUTURE OF SOFTWARE IS INTENTIONALITY, NOT JUST SYNTAX GENERATION');
    setBodyText('As AI lowers the cost of writing code to zero, the rarest skill becomes knowing what to build and why.');
    setTakeaway('Leverage compounds for those who control direction over execution.');
  };

  const applyPresetReflection = () => {
    setInputMode('FREEFORM');
    setContentType('REFLECTION');
    setCategory('LIFE');
    setLayoutVariant('QUOTE_STATEMENT');
    setHeadline('GREAT WORK REQUIRES LONG PERIODS OF UNINTERRUPTED OBSESSION');
    setBodyText('Shallow execution creates noise. Deep focus creates breakthroughs.');
    setTakeaway('Protect your uninterrupted focus hours fiercely.');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalHeadline = headline.trim();
    if (!finalHeadline) {
      if (sourceUrl) finalHeadline = `LINK TAKE: ${sourceUrl.replace(/https?:\/\//, '').slice(0, 40).toUpperCase()}`;
      else if (bodyText) finalHeadline = bodyText.slice(0, 50).toUpperCase() + '...';
      else if (imagePreview) finalHeadline = 'IDENTIFIED VISUAL CONCEPT';
      else finalHeadline = 'CREATOR GENERAL POST';
    }

    const newItem: PostContent = {
      id: `v2-post-${Date.now()}`,
      contentType,
      category,
      layoutVariant,
      aspectRatio,
      headline: finalHeadline,
      body: bodyText.trim(),
      rayuTakeaway: takeaway.trim() || bodyText.slice(0, 100) || finalHeadline,
      sourceUrl: sourceUrl.trim(),
      sourceImage: imagePreview || undefined,
      publishedAt: 'JUST NOW',
    };

    onPostContentCreated(newItem);
    setNotice('✅ Loaded into RAYU V2 Studio!');
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="bg-[#090909] border border-[#CCFF00]/40 p-5 md:p-7 rounded-sm text-white mb-8 shadow-[0_0_25px_rgba(204,255,0,0.1)]">
      {/* Top Title & Preset Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase mb-1">
            <Sparkles size={15} />
            <span>RAYU V2 GENERAL CONTENT STUDIO • AGNOSTIC INPUT MODEL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            CREATE ANY POST (TAKE, REFLECTION, LIST, REACTION, THOUGHT)
          </h3>
        </div>

        {/* 1-Click Quick Presets */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={applyPresetTake}
            className="px-3 py-1.5 bg-white/10 hover:bg-[#CCFF00] hover:text-black font-mono text-xs font-bold uppercase rounded-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Zap size={13} />
            <span>⚡ TECH TAKE PRESET</span>
          </button>
          <button
            type="button"
            onClick={applyPresetReflection}
            className="px-3 py-1.5 bg-white/10 hover:bg-[#CCFF00] hover:text-black font-mono text-xs font-bold uppercase rounded-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Lightbulb size={13} />
            <span>💡 LIFE REFLECTION PRESET</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Row 1: Content Type, Category, Layout Variant, Aspect Ratio */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[10px] font-mono font-bold text-neutral-400 uppercase mb-1">
              CONTENT TYPE:
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value as ContentType)}
              className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] px-3 py-2 text-xs font-mono font-bold text-white rounded-sm outline-none"
            >
              <option value="TAKE">⚡ TAKE (OPINION / POINT)</option>
              <option value="REFLECTION">💡 REFLECTION (INSIGHT)</option>
              <option value="LIST">📋 LIST (BREAKDOWN)</option>
              <option value="REACTION">🔥 REACTION (REPLY)</option>
              <option value="THOUGHT">💭 THOUGHT (RANDOM)</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-mono font-bold text-neutral-400 uppercase mb-1">
              CATEGORY TAXONOMY:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PostCategory)}
              className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] px-3 py-2 text-xs font-mono font-bold text-white rounded-sm outline-none"
            >
              <option value="TECH">💻 TECH (SOFTWARE / AI)</option>
              <option value="WORLD">🌐 WORLD (MACRO / SHIFTS)</option>
              <option value="LIFE">🌿 LIFE (CREATOR / MINDSET)</option>
              <option value="LEARNINGS">🧠 LEARNINGS (LESSONS)</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-mono font-bold text-neutral-400 uppercase mb-1">
              LAYOUT VARIANT:
            </label>
            <select
              value={layoutVariant}
              onChange={(e) => setLayoutVariant(e.target.value as LayoutVariant)}
              className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] px-3 py-2 text-xs font-mono font-bold text-white rounded-sm outline-none"
            >
              <option value="HEADLINE_DOMINANT">🎯 HEADLINE DOMINANT</option>
              <option value="QUOTE_STATEMENT">💬 QUOTE / STATEMENT</option>
              <option value="DATA_LED">📊 DATA LED</option>
              <option value="SPLIT">📑 SPLIT TEXT & ESSAY</option>
              <option value="LIST_BREAKDOWN">📌 LIST BREAKDOWN</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-mono font-bold text-neutral-400 uppercase mb-1">
              ASPECT RATIO:
            </label>
            <div className="grid grid-cols-2 gap-1 bg-[#050505] p-1 border border-white/20 rounded-sm">
              <button
                type="button"
                onClick={() => setAspectRatio('1:1')}
                className={`py-1 text-[10px] font-mono font-bold uppercase rounded ${
                  aspectRatio === '1:1' ? 'bg-[#CCFF00] text-black' : 'text-neutral-400'
                }`}
              >
                1:1 (SQUARE)
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('4:5')}
                className={`py-1 text-[10px] font-mono font-bold uppercase rounded ${
                  aspectRatio === '4:5' ? 'bg-[#CCFF00] text-black' : 'text-neutral-400'
                }`}
              >
                4:5 (PORTRAIT)
              </button>
            </div>
          </div>
        </div>

        {/* Input Mode Selector */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">
            INPUT METHOD:
          </span>
          <div className="flex items-center gap-1 bg-[#050505] p-1 border border-white/20 rounded-sm text-xs font-mono">
            <button
              type="button"
              onClick={() => setInputMode('FREEFORM')}
              className={`px-3 py-1 rounded font-bold transition-all cursor-pointer ${
                inputMode === 'FREEFORM' ? 'bg-[#CCFF00] text-black' : 'text-neutral-400'
              }`}
            >
              ✍️ FREEFORM
            </button>
            <button
              type="button"
              onClick={() => setInputMode('IMAGE')}
              className={`px-3 py-1 rounded font-bold transition-all cursor-pointer ${
                inputMode === 'IMAGE' ? 'bg-[#CCFF00] text-black' : 'text-neutral-400'
              }`}
            >
              📸 SCREENSHOT OCR
            </button>
            <button
              type="button"
              onClick={() => setInputMode('URL')}
              className={`px-3 py-1 rounded font-bold transition-all cursor-pointer ${
                inputMode === 'URL' ? 'bg-[#CCFF00] text-black' : 'text-neutral-400'
              }`}
            >
              🔗 LINK URL
            </button>
          </div>
        </div>

        {/* Input Fields */}
        {inputMode === 'IMAGE' && (
          <div className="p-4 bg-[#050505] border border-dashed border-white/20 rounded-sm">
            <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-2">
              UPLOAD SCREENSHOT / IMAGE TO EXTRACT TEXT:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-xs font-mono text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-mono file:font-bold file:bg-[#CCFF00] file:text-black hover:file:bg-[#b5e600] cursor-pointer"
            />
            {notice && <div className="mt-2 text-xs font-mono text-[#CCFF00]">{notice}</div>}
          </div>
        )}

        {inputMode === 'URL' && (
          <div>
            <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-1">
              PASTE ARTICLE OR RESOURCE LINK URL:
            </label>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://domain.com/article..."
              className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] px-4 py-2.5 text-xs text-white rounded-sm outline-none font-mono"
            />
          </div>
        )}

        {/* Headline & Body Text Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-1">
              HEADLINE / TITLE (AUTO-FILLED BY OCR OR CUSTOM):
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. THE REAL SHIFT IN TECH IS NOT CODE GENERATION BUT DIRECTION"
              className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] px-4 py-3 text-xs font-bold text-white rounded-sm outline-none font-mono uppercase"
            />
          </div>

          <div className="md:col-span-6">
            <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-1">
              EDITORIAL TAKEAWAY / INSIGHT:
            </label>
            <input
              type="text"
              value={takeaway}
              onChange={(e) => setTakeaway(e.target.value)}
              placeholder="e.g. Leverage compounds for those who control direction."
              className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] px-4 py-3 text-xs text-neutral-200 rounded-sm outline-none font-mono"
            />
          </div>

          <div className="md:col-span-12">
            <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-1">
              SUPPORTING BODY / PARAGRAPH / LIST CONTENT (OPTIONAL):
            </label>
            <textarea
              rows={3}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder="Enter supporting thoughts, bullet points, or paragraph text..."
              className="w-full bg-[#050505] border border-white/20 focus:border-[#CCFF00] px-4 py-3 text-xs text-neutral-200 rounded-sm outline-none font-mono resize-y"
            />
          </div>
        </div>

        <button
          type="submit"
          className="cta-element btn-sweep w-full bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-wider py-3.5 rounded-sm hover:bg-[#b5e600] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)]"
        >
          <Sparkles size={16} />
          <span>LOAD POST INTO RAYU V2 STUDIO STUDIO 🚀</span>
        </button>
      </form>
    </div>
  );
};
