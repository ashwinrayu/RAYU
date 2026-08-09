import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Search, Cpu, Globe, Compass, Zap, BookOpen, Layers } from 'lucide-react';
import { TOPICS_DATA } from '@/data/topics';
import { ARTICLES_DATA } from '@/data/articles';
import { THOUGHTS_DATA } from '@/data/thoughts';

interface Props {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const topicKey = resolvedParams.topic.toLowerCase();
  const topic = TOPICS_DATA[topicKey];

  if (!topic) {
    return {
      title: 'Topic Not Found — RAYU',
      description: 'The requested topic could not be found.',
    };
  }

  const baseUrl = 'https://rayu.com';
  const topicUrl = `${baseUrl}/topics/${topic.slug}`;
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(topic.name)}&category=${encodeURIComponent(topic.categoryKey)}`;

  return {
    title: `${topic.name} — Explore Topics | RAYU`,
    description: topic.description.slice(0, 160),
    alternates: {
      canonical: topicUrl,
    },
    openGraph: {
      title: `${topic.name} — Explore Topics | RAYU`,
      description: topic.description,
      url: topicUrl,
      siteName: 'RAYU',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: topic.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topic.name} — Explore Topics | RAYU`,
      description: topic.description,
      images: [ogImageUrl],
      creator: '@thisisrayu',
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const resolvedParams = await params;
  const topicKey = resolvedParams.topic.toLowerCase();
  const topic = TOPICS_DATA[topicKey];

  if (!topic) {
    notFound();
  }

  const baseUrl = 'https://rayu.com';

  // Filter articles matching topic category or key
  const matchingArticles = ARTICLES_DATA.filter(
    (a) => a.category.toUpperCase() === topic.categoryKey || topic.keyThemes.some((t) => a.tags.includes(t))
  );

  // Filter thoughts matching topic category
  const matchingThoughts = THOUGHTS_DATA.filter(
    (t) => t.category.toUpperCase() === topic.categoryKey
  );

  const featuredArticle = matchingArticles[0] || ARTICLES_DATA[0];

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Topics',
        item: `${baseUrl}/articles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: topic.name,
        item: `${baseUrl}/topics/${topic.slug}`,
      },
    ],
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu size={24} className="text-[#CCFF00]" />;
      case 'Globe':
        return <Globe size={24} className="text-[#CCFF00]" />;
      case 'Compass':
        return <Compass size={24} className="text-[#CCFF00]" />;
      case 'Zap':
        return <Zap size={24} className="text-[#CCFF00]" />;
      case 'BookOpen':
        return <BookOpen size={24} className="text-[#CCFF00]" />;
      default:
        return <Layers size={24} className="text-[#CCFF00]" />;
    }
  };

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      {/* Inject Breadcrumb JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-neutral-400 hover:text-[#CCFF00] transition-colors uppercase"
          >
            <ArrowLeft size={14} />
            <span>BACK TO HOMEPAGE</span>
          </Link>
        </div>

        {/* Topic Header Banner */}
        <div className="mb-12 p-8 md:p-12 bg-[#0B0B0B] border border-white/10 rounded-sm relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center">
                {getTopicIcon(topic.iconName)}
              </div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
                EXPLORE TOPIC — {topic.categoryKey}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-4">
              {topic.name}
            </h1>

            <p className="text-xl font-bold text-white mb-4 uppercase tracking-tight">
              {topic.tagline}
            </p>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 font-normal">
              {topic.longIntro}
            </p>

            {/* Key Themes Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 mr-2 uppercase">CORE THEMES:</span>
              {topic.keyThemes.map((theme) => (
                <span
                  key={theme}
                  className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-sm text-neutral-300"
                >
                  #{theme}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Cross-Topic Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 bg-[#0B0B0B] p-3 rounded-sm border border-white/10">
          <span className="text-xs font-mono font-bold text-neutral-500 uppercase px-3">TOPICS:</span>
          {Object.values(TOPICS_DATA).map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className={`text-xs font-mono font-bold px-4 py-2 rounded-sm transition-all uppercase ${
                t.slug === topic.slug
                  ? 'bg-[#CCFF00] text-[#050505] shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {t.name.split(' ')[0]}
            </Link>
          ))}
        </div>

        {/* Featured Article Spotlight */}
        {featuredArticle && (
          <div className="mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-4">
              ★ FEATURED ESSAY IN {topic.categoryKey}
            </span>
            <Link
              href={`/articles/${featuredArticle.slug}`}
              data-cursor-label="VIEW"
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0B0B0B] border border-white/15 rounded-sm overflow-hidden hover:border-[#CCFF00] transition-colors duration-300"
            >
              <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto w-full bg-neutral-900 overflow-hidden">
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
              </div>
              <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-3">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-[#CCFF00] transition-colors mb-4 uppercase leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>{featuredArticle.date}</span>
                  <div className="flex items-center gap-2 text-white font-bold group-hover:text-[#CCFF00]">
                    <span>READ ESSAY</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Topic Content Grid Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">
              ALL WRITINGS & COMMENTARY IN {topic.categoryKey}
            </h2>
            <span className="text-xs font-mono text-neutral-500 font-bold">
              {matchingArticles.length} ARTICLES AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                data-cursor-label="VIEW"
                className="group flex flex-col justify-between h-full bg-[#0B0B0B] border border-white/10 rounded-sm overflow-hidden hover:border-[#CCFF00]/60 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-[#CCFF00] transition-colors mb-2 uppercase leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>{article.date}</span>
                  <div className="flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>{article.readTime}</span>
                    <ArrowRight size={12} className="text-[#CCFF00] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Real-time Thoughts Stream for Topic */}
        {matchingThoughts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white mb-6">
              REAL-TIME THOUGHT STREAM — {topic.categoryKey}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchingThoughts.map((thought) => (
                <div
                  key={thought.id}
                  className="p-6 bg-[#0B0B0B] border border-white/10 rounded-sm hover:border-[#CCFF00]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
                    <span className="text-[#CCFF00] font-bold">#{thought.category}</span>
                    <span>{thought.date}</span>
                  </div>
                  <p className="text-neutral-200 text-sm leading-relaxed mb-4">
                    {thought.content}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>{thought.timestamp}</span>
                    <span className="text-[10px] text-neutral-600">UNFILTERED REALIZATION</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
