'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { InstagramPostStudio } from '@/components/admin/InstagramPostStudio';
import { ApiKeysStatusPanel } from '@/components/admin/ApiKeysStatusPanel';
import { UnifiedContentUploader } from '@/components/admin/UnifiedContentUploader';
import { CustomNewsUploader } from '@/components/admin/CustomNewsUploader';
import { OMNI_NEWS_DATA, OmniNewsItem } from '@/services/newsFetcher';
import { ARTICLES_DATA } from '@/data/articles';
import { THOUGHTS_DATA } from '@/data/thoughts';
import { RESOURCES_DATA } from '@/data/resources';
import { Sparkles, LogOut, CheckCircle2, Lock, Mail, ArrowRight, ShieldCheck, Newspaper, MessageSquare, Wrench, Radio, PlusCircle, Layers } from 'lucide-react';
import { INSTAGRAM_HANDLE } from '@/data/instagram';
import { PostContent } from '@/types/postContent';

type ContentSourceType = 'CUSTOM' | 'NEWS' | 'ARTICLES' | 'THOUGHTS' | 'RESOURCES';

export default function AdminStudioPage() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeSource, setActiveSource] = useState<ContentSourceType>('NEWS');
  const [customStories, setCustomStories] = useState<OmniNewsItem[]>([]);
  const [selectedStory, setSelectedStory] = useState<OmniNewsItem>(OMNI_NEWS_DATA[0]);
  const [activePostContent, setActivePostContent] = useState<PostContent | null>(null);

  // Production login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      setIsUnlocked(true);
    }
  }, [isLoggedIn]);

  const handleStudioLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'thisisrayu@gmail.com', password || 'rayu2026');
    setIsUnlocked(true);
  };

  const handleLogout = () => {
    setIsUnlocked(false);
    logout();
  };

  const handleCustomNewsCreated = (newItem: OmniNewsItem) => {
    setCustomStories((prev) => [newItem, ...prev]);
    setSelectedStory(newItem);
    setActiveSource('CUSTOM');
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
      url: `https://rayu-360.vercel.app/articles/${art.slug}`,
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
      url: 'https://rayu-360.vercel.app/thoughts',
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
      case 'CUSTOM':
        return customStories.length > 0 ? customStories : OMNI_NEWS_DATA;
      case 'NEWS':
        return [...customStories, ...OMNI_NEWS_DATA];
      case 'ARTICLES':
        return articleItems;
      case 'THOUGHTS':
        return thoughtItems;
      case 'RESOURCES':
        return resourceItems;
      default:
        return OMNI_NEWS_DATA;
    }
  }, [activeSource, customStories, articleItems, thoughtItems, resourceItems]);

  // Protected Access Gate if not logged in & not unlocked
  if (!isLoggedIn && !isUnlocked) {
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
                    placeholder="••••••••"
                    className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] pl-11 pr-4 py-3 text-sm text-white rounded-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="cta-element btn-sweep w-full bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-[#b5e600] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)] cursor-pointer"
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
    <div className="bg-[#050505] text-white pt-20 sm:pt-28 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12">
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-[#CCFF00] uppercase mb-1">
              <Sparkles size={12} />
              <span>RAYU CREATOR STUDIO</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              INSTAGRAM <span className="text-[#CCFF00]">POST STUDIO</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-[10px] sm:text-xs font-mono text-neutral-400 truncate max-w-[140px] sm:max-w-none">
              <span className="text-[#CCFF00] font-bold">{user?.email?.split('@')[0] || 'thisisrayu'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold bg-[#0B0B0B] border border-white/15 text-neutral-300 hover:text-red-400 hover:border-red-400/50 px-3 py-2 rounded-sm transition-colors uppercase cursor-pointer shrink-0"
            >
              <LogOut size={13} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* API Key Status & Diagnostics Panel */}
        <ApiKeysStatusPanel />

        {/* Unified V2 Content Studio Uploader */}
        <UnifiedContentUploader
          onPostContentCreated={(newContent) => {
            setActivePostContent(newContent);
            const convertedStory: OmniNewsItem = {
              id: newContent.id,
              title: newContent.headline,
              summary: newContent.body || newContent.headline,
              fullArticleContent: newContent.body || newContent.headline,
              keyFacts: [`Type: ${newContent.contentType}`, `Category: ${newContent.category}`],
              rayuTakeaway: newContent.rayuTakeaway || newContent.headline,
              url: newContent.sourceUrl || 'https://rayu-360.vercel.app',
              source: 'RAYU V2 STUDIO',
              category: newContent.category as any,
              region: 'GLOBAL',
              dateGroup: 'TODAY',
              publishedAt: 'JUST NOW',
              readTime: '2 MIN READ',
              imageUrl: newContent.sourceImage || '/images/gta_vice_city.png',
              badgeColor: '#CCFF00',
            };
            setSelectedStory(convertedStory);
          }}
        />

        {/* Content Source Selection Bar */}
        <div className="mb-6">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-neutral-400 uppercase block mb-2">
            SELECT CONTENT SOURCE:
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            <button
              onClick={() => {
                setActiveSource('CUSTOM');
                if (customStories.length > 0) setSelectedStory(customStories[0]);
              }}
              className={`p-2.5 sm:p-4 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                activeSource === 'CUSTOM'
                  ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00]'
                  : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase">
                <PlusCircle size={13} />
                <span className="hidden sm:inline">CUSTOM</span>
                <span className="sm:hidden">+</span>
              </div>
              <span className="text-[10px] font-mono border px-1.5 py-0.5 rounded-sm">{customStories.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveSource('NEWS');
                setSelectedStory(OMNI_NEWS_DATA[0]);
              }}
              className={`p-2.5 sm:p-4 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                activeSource === 'NEWS'
                  ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00]'
                  : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase">
                <Radio size={13} />
                <span>NEWS</span>
              </div>
              <span className="text-[10px] font-mono border px-1.5 py-0.5 rounded-sm">{OMNI_NEWS_DATA.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveSource('ARTICLES');
                setSelectedStory(articleItems[0]);
              }}
              className={`p-2.5 sm:p-4 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                activeSource === 'ARTICLES'
                  ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00]'
                  : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase">
                <Newspaper size={13} />
                <span className="hidden sm:inline">ARTICLES</span>
                <span className="sm:hidden">ART.</span>
              </div>
              <span className="text-[10px] font-mono border px-1.5 py-0.5 rounded-sm">{articleItems.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveSource('THOUGHTS');
                setSelectedStory(thoughtItems[0]);
              }}
              className={`p-2.5 sm:p-4 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                activeSource === 'THOUGHTS'
                  ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00]'
                  : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase">
                <MessageSquare size={13} />
                <span className="hidden sm:inline">THOUGHTS</span>
                <span className="sm:hidden">THT.</span>
              </div>
              <span className="text-[10px] font-mono border px-1.5 py-0.5 rounded-sm">{thoughtItems.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveSource('RESOURCES');
                setSelectedStory(resourceItems[0]);
              }}
              className={`p-2.5 sm:p-4 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                activeSource === 'RESOURCES'
                  ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00]'
                  : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase">
                <Wrench size={13} />
                <span className="hidden sm:inline">RESOURCES</span>
                <span className="sm:hidden">RES.</span>
              </div>
              <span className="text-[10px] font-mono border px-1.5 py-0.5 rounded-sm">{resourceItems.length}</span>
            </button>
          </div>
        </div>

        {/* Story Selector Grid */}
        <div className="mb-6">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-neutral-400 uppercase block mb-2">
            SELECT STORY:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {currentItemsList.map((item) => {
              const isSelected = selectedStory.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedStory(item)}
                  className={`text-left p-3 rounded-sm border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#CCFF00]/10 border-[#CCFF00] text-white shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                      : 'bg-[#0B0B0B] border-white/10 text-neutral-300 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono mb-1.5">
                    <span className="text-[#CCFF00] font-bold">[{item.category}]</span>
                    {isSelected && <CheckCircle2 size={11} className="text-[#CCFF00]" />}
                  </div>
                  <h4 className="text-[10px] sm:text-xs font-bold uppercase line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Story Instagram Studio Component */}
        <InstagramPostStudio newsItem={selectedStory} postContent={activePostContent || undefined} />
      </div>
    </div>
  );
}
