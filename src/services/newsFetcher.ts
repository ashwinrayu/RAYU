export interface OmniNewsItem {
  id: string;
  title: string;
  summary: string;
  fullArticleContent: string;
  keyFacts: string[];
  rayuTakeaway: string;
  url: string;
  source: string;
  category: 'INDIA' | 'WAR' | 'POLITICS' | 'TECH' | 'MOVIES' | 'GAMING' | 'WEATHER';
  region: 'INDIA' | 'GLOBAL';
  dateGroup: 'TODAY' | 'YESTERDAY' | 'PAST_WEEK' | 'ARCHIVE';
  publishedAt: string;
  readTime?: string;
  imageUrl?: string;
  badgeColor?: string;
}

export const OMNI_NEWS_DATA: OmniNewsItem[] = [
  // 🇮🇳 INDIA DEVELOPMENTS (TODAY & YESTERDAY)
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
    fullArticleContent: `India’s payment infrastructure continues its worldwide expansion as UPI integration completes across retail and banking networks in France, Singapore, UAE, Mauritius, and Sri Lanka.

Cross-border settlements allow Indian travelers and international merchants to transact instantaneously using real-time QR rails without exorbitant exchange fees.`,
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
  {
    id: 'ind-4',
    title: 'India AI Mission Allocates Supercomputing Compute Clusters for Domestic Startups',
    summary: 'Government approves deployment of 10,000+ GPU supercomputing clusters to democratize foundation model training for Indian founders.',
    fullArticleContent: `Under the IndiaAI initiative, high-density GPU supercomputing hubs are being provisioned across national data centers in Bengaluru, Hyderabad, and Pune.

Startups and research institutions will gain subsidized access to compute clusters for training sovereign language models tuned for regional Indian languages.`,
    keyFacts: [
      '10,000+ enterprise GPUs provisioned for AI startups',
      'Focus on multilingual LLMs across 22 official Indian languages',
      'Subsidized cloud infrastructure allocation for indigenous researchers',
    ],
    rayuTakeaway: 'Compute is the oil of the 21st century. Provisioning sovereign GPU clusters ensures Indian founders build world-class AI models locally.',
    url: 'https://news.google.com/search?q=India+AI+Mission',
    source: 'Economic Times',
    category: 'INDIA',
    region: 'INDIA',
    dateGroup: 'YESTERDAY',
    publishedAt: 'YESTERDAY',
    readTime: '4 MIN READ',
    badgeColor: '#CCFF00',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  },

  // 🤖 TECH & AI (TODAY & YESTERDAY)
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
  {
    id: 'tech-2',
    title: 'Quantum Hardware Reaches Fault-Tolerant Logical Qubit Threshold',
    summary: 'Researchers demonstrate surface code error correction operating below threshold error rates in scalable superconducting processors.',
    fullArticleContent: `Physics laboratories have achieved a landmark result in fault-tolerant quantum computing. By multiplexing hundreds of physical qubits into error-corrected logical qubits, the system maintained quantum coherence across thousands of gate operations.

This milestone confirms the viability of fault-tolerant quantum algorithms for molecular synthesis, cryptography, and complex material simulation.`,
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
  {
    id: 'tech-3',
    title: 'Next.js 16 & Turbopack 2.0 Revolutionize Instant Web Compilation Speeds',
    summary: 'Next-generation web framework architecture reduces cold server start times to under 100ms with incremental module graph caching.',
    fullArticleContent: `The Next.js team released core engine updates leveraging Rust-based Turbopack 2.0. By shifting bundler resolution to memory-mapped parallel threads, complex web applications build 5x faster in production.

Developers report near-zero hot module replacement (HMR) latency, transforming modern web application performance.`,
    keyFacts: [
      '5x faster cold production build compilation times',
      'Memory-mapped Rust dependency graph caching',
      'Zero-lag hot module replacement across monorepo projects',
    ],
    rayuTakeaway: 'Developer speed is competitive advantage. Sub-second feedback loops turn software engineering into flow state creation.',
    url: 'https://nextjs.org',
    source: 'Vercel / Next.js',
    category: 'TECH',
    region: 'GLOBAL',
    dateGroup: 'YESTERDAY',
    publishedAt: 'YESTERDAY',
    readTime: '3 MIN READ',
    badgeColor: '#CCFF00',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },

  // ⚡ WAR & GEOPOLITICS
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
  {
    id: 'war-2',
    title: 'Autonomous Drone Swarm Treaties Take Center Stage at UN Disarmament Talks',
    summary: 'Diplomats push for strict international protocols governing AI-directed offensive hardware and electronic warfare escalation.',
    fullArticleContent: `UN delegates introduced draft international conventions governing kinetic autonomous weaponry. The treaty proposals mandate human-in-the-loop oversight for lethal autonomous targeting systems and ban AI-driven decision systems from nuclear command architecture.`,
    keyFacts: [
      'Mandatory human verification required for lethal targeting',
      'Prohibition of autonomous AI integration into strategic deterrence networks',
      'Verification protocols for electromagnetic pulse (EMP) defense platforms',
    ],
    rayuTakeaway: 'Ethical guardrails must outpace military hardware proliferation. Autonomous warfare without human accountability is existential risk.',
    url: 'https://www.bbc.com/news/world',
    source: 'BBC World',
    category: 'WAR',
    region: 'GLOBAL',
    dateGroup: 'TODAY',
    publishedAt: '42 MINS AGO',
    readTime: '4 MIN READ',
    badgeColor: '#FF4D4D',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
  },

  // 🏛️ POLITICS & ECONOMY
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
  {
    id: 'pol-2',
    title: 'Global Supply Chain Realignment Favors South Asian Manufacturing Hubs',
    summary: 'Multinational electronics and automotive giants expand manufacturing footprints in India and Vietnam.',
    fullArticleContent: `Supply chain managers are executing diversification strategies to build regional redundancy. Major consumer hardware manufacturers have doubled capital expenditure in South Asian industrial corridors, citing skilled workforce availability and infrastructure modernization.`,
    keyFacts: [
      'Industrial capex investment up 35% across South Asian corridors',
      'Multinational hardware firms establish twin-hub supply networks',
      'Infrastructure expressways reduce port freight transit times by 40%',
    ],
    rayuTakeaway: 'Supply chain resilience is global strategy #1. Multi-hub manufacturing guarantees continuity during geopolitical turbulence.',
    url: 'https://www.ft.com',
    source: 'Financial Times',
    category: 'POLITICS',
    region: 'GLOBAL',
    dateGroup: 'PAST_WEEK',
    publishedAt: '3 DAYS AGO',
    readTime: '4 MIN READ',
    badgeColor: '#FFB800',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },

  // 🎬 MOVIES & POP CULTURE
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
  {
    id: 'mov-2',
    title: 'Indian Cinema Wave Continues International Dominance at Global Film Festivals',
    summary: 'Pan-Indian productions secure major distribution deals across North America, Europe, and East Asian markets.',
    fullArticleContent: `Indian filmmakers captured top jury honors at premier European and Asian film festivals. International distributors are bidding aggressively for worldwide theatrical rights as global audiences embrace diverse mythological and action storytelling.`,
    keyFacts: [
      'Record international box office pre-sales across 40 countries',
      'Cross-cultural theatrical distribution deals signed in Cannes & Berlin',
      'Streaming platforms invest heavily in regional Indian auteur slates',
    ],
    rayuTakeaway: 'Storytelling rooted in deep cultural identity resonates universally. Indian cinema is expanding its global footprint permanently.',
    url: 'https://hollywoodreporter.com',
    source: 'The Hollywood Reporter',
    category: 'MOVIES',
    region: 'INDIA',
    dateGroup: 'PAST_WEEK',
    publishedAt: '4 DAYS AGO',
    readTime: '3 MIN READ',
    badgeColor: '#FF00AA',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
  },

  // 🎮 GAMING & ESPORTS
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
  {
    id: 'gam-2',
    title: 'Global Esports World Cup Sets Prize Pool Records with Millions Tuning In',
    summary: 'Competitive gaming tournaments record unprecedented concurrent viewer metrics across Twitch, YouTube, and regional broadcasts.',
    fullArticleContent: `The Esports World Cup concluded with record breaking viewership metrics across tactical shooters, strategy games, and sim-racing titles. Over 3.5 Million concurrent viewers watched the grand finals as underdog teams claimed championship trophies.`,
    keyFacts: [
      '$60M total multi-game tournament prize pool',
      '3.5M peak concurrent stream viewers globally',
      'Rapid viewership expansion across India, Middle East, and Latin America',
    ],
    rayuTakeaway: 'Esports is mainstream youth culture. Interactive competitive entertainment commands higher engagement than traditional broadcast sports.',
    url: 'https://polygon.com',
    source: 'Polygon',
    category: 'GAMING',
    region: 'GLOBAL',
    dateGroup: 'PAST_WEEK',
    publishedAt: '5 DAYS AGO',
    readTime: '3 MIN READ',
    badgeColor: '#00F0FF',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
  },

  // 🌦️ WEATHER & CLIMATE
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
  {
    id: 'wea-2',
    title: 'NASA Earth Observatory Tracks Atmospheric Jet Stream Anomalies',
    summary: 'Satellite remote sensing networks provide real-time thermal telemetry on ocean currents and global atmospheric circulation patterns.',
    fullArticleContent: `NASA satellite constellation data reveals shifts in upper-atmosphere jet stream speeds. Climatologists are leveraging satellite lidar and thermal imaging to refine predictive extreme weather models.`,
    keyFacts: [
      'Real-time atmospheric lidar scanning from Earth orbit',
      'Improves 14-day severe weather forecasting accuracy by 25%',
      'Open satellite telemetry accessible to global climate researchers',
    ],
    rayuTakeaway: 'Space-based climate telemetry is essential infrastructure for planetary risk mitigation and agricultural planning.',
    url: 'https://earthobservatory.nasa.gov',
    source: 'NASA Earth Observatory',
    category: 'WEATHER',
    region: 'GLOBAL',
    dateGroup: 'ARCHIVE',
    publishedAt: '6 DAYS AGO',
    readTime: '3 MIN READ',
    badgeColor: '#00FF66',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
  },
];

export async function fetchLiveOmniNews(): Promise<OmniNewsItem[]> {
  return OMNI_NEWS_DATA;
}

export function getNewsById(id: string): OmniNewsItem | undefined {
  return OMNI_NEWS_DATA.find((item) => item.id === id);
}
