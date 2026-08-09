'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { InstagramPostStudio } from '@/components/admin/InstagramPostStudio';
import { OMNI_NEWS_DATA, OmniNewsItem } from '@/services/newsFetcher';
import { Sparkles, LogOut, CheckCircle2, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { CONTACT_EMAIL, INSTAGRAM_HANDLE } from '@/data/instagram';

export default function AdminStudioPage() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const [selectedStory, setSelectedStory] = useState<OmniNewsItem>(OMNI_NEWS_DATA[0]);

  // Login form state for protected studio access
  const [email, setEmail] = useState('thisisrayu@gmail.com');
  const [password, setPassword] = useState('rayu2026');
  const [loginError, setLoginError] = useState('');

  const handleStudioLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = login(email, password);
    if (!success) {
      setLoginError('Invalid credentials. Use email thisisrayu@gmail.com and password rayu2026');
    }
  };

  // Protected Access Gate if not logged in
  if (!isLoggedIn) {
    return (
      <div className="bg-[#050505] text-white pt-36 pb-24 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/40 flex items-center justify-center mx-auto mb-6 text-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.2)]">
            <Lock size={28} />
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
            CREATOR ACCESS <span className="text-[#CCFF00]">REQUIRED</span>
          </h1>
          <p className="text-xs font-mono text-neutral-400 mb-8">
            Log in with your creator account ({CONTACT_EMAIL}) to unlock the Instagram Post Studio & Cross-Publisher.
          </p>

          <div className="bg-[#0B0B0B] border border-white/10 p-8 rounded-sm text-left shadow-2xl relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#CCFF00]/10 rounded-full blur-2xl pointer-events-none" />

            {loginError && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded-sm">
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
                    placeholder="thisisrayu@gmail.com"
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
              <span>Secured for @{INSTAGRAM_HANDLE}</span>
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

        {/* Story Selector Stream Grid */}
        <div className="mb-10">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase block mb-4">
            SELECT A LIVE STORY TO GENERATE INSTAGRAM POST & CAPTION FOR @THISISRAYU:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OMNI_NEWS_DATA.map((item) => {
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
