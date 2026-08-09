import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * RAYU AI Visual Engine — Free AI Stack
 *
 * Stage 1 (Prompt): Groq Llama 3 (FREE) reads story title+summary+category
 *                   and writes a hyper-specific photographic scene description.
 *
 * Stage 2 (Image):  Hugging Face FLUX.1-schnell (FREE) renders the image.
 *                   Falls back to DALL-E 3 (if credits), then Pollinations AI.
 *
 * All free options produce genuinely content-specific images tied to the story.
 */

// ── Stage 1A: Groq Llama 3 (FREE) prompt builder ──────────────────────────
async function buildPromptWithGroq(
  title: string,
  summary: string,
  category: string,
  groqKey: string
): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a world-class art director for a premium digital news magazine called RAYU.
Given a news story, describe a single striking, hyper-realistic photographic scene that visually represents the EXACT subject of that story.
Rules:
- Describe ONE specific real-world physical scene. Be ultra-specific to THIS story — not a generic stock photo.
- Name the subject, location/setting, lighting, mood, camera angle.
- No text, typography, logos, or words in the scene.
- Under 90 words.
- End with: "Cinematic dark atmosphere, neon cyber-lime green (#CCFF00) accent lighting, 8k photorealistic render, lower third left as clean empty dark space."`,
        },
        {
          role: 'user',
          content: `Headline: "${title}"\nCategory: ${category}\nSummary: "${summary}"\n\nDescribe the visual scene:`,
        },
      ],
      max_tokens: 200,
      temperature: 0.8,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq error (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const prompt = data.choices?.[0]?.message?.content?.trim();
  if (!prompt) throw new Error('Groq returned empty prompt');
  return prompt;
}

// ── Stage 1B: Smart server-side fallback prompt builder ───────────────────
// Works with zero API calls — still produces content-specific results
function buildFallbackPrompt(title: string, summary: string, category: string): string {
  const text = `${title} ${summary}`.toLowerCase();
  const titleWords = title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(' ')
    .filter(w => w.length > 3 && !['with', 'from', 'that', 'this', 'have', 'will', 'been', 'they', 'what', 'when', 'than', 'more'].includes(w.toLowerCase()))
    .slice(0, 6)
    .join(' ');

  let scene = '';

  if (text.match(/gta|grand theft|vice city|rockstar/)) {
    scene = 'A gleaming neon-lit Vice City coastal boulevard at midnight with a luxury sports car tearing past palm trees and ocean reflections on wet asphalt, photorealistic game environment';
  } else if (text.match(/fortnite|minecraft|call of duty|battlefield|elden ring|cyberpunk|gaming|gameplay|esports/)) {
    scene = `A cinematic photorealistic video game environment scene related to ${titleWords}, dramatic in-engine lighting, ultra-high detail`;
  } else if (text.match(/chip|semiconductor|silicon|fab|nvidia|intel|tsmc/)) {
    scene = 'A gleaming silicon microchip wafer under blue UV cleanroom lights held by robotic precision arms in a semiconductor fabrication plant';
  } else if (text.match(/ai|artificial intelligence|llm|openai|gemini|chatgpt|robot|neural/)) {
    scene = `A glowing humanoid AI robot interfacing with a holographic neural network grid in a dark tech lab, related to ${titleWords}`;
  } else if (text.match(/space|rocket|nasa|isro|satellite|orbit|launch|spacecraft|moon|mars/)) {
    scene = text.includes('moon') || text.includes('lunar')
      ? 'Astronauts planting a flag on the moon surface with Earth rising dramatically on the horizon'
      : 'A massive rocket launching from a coastal pad at dusk with brilliant engine plumes reflected in ocean water below';
  } else if (text.match(/bitcoin|crypto|ethereum|blockchain|defi|nft/)) {
    scene = 'A glowing Bitcoin coin on a dark circuit board with live green candlestick trading charts reflected across curved screens in a dark room';
  } else if (text.match(/india|modi|parliament|delhi|mumbai|election|government|rupee|economy|gdp/)) {
    scene = text.includes('parliament') || text.includes('government')
      ? 'The Indian Parliament building in New Delhi photographed at golden hour with dramatic monsoon clouds'
      : text.includes('economy') || text.includes('market')
      ? 'The Bombay Stock Exchange trading floor at peak hours with glowing screens and Indian traders'
      : `A dramatic photorealistic documentary scene of India: ${titleWords}`;
  } else if (text.match(/war|military|army|missile|nato|ukraine|russia|israel|conflict|drone|soldier/)) {
    scene = text.includes('drone')
      ? 'Military surveillance drones flying in formation above a city at night with thermal imaging displays'
      : 'A high-tech military operations center with glowing radar screens, maps, and operators in a dark command bunker';
  } else if (text.match(/movie|film|bollywood|hollywood|actor|netflix|cinema|director|trailer/)) {
    scene = text.includes('bollywood')
      ? 'A glamorous Bollywood film set in Mumbai with professional cinema cameras, dramatic lighting rigs, and performers in costume'
      : 'A Hollywood blockbuster premiere red carpet with cascading camera flashes and a crowd of photographers';
  } else if (text.match(/flood|storm|cyclone|earthquake|wildfire|drought|monsoon|climate/)) {
    scene = text.includes('flood')
      ? 'Aerial view of a city street flooded with brown water with rescue boats navigating between submerged vehicles'
      : text.includes('fire') || text.includes('wildfire')
      ? 'A raging wildfire consuming a hillside at night with towering orange flames and thick smoke against a dark sky'
      : 'A massive dark storm system approaching a coastline with towering black cumulonimbus clouds and lightning';
  } else if (text.match(/health|medical|hospital|vaccine|drug|cancer|virus|research|pharma/)) {
    scene = 'Scientists in a cutting-edge medical research laboratory examining glowing vials and microscopy slides under bright sterile lights';
  } else if (text.match(/python|code|developer|software|app|startup|hack|programming/)) {
    scene = 'A developer workstation at night with multiple curved monitors displaying glowing code syntax, mechanical keyboard, and ambient LED strips';
  } else {
    scene = `A dramatic, premium editorial photorealistic scene depicting the news story: "${title}". ${summary?.slice(0, 100)}`;
  }

  return `${scene}. Cinematic dark atmosphere, neon cyber-lime green (#CCFF00) accent lighting and highlights, 8k photorealistic render, highly detailed. Lower third of frame is clean empty dark negative space for text overlay. No text or words. Square 1:1.`;
}

// ── Stage 2A: Hugging Face FLUX.1-schnell (FREE) ─────────────────────────
async function generateWithHuggingFace(prompt: string, hfKey: string): Promise<string | null> {
  // Try FLUX.1-schnell first (fastest, free)
  const models = [
    'black-forest-labs/FLUX.1-schnell',
    'stabilityai/stable-diffusion-xl-base-1.0',
  ];

  for (const model of models) {
    try {
      const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hfKey}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            width: 1024,
            height: 1024,
            num_inference_steps: model.includes('schnell') ? 4 : 20,
            guidance_scale: model.includes('schnell') ? 0 : 7.5,
          },
        }),
      });

      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.startsWith('image/')) {
          const buffer = await res.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          const mimeType = contentType.includes('png') ? 'image/png' : 'image/jpeg';
          console.log(`[RAYU AI] ✅ HuggingFace ${model} generated image`);
          return `data:${mimeType};base64,${base64}`;
        }
      } else {
        const errText = await res.text();
        console.warn(`[RAYU AI] HuggingFace ${model} error (${res.status}):`, errText.slice(0, 150));
        // If model is loading (503), try next
        if (res.status === 503) continue;
      }
    } catch (err) {
      console.warn(`[RAYU AI] HuggingFace ${model} fetch error:`, String(err).slice(0, 100));
    }
  }
  return null;
}

// ── Stage 2B: DALL-E 3 (if credits available) ────────────────────────────
async function generateWithDallE(prompt: string, openAiKey: string): Promise<string | null> {
  try {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const url = data.data?.[0]?.url;
      if (url) {
        console.log('[RAYU AI] ✅ DALL-E 3 success');
        return url;
      }
    } else {
      const errText = await res.text();
      console.warn('[RAYU AI] DALL-E 3 error:', res.status, errText.slice(0, 150));
    }
  } catch (err) {
    console.warn('[RAYU AI] DALL-E 3 fetch error:', String(err).slice(0, 100));
  }
  return null;
}

// ── Main Handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title = '', category = '', summary = '', provider = 'AUTO' } = body;

    const openAiKey = (process.env.OPENAI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const geminiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const groqKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const hfKey = (process.env.HUGGINGFACE_API_KEY || '').trim().replace(/^["']|["']$/g, '');

    console.log(`[RAYU AI] Story: "${title.slice(0, 60)}" [${category}]`);
    console.log(`[RAYU AI] Keys: Groq=${groqKey ? 'yes' : 'no'} HF=${hfKey ? 'yes' : 'no'} OpenAI=${openAiKey.startsWith('sk-') ? 'yes' : 'no'}`);

    // ── Stage 1: Build content-specific visual prompt ──────────────────────
    let visualPrompt: string | null = null;
    let promptSource = 'fallback';

    // Try Groq first (free, best quality prompt)
    if (groqKey.startsWith('gsk_')) {
      try {
        visualPrompt = await buildPromptWithGroq(title, summary, category, groqKey);
        promptSource = 'groq-llama3';
        console.log('[RAYU AI] ✅ Groq prompt:', visualPrompt.slice(0, 100));
      } catch (err) {
        console.warn('[RAYU AI] Groq prompt failed:', String(err).slice(0, 150));
      }
    }

    // Try OpenAI GPT-4o Mini for prompt building
    if (!visualPrompt && openAiKey.startsWith('sk-')) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openAiKey}` },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a world-class art director. Given a news story, describe one specific hyper-realistic photographic scene (under 90 words, no text in scene) that directly represents this story. End with: "Cinematic dark atmosphere, neon cyber-lime green accent lighting, 8k photorealistic render, lower third empty dark space."' },
              { role: 'user', content: `Headline: "${title}"\nCategory: ${category}\nSummary: "${summary}"\n\nDescribe the visual:` },
            ],
            max_tokens: 200,
            temperature: 0.8,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const p = data.choices?.[0]?.message?.content?.trim();
          if (p) { visualPrompt = p; promptSource = 'gpt-4o-mini'; }
        }
      } catch (err) {
        console.warn('[RAYU AI] GPT prompt failed:', String(err).slice(0, 100));
      }
    }

    // Fallback: smart server-side content analysis (no API needed)
    if (!visualPrompt) {
      visualPrompt = buildFallbackPrompt(title, summary, category);
      promptSource = 'smart-fallback';
    }

    console.log(`[RAYU AI] Prompt source: ${promptSource}`);

    // ── Stage 2: Generate image ────────────────────────────────────────────

    // Option A: HuggingFace FLUX.1 (free)
    if (hfKey.startsWith('hf_') && (provider === 'AUTO' || provider === 'HUGGINGFACE')) {
      const imageUrl = await generateWithHuggingFace(visualPrompt, hfKey);
      if (imageUrl) {
        return NextResponse.json({ success: true, provider: 'HUGGINGFACE_FLUX', imageUrl, promptUsed: visualPrompt, promptSource });
      }
    }

    // Option B: DALL-E 3 (if credits)
    if (openAiKey.startsWith('sk-') && (provider === 'AUTO' || provider === 'OPENAI')) {
      const imageUrl = await generateWithDallE(visualPrompt, openAiKey);
      if (imageUrl) {
        return NextResponse.json({ success: true, provider: 'OPENAI_DALLE3', imageUrl, promptUsed: visualPrompt, promptSource });
      }
    }

    // Option C: Gemini Imagen (if valid key)
    if (geminiKey.startsWith('AIza') && (provider === 'AUTO' || provider === 'GEMINI')) {
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
            return NextResponse.json({ success: true, provider: 'GEMINI_IMAGEN3', imageUrl: `data:image/jpeg;base64,${b64}`, promptUsed: visualPrompt, promptSource });
          }
        }
      } catch (err) {
        console.warn('[RAYU AI] Gemini error:', String(err).slice(0, 100));
      }
    }

    // Option D: Pollinations AI Flux (zero auth, always works)
    const seed = Math.floor(Math.random() * 999999);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(visualPrompt)}?width=1080&height=1080&nologo=true&seed=${seed}&model=flux`;
    console.log('[RAYU AI] Using Pollinations Flux');

    return NextResponse.json({
      success: true,
      provider: 'POLLINATIONS_FLUX',
      imageUrl: pollinationsUrl,
      promptUsed: visualPrompt,
      promptSource,
    });

  } catch (error) {
    console.error('[RAYU AI] Fatal error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
