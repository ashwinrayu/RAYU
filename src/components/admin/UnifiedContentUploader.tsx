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
  const bgImageInputRef = useRef<HTMLInputElement | null>(null);

  // Custom background image (uploaded by user, passed as sourceImage to Studio)
  const [customBgImage, setCustomBgImage] = useState<string | null>(null);
  const [customBgImageName, setCustomBgImageName] = useState<string>('');
  const [bgImageDragOver, setBgImageDragOver] = useState(false);

  const handleBgImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setCustomBgImageName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setCustomBgImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

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

  // Compress image to ~50KB JPEG for fast Vision AI processing
  const compressImageForVision = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
    });
  };

  // State for raw extraction error message
  const [extractionError, setExtractionError] = useState<string | null>(null);

  // Analyze image via browser Tesseract OCR + Groq Llama 3.3 70b with 20s hard timeout controller
  const analyzeImageContent = async (file: File, originalDataUrl: string) => {
    setIsAnalyzing(true);
    setExtractionError(null);
    setHeadline('⚡ AI EXTRACTING CONTENT FROM SCREENSHOT...');
    setNotice('⚡ Reading image text via OCR in browser (20s max)...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s hard timeout

    let extractedText = '';
    let worker: any = null;

    try {
      // Step 1: Run browser Tesseract OCR directly on file
      const { createWorker } = await import('tesseract.js');
      worker = await createWorker('eng');
      const ret = await worker.recognize(file);
      extractedText = ret.data.text ? ret.data.text.trim() : '';
      await worker.terminate();
      worker = null;
    } catch (ocrErr: any) {
      console.warn('[Browser OCR Error]:', ocrErr);
      if (worker) {
        try { await worker.terminate(); } catch {}
      }
    }

    try {
      // Step 2: Send extracted text to /api/analyze-image to synthesize structured JSON via Groq
      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extractedText: extractedText || file.name,
          filename: file.name,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.title) setHeadline(data.title);
        if (data.summary) setBodyText(data.summary);
        if (data.rayuTakeaway) setTakeaway(data.rayuTakeaway);
        if (data.category && ['TECH', 'WORLD', 'LIFE', 'LEARNINGS'].includes(data.category)) {
          setCategory(data.category as PostCategory);
        }
        setNotice(`✅ EXTRACTED SCREENSHOT CONTENT via ${data.providerUsed || 'AI Model'}`);
      } else {
        const errorMsg = data.error || `HTTP ${res.status} Extraction Failed`;
        setExtractionError(errorMsg);
        setHeadline('Extraction failed — enter headline manually');
        setNotice(`❌ Extraction Failed: ${errorMsg}`);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      const isTimeout = err.name === 'AbortError';
      const failureDetail = isTimeout
        ? 'Vision extraction request timed out after 20 seconds.'
        : `Network error: ${err.message || String(err)}`;

      setExtractionError(failureDetail);
      setHeadline('Extraction failed — enter headline manually');
      setNotice(`❌ Extraction Error: ${failureDetail}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExtractionError(null);
      setHeadline('⚡ AI EXTRACTING CONTENT FROM SCREENSHOT...');

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        analyzeImageContent(file, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Analyze link URL via /api/analyze-link
  const analyzeUrlContent = async (targetUrl: string) => {
    if (!targetUrl || !targetUrl.startsWith('http')) {
      setNotice('⚠️ Please enter a valid URL starting with http:// or https://');
      return;
    }
    setIsAnalyzing(true);
    setExtractionError(null);
    setHeadline('⚡ FETCHING & EXTRACTING ARTICLE CONTENT FROM LINK...');
    setNotice('⚡ Scraping webpage text & synthesizing headline (15s max)...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const res = await fetch('/api/analyze-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.title) setHeadline(data.title);
        if (data.summary) setBodyText(data.summary);
        if (data.rayuTakeaway) setTakeaway(data.rayuTakeaway);
        if (data.category && ['TECH', 'WORLD', 'LIFE', 'LEARNINGS'].includes(data.category)) {
          setCategory(data.category as PostCategory);
        }
        setNotice(`✅ EXTRACTED ARTICLE LINK CONTENT via ${data.providerUsed || 'Link Scraper'}`);
      } else {
        const errorMsg = data.error || `HTTP ${res.status} Link Extraction Failed`;
        setExtractionError(errorMsg);
        setHeadline('Extraction failed — enter headline manually');
        setNotice(`❌ Link Extraction Failed: ${errorMsg}`);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      const isTimeout = err.name === 'AbortError';
      const failureDetail = isTimeout
        ? 'Link extraction request timed out after 15 seconds.'
        : `Network error: ${err.message || String(err)}`;

      setExtractionError(failureDetail);
      setHeadline('Extraction failed — enter headline manually');
      setNotice(`❌ Link Extraction Error: ${failureDetail}`);
    } finally {
      setIsAnalyzing(false);
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
      sourceImage: customBgImage || imagePreview || undefined,
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
            <button
              type="button"
              onClick={() => setInputMode('TEXT')}
              className={`px-3 py-1 rounded font-bold transition-all cursor-pointer ${
                inputMode === 'TEXT' ? 'bg-[#CCFF00] text-black' : 'text-neutral-400'
              }`}
            >
              🖼️ UPLOAD BG
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
            {notice && (
              <div className={`mt-2 text-xs font-mono p-2 border rounded-sm ${
                extractionError ? 'bg-red-950/90 border-red-500 text-red-200 font-bold' : 'bg-[#CCFF00]/10 border-[#CCFF00]/30 text-[#CCFF00]'
              }`}>
                {notice}
              </div>
            )}
          </div>
        )}

        {inputMode === 'URL' && (
          <div className="p-4 bg-[#050505] border border-dashed border-white/20 rounded-sm space-y-3">
            <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-1">
              PASTE ARTICLE OR RESOURCE LINK URL TO EXTRACT CONTENT:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://domain.com/article..."
                className="flex-1 bg-[#0a0a0a] border border-white/20 focus:border-[#CCFF00] px-4 py-2.5 text-xs text-white rounded-sm outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => analyzeUrlContent(sourceUrl)}
                disabled={isAnalyzing}
                className="px-4 py-2.5 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase rounded-sm hover:bg-[#b5e600] transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles size={14} />
                <span>{isAnalyzing ? 'SCRAPING...' : '⚡ EXTRACT LINK CONTENT'}</span>
              </button>
            </div>
            {notice && (
              <div className={`text-xs font-mono p-2 border rounded-sm ${
                extractionError ? 'bg-red-950/90 border-red-500 text-red-200 font-bold' : 'bg-[#CCFF00]/10 border-[#CCFF00]/30 text-[#CCFF00]'
              }`}>
                {notice}
              </div>
            )}
          </div>
        )}

        {inputMode === 'TEXT' && (
          <div className="p-4 bg-[#050505] border border-dashed border-white/20 rounded-sm space-y-3">
            <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-1">
              UPLOAD CUSTOM BACKGROUND IMAGE FOR POST CARD:
            </label>
            {/* Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-sm transition-all cursor-pointer ${
                bgImageDragOver ? 'border-[#CCFF00] bg-[#CCFF00]/5' : 'border-white/20 hover:border-[#CCFF00]/50'
              } ${customBgImage ? 'p-2' : 'p-8'}`}
              onDragOver={(e) => { e.preventDefault(); setBgImageDragOver(true); }}
              onDragLeave={() => setBgImageDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setBgImageDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleBgImageFile(file);
              }}
              onClick={() => bgImageInputRef.current?.click()}
            >
              {customBgImage ? (
                <div className="flex items-center gap-3">
                  {/* Preview thumbnail */}
                  <img
                    src={customBgImage}
                    alt="Background preview"
                    className="w-16 h-16 object-cover rounded-sm border border-white/20 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono font-bold text-[#CCFF00] uppercase truncate">
                      ✅ {customBgImageName || 'IMAGE UPLOADED'}
                    </p>
                    <p className="text-[9px] font-mono text-neutral-500 mt-0.5">
                      This image will be used as the post card background
                    </p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setCustomBgImage(null); setCustomBgImageName(''); }}
                      className="mt-1.5 text-[9px] font-mono text-red-400 hover:text-red-300 uppercase tracking-wider"
                    >
                      × REMOVE IMAGE
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-center pointer-events-none">
                  <Upload size={24} className="text-neutral-600" />
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase">
                    DRAG & DROP OR CLICK TO UPLOAD
                  </span>
                  <span className="text-[9px] font-mono text-neutral-600">
                    PNG, JPG, WEBP — used as post card background art
                  </span>
                </div>
              )}
            </div>
            <input
              ref={bgImageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleBgImageFile(file);
              }}
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
