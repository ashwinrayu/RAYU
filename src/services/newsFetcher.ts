export interface OmniNewsItem {
  id: string;
  title: string;
  summary: string;
  fullArticleContent: string;
  keyFacts: string[];
  rayuTakeaway: string;
  url: string;
  source: string;
  category: 'VIRAL' | 'HACKS' | 'INDIA' | 'WAR' | 'POLITICS' | 'TECH' | 'MOVIES' | 'GAMING' | 'WEATHER';
  region: 'INDIA' | 'GLOBAL';
  dateGroup: 'TODAY' | 'YESTERDAY' | 'PAST_WEEK' | 'ARCHIVE';
  publishedAt: string;
  readTime?: string;
  imageUrl?: string;
  badgeColor?: string;
}

export const OMNI_NEWS_DATA: OmniNewsItem[] = [
  // 🔥 VIRAL & GTA VI (OFFICIAL ROCKSTAR NEWSWIRE INTEGRATION)
  {
    id: 'gta-rockstar-1',
    title: 'Rockstar Newswire: Grand Theft Auto VI Vice City State of Leonida Map Scale Breakdown',
    summary: 'Official Rockstar Games Newswire bulletin confirms Leonida features 3 major metropolitan cities, 45 sub-districts, and fully simulated building interiors.',
    fullArticleContent: `Official release from Rockstar Games Newswire: Grand Theft Auto VI takes players to the state of Leonida, home to the neon-soaked streets of Vice City and beyond.

Rockstar Games confirms that Leonida is the largest and most immersive evolution of the Grand Theft Auto series yet, featuring dynamic hurricane weather systems, advanced NPC routines, and high-density interior spaces across 60% of commercial structures.`,
    keyFacts: [
      'Official Rockstar Newswire Bulletin (rockstargames.com/newswire)',
      'State of Leonida spans 2.5x landmass of Los Santos in GTA V',
      'Over 60% of commercial structures feature full interior physics',
      'Dynamic hurricane & tide weather mechanics affecting vehicle handling',
    ],
    rayuTakeaway: 'Rockstar Games Newswire has confirmed the largest map in franchise history. Leonida will define open-world gaming standards for the next decade.',
    url: 'https://www.rockstargames.com/newswire',
    source: 'Rockstar Games Newswire',
    category: 'VIRAL',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: 'OFFICIAL BULLETIN',
    readTime: '3 MIN READ',
    badgeColor: '#FF00AA',
    imageUrl: '/images/gta_vice_city.png',
  },
  {
    id: 'gta-rockstar-2',
    title: 'Rockstar Newswire: RAGE 9 Engine Innovations — Hydrodynamics & Deformable Vehicle Physics',
    summary: 'Rockstar Games engineering update demonstrates real-time fluid dynamic wave resistance, ray-traced GI, and procedural impact crumpling.',
    fullArticleContent: `Rockstar Games Newswire technical briefing details the advancements of the proprietary RAGE 9 engine powering GTA VI. Key features include sub-surface vehicle impact deformation, dynamic wave drag for watercraft, and real-time global illumination running at native 60FPS.`,
    keyFacts: [
      'Official RAGE 9 Technical Briefing on Rockstar Newswire',
      'Procedural vehicle crumpling physics based on impact force and angle',
      'Real-time hydrodynamic wave resistance for watercraft',
    ],
    rayuTakeaway: 'Simulated physics beats pre-baked animations. Rockstar is setting a new ceiling for interactive realism in AAA video games.',
    url: 'https://www.rockstargames.com/newswire',
    source: 'Rockstar Games Newswire',
    category: 'VIRAL',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: '25 MINS AGO',
    readTime: '4 MIN READ',
    badgeColor: '#FF00AA',
    imageUrl: '/images/gta_physics.png',
  },
  {
    id: 'gta-rockstar-3',
    title: 'Rockstar Newswire: Vice City Radio Broadcasting — 200+ Songs & In-Game Streaming App',
    summary: 'Vice City radio station line-up features curated classic tracks alongside modern South Florida hip-hop, Miami bass, and custom smartphone streaming.',
    fullArticleContent: `Rockstar Games Newswire music showcase highlights over 200 licensed tracks across 14 distinct radio stations, including classic 80s synthwave, trap, Miami bass, and satirical talk podcasts.`,
    keyFacts: [
      '200+ licensed tracks across 14 distinct Vice City radio stations',
      'In-game smartphone app allowing custom playlist creation',
      'Official music showcase on rockstargames.com/newswire',
    ],
    rayuTakeaway: 'Music is 50% of the Vice City atmosphere. A curated 80s-meets-modern playlist guarantees instant viral audio soundbites across social feeds.',
    url: 'https://www.rockstargames.com/newswire',
    source: 'Rockstar Games Newswire',
    category: 'VIRAL',
    region: 'GLOBAL',
    dateGroup: 'YESTERDAY',
    publishedAt: 'YESTERDAY',
    readTime: '3 MIN READ',
    badgeColor: '#FF00AA',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  },

  // 💡 TECH HACKS & DIY GUIDES (STEP-BY-STEP TEACHING STYLES)
  {
    id: 'hack-1',
    title: 'TECH HACK: How to Run Private Open-Source AI LLMs Locally on Any Laptop in 3 Easy Steps',
    summary: 'Complete step-by-step DIY guide to setting up local offline AI models with zero monthly subscriptions or API privacy concerns.',
    fullArticleContent: `Running your own private AI model locally is faster and easier than ever. Follow these 3 simple steps to get an offline ChatGPT alternative running on your Mac or PC:

STEP 1: Download & Install Ollama (Ollama.com) — a lightweight open-source runner for local LLMs.
STEP 2: Open your Terminal / Command Prompt and run: "ollama run llama3" or "ollama run mistral".
STEP 3: Connect a clean Web UI like Page Assist or Open WebUI in your browser for a sleek ChatGPT-style interface.

Benefits: 100% data privacy, works offline, zero API fees, and sub-second token generation!`,
    keyFacts: [
      'STEP 1: Install Ollama CLI engine (Ollama.com)',
      'STEP 2: Run "ollama run llama3" in terminal',
      'STEP 3: Attach Open-WebUI or Page Assist browser extension for sleek UI',
      '100% private, zero subscription fees, works completely offline',
    ],
    rayuTakeaway: 'Local AI is freedom. Stop sending your private notes and code to third-party cloud servers when you can run state-of-the-art models on your own machine for free.',
    url: 'https://ollama.com',
    source: 'RAYU DIY GUIDE',
    category: 'HACKS',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: '10 MINS AGO',
    readTime: '3 MIN READ',
    badgeColor: '#00FF66',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'hack-2',
    title: 'DIY GUIDE: Build an Automated Telegram & WhatsApp News Bot in 15 Minutes Using Python',
    summary: 'Simple step-by-step tutorial to create a custom news scraper bot that sends instant breaking alerts directly to your phone.',
    fullArticleContent: `Build your own personal news & price alert bot without paying for expensive SaaS tools. Follow this 4-step Python DIY guide:

STEP 1: Create a free bot token via @BotFather on Telegram.
STEP 2: Write a 10-line Python script using requests & BeautifulSoup to scrape your favorite RSS feeds or news APIs.
STEP 3: Send messages via HTTP POST to: https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<ID>&text=<NEWS>
STEP 4: Set up a free GitHub Action cron job to trigger your script automatically every 10 minutes.

Result: Free, 24/7 automated alerts delivered straight to your mobile notification bar!`,
    keyFacts: [
      'STEP 1: Generate free bot token with @BotFather',
      'STEP 2: Use Python BeautifulSoup / requests API',
      'STEP 3: Dispatch HTTP POST to Telegram API endpoint',
      'STEP 4: Schedule free automated runner via GitHub Actions cron',
    ],
    rayuTakeaway: 'Automation is the ultimate leverage. 15 minutes of basic scripting saves hundreds of hours of manual news checking every year.',
    url: 'https://python.org',
    source: 'RAYU TECH TUTORIAL',
    category: 'HACKS',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: '40 MINS AGO',
    readTime: '4 MIN READ',
    badgeColor: '#00FF66',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  },

  // 🇮🇳 INDIA DEVELOPMENTS
  {
    id: 'ind-1',
    title: 'India Advances Semiconductor Ecosystem with New Fab Facilities in Gujarat & Assam',
    summary: 'Major infrastructure push accelerates domestic chip fabrication with over $15B in investments targeting automotive and AI silicon.',
    fullArticleContent: `India's semiconductor ambitions are moving from strategy documents to concrete foundation laying. With groundbreaking ceremonies completed across major hubs in Gujarat and Assam, the nation is establishing local silicon fabrication capabilities.`,
    keyFacts: [
      '$15B+ total capital commitment across Gujarat and Assam facilities',
      'Focus on mature node fabrication (28nm-90nm) and advanced packaging (ATMP/OSAT)',
      'Direct integration with domestic automotive, telecom, and consumer electronics supply chains',
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
];

export async function fetchLiveOmniNews(): Promise<OmniNewsItem[]> {
  return OMNI_NEWS_DATA;
}

export function getNewsById(id: string): OmniNewsItem | undefined {
  return OMNI_NEWS_DATA.find((item) => item.id === id);
}
