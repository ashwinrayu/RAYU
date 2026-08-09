export interface OmniNewsItem {
  id: string;
  title: string;
  summary: string;
  fullArticleContent: string;
  keyFacts: string[];
  rayuTakeaway: string;
  url: string;
  source: string;
  category: 'INDIA' | 'WAR' | 'POLITICS' | 'TECH' | 'MOVIES' | 'GAMING' | 'WEATHER' | 'INSTAGRAM';
  region: 'INDIA' | 'GLOBAL';
  dateGroup: 'TODAY' | 'YESTERDAY' | 'PAST_WEEK' | 'ARCHIVE';
  publishedAt: string;
  readTime?: string;
  imageUrl?: string;
  badgeColor?: string;
}

export const OMNI_NEWS_DATA: OmniNewsItem[] = [
  // TODAY — 🇮🇳 INDIA DEVELOPMENTS
  {
    id: 'ind-1',
    title: 'India Advances Semiconductor Ecosystem with New Fab Facilities in Gujarat & Assam',
    summary: 'Major infrastructure push accelerates domestic chip fabrication with over $15B in investments targeting automotive and AI silicon.',
    fullArticleContent: `India's semiconductor ambitions are moving from strategy documents to concrete foundation laying. With groundbreaking ceremonies completed across major hubs in Gujarat and Assam, the nation is establishing local silicon fabrication capabilities designed to supply automotive microcontrollers, power electronics, and specialized AI accelerator silicon.

The initiative represents over $15 Billion in combined public and private capital deployment, partnering with global technology leaders to build foundry capacity and advanced packaging facilities. As global supply chains continue to diversify, India's positioning as a reliable semiconductor manufacturing node marks a structural shift in South Asian tech sovereignty.`,
    keyFacts: [
      '$15B+ total capital commitment across Gujarat and Assam facilities',
      'Focus on mature node fabrication (28nm-90nm) and advanced packaging (ATMP/OSAT)',
      'Direct integration with domestic automotive, telecom, and consumer electronics supply chains',
      'Targeting operational silicon output within 24 months',
    ],
    rayuTakeaway: 'Hardware independence is not optional for sovereign tech stacks. Building domestic silicon capacity is the highest-leverage long-term infrastructure move India can execute.',
    url: 'https://news.google.com/search?q=India+Semiconductor',
    source: 'Google News India',
    category: 'INDIA',
    region: 'INDIA',
    dateGroup: 'TODAY',
    publishedAt: '12 MINS AGO',
    readTime: '3 MIN READ',
    badgeColor: '#CCFF00',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ind-2',
    title: 'ISRO Unveils Next-Gen Reusable Launch Vehicle (RLV) Autonomous Landing Milestones',
    summary: 'Indian Space Research Organisation successfully completes autonomous landing capability tests for upcoming Gaganyaan human spaceflight missions.',
    fullArticleContent: `The Indian Space Research Organisation (ISRO) has achieved another critical milestone in reusable launch technology. During high-altitude atmospheric re-entry testing, the prototype vehicle executed fully autonomous cross-range maneuvers, precision flare, and runway touchdown without human intervention.

This autonomous landing capability drastically lowers payload cost per kilogram to low Earth orbit (LEO), laying the engineering groundwork for future multi-use launch architectures and supporting the Gaganyaan crewed spaceflight program.`,
    keyFacts: [
      'Autonomous runway touchdown executed from 4.5km release altitude',
      'Integrated indigenous guidance, navigation, and control (GNC) algorithms',
      'Reduces orbital launch expenditure by up to 60%',
    ],
    rayuTakeaway: 'Frugal high-precision space engineering is ISRO’s superpower. Reusable launch vehicles will democratize commercial satellite constellation deployments.',
    url: 'https://news.google.com/search?q=ISRO+RLV',
    source: 'PIB / ISRO',
    category: 'INDIA',
    region: 'INDIA',
    dateGroup: 'TODAY',
    publishedAt: '35 MINS AGO',
    readTime: '4 MIN READ',
    badgeColor: '#CCFF00',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },

  // TODAY — 🤖 TECH & AI
  {
    id: 'tech-1',
    title: 'Frontier AI Reasoning Models Achieve Breakthrough Benchmarks in Code Synthesis',
    summary: 'Next-generation neural models demonstrate multi-step autonomous planning, self-debugging, and zero-shot architectural generation.',
    fullArticleContent: `AI research labs have unveiled frontier reasoning models capable of executing complex end-to-end software architecture tasks. Unlike legacy autoregressive models that generate token by token, these architectures leverage Monte Carlo Tree Search (MCTS) and internal chain-of-thought verification to debug code paths prior to execution.

Benchmark evaluations show a 40% improvement in handling complex monorepo refactoring, security audit analysis, and cross-file API integration, signaling a fundamental evolution in developer tooling.`,
    keyFacts: [
      'Internal reasoning verification reduces hallucinated imports by 85%',
      'Supports autonomous multi-file refactoring across complex codebases',
      'Zero-shot performance surpasses human benchmarks on competitive coding challenges',
    ],
    rayuTakeaway: 'The unit economics of software creation are collapsing. Engineers who master agentic orchestration will build 100x faster than traditional manual coders.',
    url: 'https://news.ycombinator.com',
    source: 'Hacker News',
    category: 'TECH',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: '8 MINS AGO',
    readTime: '3 MIN READ',
    badgeColor: '#CCFF00',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },

  // TODAY — ⚡ WAR & GEOPOLITICS
  {
    id: 'war-1',
    title: 'Global Security Summit Convenes Over Cyber Defense & Red Sea Maritime Routes',
    summary: 'Multinational maritime coalitions bolster naval patrols and digital infrastructure resilience against persistent disruption risks.',
    fullArticleContent: `Delegates from 30 nations gathered at the International Maritime & Cyber Security Summit to coordinate defense postures against electronic warfare, submarine cable tampering, and commercial shipping disruption.

Key agreements include shared real-time telemetry protocols for commercial cargo vessels and unified cyber incident response frameworks targeting critical port infrastructure.`,
    keyFacts: [
      'Joint naval task force deployed across vital maritime choke points',
      'Submarine fiber-optic cable protection protocols enacted',
      'Real-time threat telemetry sharing between allied naval defense systems',
    ],
    rayuTakeaway: 'Physical trade routes and undersea fiber cables are twin pillars of modern civilization. Securing them requires constant vigilance.',
    url: 'https://www.reuters.com/world/',
    source: 'Reuters',
    category: 'WAR',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: '18 MINS AGO',
    readTime: '5 MIN READ',
    badgeColor: '#FF4D4D',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
  },

  // YESTERDAY — 🏛️ POLITICS & ECONOMY
  {
    id: 'pol-1',
    title: 'Central Banks Signal Monetary Policy Shifts as Global Inflation Cools',
    summary: 'Reserve Bank of India and global monetary authorities evaluate rate adjustments amidst resilient GDP growth indicators.',
    fullArticleContent: `Global financial markets reacted positively as central bank governors indicated a stabilization phase in interest rate policy. With core inflation trending downward across major economies, central banks are balancing rate adjustments to foster sustained capital investment.

The Reserve Bank of India reiterated its commitment to managing liquidity while sustaining domestic GDP expansion projections above 7%.`,
    keyFacts: [
      'India GDP growth projected at 7.2% for fiscal year',
      'Inflation indicators stabilizing within target bands',
      'Capital investment in manufacturing and infrastructure surging',
    ],
    rayuTakeaway: 'Macro economic stability provides the runway for technological experimentation. India remains a bright spot in global growth.',
    url: 'https://www.bloomberg.com',
    source: 'Bloomberg',
    category: 'POLITICS',
    region: 'GLOBAL',
    dateGroup: 'YESTERDAY',
    publishedAt: 'YESTERDAY',
    readTime: '4 MIN READ',
    badgeColor: '#FFB800',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
  },

  // YESTERDAY — 🎬 MOVIES & POP CULTURE
  {
    id: 'mov-1',
    title: 'Blockbuster Sci-Fi Epic Shatters Box Office Records with IMAX 70mm Runs',
    summary: 'Cinematic audiences flood theaters globally as auteur-driven sci-fi storytelling proves the enduring power of theatrical releases.',
    fullArticleContent: `Auteur sci-fi cinema experienced a historic weekend as specialty format IMAX 70mm prints sold out weeks in advance across Los Angeles, London, Mumbai, and Tokyo.

The film's reliance on practical effects, immersive sound design, and original world-building highlights a growing audience fatigue toward generic formulaic sequels.`,
    keyFacts: [
      'IMAX screens accounted for 38% of opening weekend revenue',
      'Sold out 70mm film print screenings internationally',
      'Resurgence in original non-franchise sci-fi storytelling',
    ],
    rayuTakeaway: 'Craft matters. Audiences will pay a premium for uncompromising cinematic vision that cannot be replicated on small screens.',
    url: 'https://variety.com',
    source: 'Variety',
    category: 'MOVIES',
    region: 'GLOBAL',
    dateGroup: 'YESTERDAY',
    publishedAt: 'YESTERDAY',
    readTime: '3 MIN READ',
    badgeColor: '#FF00AA',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
  },

  // PAST_WEEK — 🎮 GAMING & ESPORTS
  {
    id: 'gam-1',
    title: 'Next-Gen Game Engine Showcase Demonstrates Real-Time Physics & Neural Rendering',
    summary: 'Developers unveil photorealistic open-world environments running at locked 60FPS on modern hardware using neural reconstruction.',
    fullArticleContent: `Game engine architects presented a revolutionary real-time rendering pipeline utilizing neural radiosities and dynamic geometry compression. The engine enables micro-detail destruction physics without performance degradation.

By leveraging machine learning upscaling alongside physical light transport, future interactive worlds will blur the boundary between offline pre-rendered cinema and real-time gameplay.`,
    keyFacts: [
      'Real-time neural path tracing running at native 60FPS',
      'Sub-millimeter destruction physics computed on GPU tensor cores',
      'Reduces asset storage footprint by 50% via procedural neural synthesis',
    ],
    rayuTakeaway: 'Gaming technology consistently pushes the frontier of real-time spatial computing. What begins in games becomes standard in software tomorrow.',
    url: 'https://ign.com',
    source: 'IGN',
    category: 'GAMING',
    region: 'GLOBAL',
    dateGroup: 'PAST_WEEK',
    publishedAt: '3 DAYS AGO',
    readTime: '4 MIN READ',
    badgeColor: '#00F0FF',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  },

  // PAST_WEEK — 🌦️ WEATHER & CLIMATE
  {
    id: 'wea-1',
    title: 'Monsoon Patterns Bring Revitalizing Rainfall Across Peninsular India',
    summary: 'Meteorological department reports favorable agricultural rainfall distribution, boosting reservoir levels and crop sowing metrics.',
    fullArticleContent: `The India Meteorological Department (IMD) reports that monsoon rainfall distribution across southern and central farming belts has replenished key agricultural reservoirs to 85% capacity.

The well-distributed precipitation is forecasted to bolster Kharif crop yields and support groundwater recharge after summer heatwaves.`,
    keyFacts: [
      'Reservoir levels up 18% compared to 10-year seasonal averages',
      'Favorable soil moisture metrics across key agricultural states',
      'Satellite weather telemetry predicting sustained monsoon coverage',
    ],
    rayuTakeaway: 'Nature dictates foundational economics. Abundant agricultural yields stabilize food inflation and empower rural prosperity.',
    url: 'https://mausam.imd.gov.in',
    source: 'IMD Weather Alert',
    category: 'WEATHER',
    region: 'INDIA',
    dateGroup: 'PAST_WEEK',
    publishedAt: '4 DAYS AGO',
    readTime: '3 MIN READ',
    badgeColor: '#00FF66',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80',
  },
];

export async function fetchLiveOmniNews(): Promise<OmniNewsItem[]> {
  return OMNI_NEWS_DATA;
}

export function getNewsById(id: string): OmniNewsItem | undefined {
  return OMNI_NEWS_DATA.find((item) => item.id === id);
}
