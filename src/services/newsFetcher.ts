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
  // 🔥 VIRAL & GTA VI (HIGH-TRAFFIC VIRAL CONTENT)
  {
    id: 'gta-1',
    title: 'GTA VI Vice City Map Size Leaks Reveal 2.5x Larger Landmass Than GTA V',
    summary: 'Leaked coordinates and telemetry confirm Vice City state of Leonida features 3 major cities, 45 sub-districts, and fully reactive water physics.',
    fullArticleContent: `Rockstar Games' upcoming Grand Theft Auto VI is setting unprecedented technical benchmarks for open-world scale. Internal telemetry analysis reveals that the state of Leonida spans over 2.5 times the landmass of Los Santos in GTA V.

Key highlights include fully simulated indoor spaces across 60% of commercial buildings, dynamic weather systems affecting vehicle handling, and advanced AI NPC routine schedules where every citizen maintains distinct daily jobs, home routes, and memory states.`,
    keyFacts: [
      '2.5x larger map scale than GTA V Los Santos',
      'Over 60% of commercial structures feature full interior physics',
      'Dynamic hurricane & tide weather mechanics affecting vehicle handling',
      'NPC AI memory system tracks player interactions across game sessions',
    ],
    rayuTakeaway: 'GTA VI will be the single largest entertainment launch in human history. The technical leap in NPC AI and physics rendering will redefine open-world game design for the next decade.',
    url: 'https://news.google.com/search?q=GTA+VI+Leaks',
    source: 'Rockstar Intel / IGN',
    category: 'VIRAL',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: '5 MINS AGO',
    readTime: '3 MIN READ',
    badgeColor: '#FF00AA',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gta-2',
    title: 'GTA VI Physics Engine Upgrade: RAGE 9 Introduces Sub-Surface Vehicle Deformation & Real Water Hydrodynamics',
    summary: 'Next-gen RAGE engine updates demonstrate real-time fluid simulation, dynamic vehicle impact crumpling, and ray-traced water reflections.',
    fullArticleContent: `Engineers analyzing RAGE 9 technical patents have uncovered major rendering advancements coming to GTA VI. The engine incorporates real-time hydrodynamic physics for boats and jet skis, sub-surface material scattering, and procedural vehicle damage where individual panels deform realistically based on impact force and angle.`,
    keyFacts: [
      'RAGE 9 engine procedural vehicle crumpling physics',
      'Real-time hydrodynamic wave resistance for watercraft',
      'Ray-traced GI (Global Illumination) running at native 60FPS on PS5 Pro & Xbox Series X',
    ],
    rayuTakeaway: 'Simulated real-world physics beats pre-baked animations every single time. Rockstar is setting a new ceiling for interactive realism.',
    url: 'https://news.google.com/search?q=GTA+VI+RAGE+9',
    source: 'Digital Foundry',
    category: 'VIRAL',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: '25 MINS AGO',
    readTime: '4 MIN READ',
    badgeColor: '#FF00AA',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gta-3',
    title: 'GTA VI Soundtrack & Radio Leaks Tease 200+ Songs Across Synthwave, Hip-Hop, & 80s Classics',
    summary: 'Vice City radio station line-up features curated classic tracks alongside modern South Florida hip-hop and underground electronic streams.',
    fullArticleContent: `Radio station listings leaked via audio middleware builds hint at over 200 licensed tracks spanning retro 1980s Vice City classics, Miami bass, trap, synthwave, and Latin reggaeton.`,
    keyFacts: [
      '200+ licensed tracks across 14 distinct Vice City radio stations',
      'In-game smartphone app allowing custom playlist creation',
      'Live podcast radio channels satirizing internet culture & influencer trends',
    ],
    rayuTakeaway: 'Music is 50% of the Vice City atmosphere. A curated 80s-meets-modern playlist guarantees instant viral audio soundbites across social feeds.',
    url: 'https://news.google.com/search?q=GTA+VI+Radio',
    source: 'GamingBible',
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
  {
    id: 'hack-3',
    title: 'TERMINAL HACK: 5 Command Line Shortcuts That Will Double Your Coding Speed',
    summary: 'Must-know Zsh and Bash terminal productivity shortcuts for developers and tech enthusiasts.',
    fullArticleContent: `Mastering terminal productivity separates fast developers from slow coders. Here are 5 quick keyboard shortcuts:

1. "Ctrl + R": Reverse search your command history instantly.
2. "Ctrl + A" / "Ctrl + E": Jump instantly to the beginning or end of your command line.
3. "alt + ." (or "Esc + ."): Paste the last argument of your previous command automatically.
4. "alias z='cd ~/Projects'": Create instant 1-letter folder navigation aliases in your .zshrc.
5. "pbcopy < file.txt" (Mac) / "clip < file.txt" (Windows): Copy file contents directly to clipboard without opening editors.`,
    keyFacts: [
      'Shortcut 1: Ctrl + R (Instant command history search)',
      'Shortcut 2: Ctrl + A / Ctrl + E (Line start & end jump)',
      'Shortcut 3: Alt + . (Reuse last command argument)',
      'Shortcut 4: Custom zsh aliases for 1-click navigation',
      'Shortcut 5: Direct pipe to system clipboard (pbcopy / clip)',
    ],
    rayuTakeaway: 'Small efficiency gains compound over time. Shaving 5 seconds off every terminal command adds up to extra productive hours every week.',
    url: 'https://developer.mozilla.org',
    source: 'RAYU HACKS',
    category: 'HACKS',
    region: 'GLOBAL',
    dateGroup: 'YESTERDAY',
    publishedAt: 'YESTERDAY',
    readTime: '3 MIN READ',
    badgeColor: '#00FF66',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
  },

  // 🇮🇳 INDIA DEVELOPMENTS
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
  {
    id: 'ind-3',
    title: 'UPI Global Expansion Reaches 12+ Countries as Cross-Border Payments Surge',
    summary: 'India’s Unified Payments Interface extends instant merchant settlement networks across Southeast Asia, Europe, and the Middle East.',
    fullArticleContent: `India’s payment infrastructure continues its worldwide expansion as UPI integration completes across retail and banking networks in France, Singapore, UAE, Mauritius, and Sri Lanka.`,
    keyFacts: [
      'Operational across 12 international banking corridors',
      'Zero conversion friction for domestic UPI wallet users abroad',
      'Processing over 13 Billion transactions monthly worldwide',
    ],
    rayuTakeaway: 'Open digital public infrastructure beats proprietary credit card moats. UPI is becoming the global gold standard for instant real-time payments.',
    url: 'https://news.google.com/search?q=UPI+Global',
    source: 'Financial Express',
    category: 'INDIA',
    region: 'INDIA',
    dateGroup: 'TODAY',
    publishedAt: '1 HOUR AGO',
    readTime: '3 MIN READ',
    badgeColor: '#CCFF00',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  },

  // 🤖 TECH & AI
  {
    id: 'tech-1',
    title: 'Frontier AI Reasoning Models Achieve Breakthrough Benchmarks in Code Synthesis',
    summary: 'Next-generation neural models demonstrate multi-step autonomous planning, self-debugging, and zero-shot architectural generation.',
    fullArticleContent: `AI research labs have unveiled frontier reasoning models capable of executing complex end-to-end software architecture tasks.`,
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
  {
    id: 'tech-2',
    title: 'Quantum Hardware Reaches Fault-Tolerant Logical Qubit Threshold',
    summary: 'Researchers demonstrate surface code error correction operating below threshold error rates in scalable superconducting processors.',
    fullArticleContent: `Physics laboratories have achieved a landmark result in fault-tolerant quantum computing. By multiplexing hundreds of physical qubits into error-corrected logical qubits, the system maintained quantum coherence across thousands of gate operations.`,
    keyFacts: [
      'Logical qubit error rate dropped below 0.01% operational threshold',
      'Sustained coherence across 10,000 continuous quantum gate cycles',
      'Paves path toward commercial quantum chemistry simulation',
    ],
    rayuTakeaway: 'Quantum fault tolerance was thought to be decades away. Exponential hardware scaling is accelerating timelines faster than consensus forecasts.',
    url: 'https://techcrunch.com',
    source: 'TechCrunch',
    category: 'TECH',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: '50 MINS AGO',
    readTime: '5 MIN READ',
    badgeColor: '#CCFF00',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
  },

  // ⚡ WAR & GEOPOLITICS
  {
    id: 'war-1',
    title: 'Global Security Summit Convenes Over Cyber Defense & Red Sea Maritime Routes',
    summary: 'Multinational maritime coalitions bolster naval patrols and digital infrastructure resilience against persistent disruption risks.',
    fullArticleContent: `Delegates from 30 nations gathered at the International Maritime & Cyber Security Summit to coordinate defense postures against electronic warfare, submarine cable tampering, and commercial shipping disruption.`,
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

  // 🏛️ POLITICS & ECONOMY
  {
    id: 'pol-1',
    title: 'Central Banks Signal Monetary Policy Shifts as Global Inflation Cools',
    summary: 'Reserve Bank of India and global monetary authorities evaluate rate adjustments amidst resilient GDP growth indicators.',
    fullArticleContent: `Global financial markets reacted positively as central bank governors indicated a stabilization phase in interest rate policy. With core inflation trending downward across major economies, central banks are balancing rate adjustments to foster sustained capital investment.`,
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

  // 🎬 MOVIES & POP CULTURE
  {
    id: 'mov-1',
    title: 'Blockbuster Sci-Fi Epic Shatters Box Office Records with IMAX 70mm Runs',
    summary: 'Cinematic audiences flood theaters globally as auteur-driven sci-fi storytelling proves the enduring power of theatrical releases.',
    fullArticleContent: `Auteur sci-fi cinema experienced a historic weekend as specialty format IMAX 70mm prints sold out weeks in advance across Los Angeles, London, Mumbai, and Tokyo.`,
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

  // 🎮 GAMING & ESPORTS
  {
    id: 'gam-1',
    title: 'Next-Gen Game Engine Showcase Demonstrates Real-Time Physics & Neural Rendering',
    summary: 'Developers unveil photorealistic open-world environments running at locked 60FPS on modern hardware using neural reconstruction.',
    fullArticleContent: `Game engine architects presented a revolutionary real-time rendering pipeline utilizing neural radiosities and dynamic geometry compression.`,
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

  // 🌦️ WEATHER & CLIMATE
  {
    id: 'wea-1',
    title: 'Monsoon Patterns Bring Revitalizing Rainfall Across Peninsular India',
    summary: 'Meteorological department reports favorable agricultural rainfall distribution, boosting reservoir levels and crop sowing metrics.',
    fullArticleContent: `The India Meteorological Department (IMD) reports that monsoon rainfall distribution across southern and central farming belts has replenished key agricultural reservoirs to 85% capacity.`,
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
