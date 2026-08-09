import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * RAYU AI Visual Engine
 *
 * Analyzes story content (title + summary + category) server-side to build
 * a hyper-specific, content-aware visual prompt, then renders via:
 *   1. OpenAI DALL-E 3 (if credits available)
 *   2. Gemini Imagen 3 (if valid key)
 *   3. Pollinations AI Flux (free, always works — uses the content-specific prompt)
 *
 * Even the free fallback produces content-specific images because
 * the prompt is built from the actual story text, not generic templates.
 */

/**
 * Intelligent content extractor — reads title + summary and builds
 * a rich, specific visual scene description without any external API calls.
 * Falls back gracefully when paid APIs have no credits.
 */
function buildContentAwarePrompt(title: string, summary: string, category: string): string {
  const text = `${title} ${summary}`.toLowerCase();
  const words = text.split(/\s+/).filter(w => w.length > 4);

  // Extract key nouns and proper nouns from the title (these describe the subject)
  const titleWords = title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(' ')
    .filter(w => w.length > 3 && !['with', 'from', 'that', 'this', 'have', 'will', 'been', 'they', 'what', 'when', 'than', 'more'].includes(w.toLowerCase()))
    .slice(0, 8)
    .join(' ');

  // Determine the visual theme from content
  let sceneContext = '';
  let subjectDetails = '';
  let atmosphere = '';

  // GAMING
  if (text.match(/gta|grand theft|vice city|rockstar|playstation|xbox|nintendo|gaming|gameplay|esports|fortnite|minecraft|steam|fps|rpg|mmorpg/)) {
    const gameTitle = title.match(/gta|grand theft auto|vice city|fortnite|minecraft|call of duty|battlefield|elden ring|cyberpunk/i)?.[0] || 'video game';
    sceneContext = `A photorealistic cinematic screenshot environment from ${gameTitle}`;
    subjectDetails = text.includes('gta') || text.includes('vice city')
      ? 'showing a gleaming neon-lit Miami-style coastal boulevard at night with luxury sports cars, ocean reflections, and towering glass hotels'
      : text.includes('war') || text.includes('combat') || text.includes('military')
      ? 'an intense military firefight scene with dramatic explosion lighting and soldiers in tactical gear'
      : 'showing an ultra-detailed open world environment with dramatic lighting';
    atmosphere = 'Ultra-high fidelity game graphics, photorealistic ray tracing, cinematic depth of field';
  }
  // TECH / AI
  else if (text.match(/ai|artificial intelligence|machine learning|robot|algorithm|neural|llm|openai|google|microsoft|apple|startup|silicon|chip|semiconductor|cpu|gpu|quantum/)) {
    const techSubject = text.includes('chip') || text.includes('semiconductor') || text.includes('silicon')
      ? 'a gleaming silicon microchip wafer under blue UV cleanroom lights in a semiconductor fab'
      : text.includes('robot') || text.includes('ai') || text.includes('llm')
      ? 'a humanoid robot hand reaching toward a glowing holographic AI neural network interface'
      : 'a futuristic data center with glowing server racks and holographic data streams';
    sceneContext = techSubject;
    subjectDetails = `related to: ${titleWords}`;
    atmosphere = 'Corporate tech photography, cool blue and cyan lighting, ultra sharp, 8k';
  }
  // SPACE / SCIENCE
  else if (text.match(/space|rocket|nasa|isro|satellite|moon|mars|orbit|launch|spacecraft|astronaut|telescope|planet/)) {
    const spaceSubject = text.includes('launch') || text.includes('rocket')
      ? 'a massive rocket launching from a coastal spaceport with a brilliant plume of fire and steam against a twilight sky'
      : text.includes('moon') || text.includes('lunar')
      ? 'astronauts walking on the moon surface with Earth rising dramatically in the background'
      : 'a breathtaking view from orbit showing Earth\'s curvature with a spacecraft in the foreground';
    sceneContext = spaceSubject;
    subjectDetails = `depicting: ${titleWords}`;
    atmosphere = 'NASA-style space photography, dramatic lighting, deep space blues and oranges';
  }
  // INDIA / POLITICS
  else if (text.match(/india|modi|parliament|delhi|mumbai|bengaluru|election|government|policy|minister|bjp|congress|rupee|economy|gdp/)) {
    const indiaSubject = text.includes('parliament') || text.includes('government')
      ? 'the Indian Parliament building in New Delhi at golden hour with dramatic cloud formations'
      : text.includes('economy') || text.includes('rupee') || text.includes('gdp')
      ? 'the Bombay Stock Exchange trading floor with glowing screens showing market data and Indian businesspeople'
      : text.includes('election')
      ? 'a massive Indian election rally with colorful banners and a sea of people'
      : `a photorealistic scene representing Indian news: ${titleWords}`;
    sceneContext = indiaSubject;
    subjectDetails = '';
    atmosphere = 'Documentary photojournalism style, warm golden lighting, high contrast';
  }
  // WAR / CONFLICT / GEOPOLITICS
  else if (text.match(/war|military|army|missile|nato|ukraine|russia|israel|china|conflict|attack|defense|weapon|bomb|soldier|drone/)) {
    const warSubject = text.includes('drone') || text.includes('aerial')
      ? 'military drones flying in formation over a conflict zone with smoke rising below'
      : text.includes('missile') || text.includes('weapon')
      ? 'a military command center with operators monitoring radar screens and weapons systems at night'
      : 'a geopolitical tension scene with military vehicles on alert at a border crossing at dusk';
    sceneContext = warSubject;
    subjectDetails = `related to: ${titleWords}`;
    atmosphere = 'Conflict photojournalism, dramatic shadows, muted desaturated colors, high tension';
  }
  // CRYPTO / FINANCE
  else if (text.match(/bitcoin|crypto|ethereum|blockchain|nft|defi|stock|market|trading|finance|bank|upi|fintech|investment/)) {
    const cryptoSubject = text.includes('bitcoin') || text.includes('crypto') || text.includes('ethereum')
      ? 'a glowing Bitcoin coin on a circuit board background with cryptocurrency price charts on screens'
      : 'a financial trading floor at night with dozens of screens showing green candlestick charts and global markets';
    sceneContext = cryptoSubject;
    subjectDetails = `representing: ${titleWords}`;
    atmosphere = 'Financial editorial photography, neon green and gold accents, ultra sharp 8k';
  }
  // MOVIES / ENTERTAINMENT
  else if (text.match(/movie|film|bollywood|hollywood|actor|actress|netflix|amazon prime|disney|series|trailer|release|cinema|director|oscar/)) {
    const filmSubject = text.includes('bollywood') || text.match(/khan|kapoor|kumaar|singh|sharma/)
      ? 'a Bollywood film set with dramatic studio lighting, film cameras, and glamorous performers'
      : 'a Hollywood movie premiere red carpet with bright camera flashes and a crowd of photographers';
    sceneContext = filmSubject;
    subjectDetails = `for: ${titleWords}`;
    atmosphere = 'Entertainment magazine photography, glamorous warm lighting, high contrast glossy finish';
  }
  // VIRAL / SOCIAL
  else if (text.match(/viral|trending|social media|tiktok|instagram|youtube|influencer|meme|twitter|x\.com/)) {
    sceneContext = 'a smartphone screen displaying a viral social media post going viral with thousands of notifications and shares';
    subjectDetails = `about: ${titleWords}`;
    atmosphere = 'Modern lifestyle photography, bright vibrant colors, phone screen glow';
  }
  // WEATHER / ENVIRONMENT / CLIMATE
  else if (text.match(/weather|climate|flood|storm|cyclone|earthquake|fire|drought|monsoon|rain|heat|temperature|environment/)) {
    const weatherSubject = text.includes('flood')
      ? 'aerial view of a city street flooded with brown water with rescue boats navigating between submerged cars'
      : text.includes('storm') || text.includes('cyclone')
      ? 'a massive dark storm system approaching a coastline with towering black clouds and lightning strikes'
      : text.includes('fire') || text.includes('wildfire')
      ? 'a dramatic wildfire consuming a hillside at night with bright orange flames and thick smoke plumes'
      : 'a dramatic extreme weather event with powerful storm clouds and atmospheric lighting';
    sceneContext = weatherSubject;
    subjectDetails = '';
    atmosphere = 'Nature documentary photography, dramatic natural lighting, wide angle';
  }
  // HEALTH / MEDICAL
  else if (text.match(/health|medical|hospital|doctor|vaccine|drug|disease|cancer|covid|virus|treatment|research|pharma/)) {
    sceneContext = 'a cutting-edge medical research laboratory with scientists in white coats examining glowing vials and medical equipment';
    subjectDetails = `related to: ${titleWords}`;
    atmosphere = 'Medical documentary photography, clean white and blue tones, sterile precision';
  }
  // DEFAULT — use the actual content text directly
  else {
    sceneContext = `A dramatic photorealistic editorial scene depicting the news story: "${title}"`;
    subjectDetails = summary ? `The scene shows: ${summary.slice(0, 120)}` : '';
    atmosphere = 'Premium editorial photography, cinematic lighting';
  }

  return `${sceneContext} ${subjectDetails}. ${atmosphere}. Dark charcoal background atmosphere with cyber-lime green (#CCFF00) neon accent lighting and highlights. 8k resolution, photorealistic, highly detailed. Lower third of the frame is clean dark empty negative space for text overlay. No text, no words, no typography in the image. Square 1:1 composition.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title = '',
      category = '',
      summary = '',
      provider = 'AUTO',
    } = body;

    const openAiKey = (process.env.OPENAI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const geminiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');

    // Build a rich, content-specific visual prompt from the story
    const visualPrompt = buildContentAwarePrompt(title, summary, category);

    console.log(`[RAYU AI] Story: "${title.slice(0, 60)}"`);
    console.log(`[RAYU AI] Visual prompt: ${visualPrompt.slice(0, 120)}...`);

    // ── DALL-E 3 ──────────────────────────────────────────────────────────────
    if ((provider === 'OPENAI' || provider === 'AUTO') && openAiKey.startsWith('sk-')) {
      try {
        const imageRes = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: visualPrompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
          }),
        });

        if (imageRes.ok) {
          const imageData = await imageRes.json();
          const imageUrl = imageData.data?.[0]?.url;
          if (imageUrl) {
            console.log('[RAYU AI] ✅ DALL-E 3 success');
            return NextResponse.json({ success: true, provider: 'OPENAI_DALLE3', imageUrl, promptUsed: visualPrompt });
          }
        } else {
          const errText = await imageRes.text();
          console.warn('[RAYU AI] DALL-E 3 error:', imageRes.status, errText.slice(0, 150));
        }
      } catch (err) {
        console.warn('[RAYU AI] DALL-E 3 fetch error:', String(err).slice(0, 100));
      }
    }

    // ── Gemini Imagen 3 ───────────────────────────────────────────────────────
    if ((provider === 'GEMINI' || provider === 'AUTO') && geminiKey.startsWith('AIza')) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              instances: [{ prompt: visualPrompt }],
              parameters: { sampleCount: 1, aspectRatio: '1:1', outputMimeType: 'image/jpeg' },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const b64 = geminiData.predictions?.[0]?.bytesBase64Encoded;
          if (b64) {
            console.log('[RAYU AI] ✅ Gemini Imagen 3 success');
            return NextResponse.json({
              success: true,
              provider: 'GEMINI_IMAGEN3',
              imageUrl: `data:image/jpeg;base64,${b64}`,
              promptUsed: visualPrompt,
            });
          }
        } else {
          const errText = await geminiRes.text();
          console.warn('[RAYU AI] Gemini error:', geminiRes.status, errText.slice(0, 100));
        }
      } catch (err) {
        console.warn('[RAYU AI] Gemini fetch error:', String(err).slice(0, 100));
      }
    }

    // ── Pollinations AI Flux (free, always works) ─────────────────────────────
    // Uses the content-specific prompt we built — so images ARE based on content
    const seed = Math.floor(Math.random() * 999999);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(visualPrompt)}?width=1080&height=1080&nologo=true&seed=${seed}&model=flux`;

    console.log('[RAYU AI] Using Pollinations Flux with content-specific prompt');
    return NextResponse.json({
      success: true,
      provider: 'POLLINATIONS_FLUX',
      imageUrl: pollinationsUrl,
      promptUsed: visualPrompt,
    });

  } catch (error) {
    console.error('[RAYU AI] Fatal error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
