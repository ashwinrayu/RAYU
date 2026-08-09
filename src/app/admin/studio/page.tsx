'use client';

import React, { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { InstagramPostStudio } from '@/components/admin/InstagramPostStudio';
import { OMNI_NEWS_DATA, OmniNewsItem } from '@/services/newsFetcher';
import { ARTICLES_DATA } from '@/data/articles';
import { THOUGHTS_DATA } from '@/data/thoughts';
import { RESOURCES_DATA } from '@/data/resources';
import { Sparkles, LogOut, CheckCircle2, Lock, Mail, ArrowRight, ShieldCheck, Newspaper, MessageSquare, Wrench, Radio } from 'lucide-react';
import { INSTAGRAM_HANDLE } from '@/data/instagram';

type ContentSourceType = 'NEWS' | 'ARTICLES' | 'THOUGHTS' | 'RESOURCES';

export default function AdminStudioPage() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const [activeSource, setActiveSource] = useState<ContentSourceType>('NEWS');
  const [selectedStory, setSelectedStory] = useState<OmniNewsItem>(OMNI_NEWS_DATA[0]);

  // Production login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleStudioLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    login(email || 'thisisrayu@gmail.com', password || 'rayu2026');
  };

  // Convert Articles to OmniNewsItem format for Instagram Studio
  const articleItems: OmniNewsItem[] = useMemo(() => {
    return ARTICLES_DATA.map((art) => ({
      id: `art-${art.id}`,
      title: art.title,
      summary: art.excerpt,
      fullArticleContent: art.content,
      keyFacts: art.tags.map((t) => `Core Topic Tag: ${t}`),
      rayuTakeaway: art.subtitle || art.excerpt,
      url: `https://rayu.com/articles/${art.slug}`,
      source: 'RAYU ESSAYS',
      category: 'TECH',
      region: 'GLOBAL',
      dateGroup: 'TODAY',
      publishedAt: art.date,
      readTime: art.readTime,
      imageUrl: art.imageUrl,
      badgeColor: '#CCFF00',
    }));
  }, []);

  // Convert Thoughts to OmniNewsItem format for Instagram Studio
  const thoughtItems: OmniNewsItem[] = useMemo(() => {
    return THOUGHTS_DATA.map((th) => ({
      id: `th-${th.id}`,
      title: th.content.slice(0, 75) + '...',
      summary: th.content,
      fullArticleContent: th.content,
      keyFacts: [th.highlightText || 'Unfiltered Real-Time Thought'],
      rayuTakeaway: th.content,
      url: 'https://rayu.com/thoughts',
      source: 'RAYU THOUGHTS',
      category: 'INDIA',
      region: 'INDIA',
      dateGroup: 'TODAY',
      publishedAt: th.date,
      readTime: th.timestamp,
      badgeColor: '#CCFF00',
    }));
  }, []);

  // Convert Resources to OmniNewsItem format for Instagram Studio
  const resourceItems: OmniNewsItem[] = useMemo(() => {
    return RESOURCES_DATA.map((res) => ({
      id: `res-${res.id}`,
      title: `${res.title} — ${res.category}`,
      summary: res.description,
      fullArticleContent: res.description,
      keyFacts: [`Category: ${res.category}`, `Direct Link: ${res.url}`],
      rayuTakeaway: res.description,
      url: res.url,
      source: 'RAYU RESOURCES',
      category: 'TECH',
      region: 'GLOBAL',
      dateGroup: 'TODAY',
      publishedAt: 'CURATED TOOL',
      readTime: 'RESOURCE',
      badgeColor: '#00F0FF',
    }));
  }, []);

  const currentItemsList = useMemo(() => {
    switch (activeSource) {
      case 'NEWS':
        return OMNI_NEWS_DATA;
      case 'ARTICLES':
        return articleItems;
      case 'THOUGHTS':
        return thoughtItems;
      case 'RESOURCES':
        return resourceItems;
      default:
        return OMNI_NEWS_DATA;
    }
  }, [activeSource, articleItems, thoughtItems, resourceItems]);

  // Protected Access Gate if not logged in
  if (!isLoggedIn) {
    return (
      <div className="bg-[#050505] text-white pt-36 pb-24 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/40 flex items-center justify-center mx-auto mb-6 text-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.2)]">
            <Lock size={28} />
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tight mb-8">
            CREATOR ACCESS <span className="text-[#CCFF00]">REQUIRED</span>
          </h1>

          <div className="bg-[#0B0B0B] border border-white/10 p-8 rounded-sm text-left shadow-2xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#CCFF00]/10 rounded-full blur-2xl pointer-events-none" />

            {loginError && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded-sm text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleStudioLogin} className="space-y-5 relative z-10">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-300 mb-2">
                  CREATOR EMAIL
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@domain.com"
                    className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] pl-11 pr-4 py-3 text-sm text-white rounded-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-300 mb-2">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] pl-11 pr-4 py-3 text-sm text-white rounded-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="cta-element btn-sweep w-full bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-[#b5e600] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                <span>UNLOCK INSTAGRAM STUDIO</span>
                <ArrowRight size={15} />
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs font-mono text-neutral-500">
              <ShieldCheck size={14} className="inline mr-1 text-[#CCFF00]" />
              <span>Secured Session for @{INSTAGRAM_HANDLE}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unlocked Studio View for Authenticated Creator
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

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-neutral-400">
              AUTHENTICATED: <span className="text-[#CCFF00] font-bold">{user?.email}</span>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-[#0B0B0B] border border-white/15 text-neutral-300 hover:text-red-400 hover:border-red-400/50 px-4 py-2 rounded-sm transition-colors uppercase"
            >
              <LogOut size={14} />
              <span>LOCK & LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Content Source Selection Bar (LIVE NEWS, ARTICLES, THOUGHTS, RESOURCES) */}
        <div className="mb-8">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase block mb-3">
            SELECT CONTENT SOURCE TO GENERATE INSTAGRAM POST FROM:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => {
                setActiveSource('NEWS');
                setSelectedStory(OMNI_NEWS_DATA[0]);
              }}
              className={`p-4 rounded-sm border text-left flex items-center justify-between transition-all ${
                activeSource === 'NEWS'
                  ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase">
                <Radio size={16} />
                <span>⚡ LIVE STREAM</span>
              </div>
              <span className="text-[10px] font-mono border px-2 py-0.5 rounded-sm">
                {OMNI_NEWS_DATA.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveSource('ARTICLES');
                setSelectedStory(articleItems[0]);
              }}
              className={`p-4 rounded-sm border text-left flex items-center justify-between transition-all ${
                activeSource === 'ARTICLES'
                  ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase">
                <Newspaper size={16} />
                <span>📰 ARTICLES</span>
              </div>
              <span className="text-[10px] font-mono border px-2 py-0.5 rounded-sm">
                {articleItems.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveSource('THOUGHTS');
                setSelectedStory(thoughtItems[0]);
              }}
              className={`p-4 rounded-sm border text-left flex items-center justify-between transition-all ${
                activeSource === 'THOUGHTS'
                  ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase">
                <MessageSquare size={16} />
                <span>💭 THOUGHTS</span>
              </div>
              <span className="text-[10px] font-mono border px-2 py-0.5 rounded-sm">
                {thoughtItems.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveSource('RESOURCES');
                setSelectedStory(resourceItems[0]);
              }}
              className={`p-4 rounded-sm border text-left flex items-center justify-between transition-all ${
                activeSource === 'RESOURCES'
                  ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase">
                <Wrench size={16} />
                <span>🛠️ RESOURCES</span>
              </div>
              <span className="text-[10px] font-mono border px-2 py-0.5 rounded-sm">
                {resourceItems.length}
              </span>
            </button>
          </div>
        </div>

        {/* Story Selector Grid */}
        <div className="mb-10">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase block mb-4">
            SELECT AN ITEM FROM {activeSource} TO GENERATE INSTAGRAM POST & CAPTION FOR @THISISRAYU:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentItemsList.map((item) => {
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
