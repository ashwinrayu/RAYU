import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Clock, Globe, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { OMNI_NEWS_DATA, getNewsById } from '@/services/newsFetcher';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const news = getNewsById(resolvedParams.id);

  if (!news) {
    return {
      title: 'News Article Not Found — RAYU',
      description: 'The requested live news report could not be found.',
    };
  }

  const baseUrl = 'https://rayu.com';
  const articleUrl = `${baseUrl}/news/${news.id}`;
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(news.title)}&category=${encodeURIComponent(news.category)}`;

  return {
    title: `${news.title} | RAYU Live Awareness`,
    description: news.summary.slice(0, 160),
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: news.title,
      description: news.summary,
      url: articleUrl,
      siteName: 'RAYU',
      type: 'article',
      publishedTime: new Date().toISOString(),
      images: [
        {
          url: news.imageUrl || ogImageUrl,
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.summary,
      images: [news.imageUrl || ogImageUrl],
      creator: '@thisisrayu',
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const news = getNewsById(resolvedParams.id);

  if (!news) {
    notFound();
  }

  const baseUrl = 'https://rayu.com';

  const relatedNews = OMNI_NEWS_DATA.filter(
    (item) => item.id !== news.id && (item.category === news.category || item.region === news.region)
  ).slice(0, 3);

  // NewsArticle JSON-LD Schema
  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: news.summary,
    image: [news.imageUrl || `${baseUrl}/api/og?title=${encodeURIComponent(news.title)}`],
    datePublished: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'RAYU Live Awareness Engine',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RAYU',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.svg`,
      },
    },
  };

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
        name: 'Live Stream',
        item: `${baseUrl}/#live-news`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: news.title,
        item: `${baseUrl}/news/${news.id}`,
      },
    ],
  };

  return (
    <article className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/v2#live-news"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-neutral-400 hover:text-[#CCFF00] transition-colors uppercase"
          >
            <ArrowLeft size={14} />
            <span>BACK TO LIVE AWARENESS STREAM</span>
          </Link>
        </div>

        {/* Category Header Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="text-xs font-mono font-bold px-3 py-1 rounded-sm border uppercase"
            style={{
              borderColor: news.badgeColor || '#CCFF00',
              color: news.badgeColor || '#CCFF00',
              backgroundColor: `${news.badgeColor || '#CCFF00'}15`,
            }}
          >
            [{news.category}]
          </span>
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase flex items-center gap-1 border border-white/10 px-3 py-1 rounded-sm">
            <Globe size={12} className="text-[#CCFF00]" />
            {news.region} REGION
          </span>
          <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
            <Clock size={12} />
            {news.publishedAt}
          </span>
          {news.readTime && (
            <span className="text-xs font-mono text-neutral-500 font-bold border-l border-white/10 pl-3">
              {news.readTime}
            </span>
          )}
        </div>

        {/* H1 Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight mb-6 text-white">
          {news.title}
        </h1>

        {/* Excerpt Lead Paragraph */}
        <p className="text-lg sm:text-xl text-neutral-300 font-semibold leading-relaxed mb-8 border-l-2 border-[#CCFF00] pl-5">
          {news.summary}
        </p>

        {/* Cover Image */}
        {news.imageUrl && (
          <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden mb-10 border border-white/10">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              priority
              className="object-cover brightness-105"
            />
          </div>
        )}

        {/* Full In-Website Article Body */}
        <div className="prose prose-invert max-w-none text-neutral-300 text-base sm:text-lg leading-relaxed mb-12 space-y-6">
          {news.fullArticleContent.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Key Facts & Takeaways Box */}
        {news.keyFacts && news.keyFacts.length > 0 && (
          <div className="mb-10 p-6 sm:p-8 bg-[#0B0B0B] border border-white/15 rounded-sm">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold text-[#CCFF00] tracking-widest uppercase">
              <CheckCircle2 size={16} />
              <span>KEY DATA POINTS & FACTUAL BREAKDOWN</span>
            </div>
            <ul className="space-y-3">
              {news.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-200 font-normal">
                  <span className="text-[#CCFF00] font-bold mt-0.5">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* RAYU Unfiltered Takeaway Card */}
        {news.rayuTakeaway && (
          <div className="mb-12 p-6 sm:p-8 bg-[#CCFF00]/10 border border-[#CCFF00]/40 rounded-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-[#CCFF00] tracking-widest uppercase">
              <Sparkles size={16} />
              <span>RAYU'S UNFILTERED TAKE</span>
            </div>
            <p className="text-white text-base sm:text-lg font-bold leading-relaxed">
              "{news.rayuTakeaway}"
            </p>
          </div>
        )}

        {/* Instagram Post Generator Shortcut */}
        <div className="mb-8 p-6 bg-[#0B0B0B] border border-[#CCFF00]/40 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase block mb-1">
              📸 CREATOR INSTAGRAM CROSS-PUBLISHER
            </span>
            <span className="text-sm font-bold text-white uppercase">
              Want to post this story to @thisisrayu on Instagram?
            </span>
          </div>

          <Link
            href="/admin/studio"
            className="inline-flex items-center gap-2 bg-[#050505] border border-white/20 text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-wider px-5 py-3 rounded-sm hover:border-[#CCFF00] transition-colors"
          >
            <span>OPEN INSTAGRAM POST STUDIO</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* External Redirect Action Bar */}
        <div className="p-6 bg-[#0B0B0B] border border-white/10 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <div>
            <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">
              REPORTED BY {news.source}
            </span>
            <span className="text-sm font-bold text-white uppercase">
              Want to read the original primary source coverage?
            </span>
          </div>

          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="cta-element btn-sweep inline-flex items-center gap-3 bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-sm hover:bg-[#b5e600] transition-colors whitespace-nowrap"
          >
            <span>READ AT {news.source}</span>
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Related Live News Stream */}
        {relatedNews.length > 0 && (
          <div className="pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">
                RELATED LIVE STORIES
              </h2>
              <span className="text-xs font-mono text-neutral-500 font-bold uppercase">
                MORE IN {news.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group p-5 bg-[#0B0B0B] border border-white/10 rounded-sm hover:border-[#CCFF00]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#CCFF00] font-bold block mb-2">
                      [{item.category}]
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#CCFF00] transition-colors mb-2 uppercase line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>{item.publishedAt}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-[#CCFF00]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
