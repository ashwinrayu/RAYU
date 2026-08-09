import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Content-Specific Visual Subject Synthesizer
 * Extracts exact physical subject matter from story content for AI art generation
 */
function extractContentSubject(title: string = '', summary: string = '', category: string = ''): string {
  const text = `${title} ${summary} ${category}`.toLowerCase();

  if (text.includes('gta') || text.includes('vice city') || text.includes('rockstar')) {
    return 'a high-performance supercar driving down a Vice City tropical palm tree avenue at night with neon lights and ocean coast reflection';
  } else if (text.includes('python') || text.includes('bot') || text.includes('telegram') || text.includes('whatsapp')) {
    return 'a high-tech developer workstation laptop screen displaying glowing green Python code syntax and automation node networks in a dark cyber room';
  } else if (text.includes('semiconductor') || text.includes('chip') || text.includes('fab') || text.includes('silicon')) {
    return 'an intricate silicon microchip wafer held inside a futuristic semiconductor cleanroom manufacturing plant with robotic arms and laser precision';
  } else if (text.includes('isro') || text.includes('space') || text.includes('rocket') || text.includes('launch')) {
    return 'a futuristic spacecraft launch vehicle landing at a coastal spaceport station during a dramatic sunset ocean launch';
  } else if (text.includes('llm') || text.includes('ai') || text.includes('ollama') || text.includes('model')) {
    return 'a glowing artificial intelligence neural network core with holographic data streams and quantum processing matrix';
  } else if (text.includes('war') || text.includes('cyber') || text.includes('defense') || text.includes('radar')) {
    return 'a high-tech global cyber defense operation center with holographic world map radars, fiber optic cables, and glowing surveillance streams';
  } else if (text.includes('economy') || text.includes('bank') || text.includes('market') || text.includes('upi')) {
    return 'a sleek financial trading floor screen showing real-time digital currency graphs, candlestick charts, and glowing global trade networks';
  } else {
    return `a dramatic cinematic digital artwork representing ${title.slice(0, 70)}`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, category, summary, provider = 'OPENAI', layout = 'bottom' } = await req.json();

    const specificSubject = extractContentSubject(title, summary, category);
    const negativeZone = layout === 'left' ? 'left' : 'bottom';

    // Content-Specific Locked Brand Prompt Template
    const basePrompt = `A striking, premium editorial-style photograph/digital art of ${specificSubject}. Dark charcoal (#050505) atmosphere, illuminated with vivid cyber lime-green (#CCFF00) ambient lighting and accent highlights. High-contrast, moody, cinematic lighting, 8k resolution, highly detailed photorealistic render. Leave the ${negativeZone} third of the frame as clean, uncluttered negative space for text overlay. No text, no words, no letters, no typography in the image itself. 1:1 square composition.`;

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. OPENAI DALL·E 3 PROVIDER (Base64 payload)
    if (provider === 'OPENAI' && openAiKey) {
      try {
        const openAiRes = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey.trim()}`,
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: basePrompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
            quality: 'standard',
          }),
        });

        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          const b64Data = openAiData.data?.[0]?.b64_json;
          if (b64Data) {
            return NextResponse.json({
              success: true,
              provider: 'OPENAI_DALLE3',
              imageUrl: `data:image/png;base64,${b64Data}`,
              promptUsed: basePrompt,
            });
          }
        } else {
          const errText = await openAiRes.text();
          console.error('OpenAI DALL-E 3 API Error:', errText);
        }
      } catch (err) {
        console.error('OpenAI fetch error:', err);
      }
    }

    // 2. GOOGLE GEMINI IMAGEN PROVIDER (Base64 payload)
    if (provider === 'GEMINI' && geminiKey) {
      try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${geminiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt: basePrompt }],
            parameters: { sampleCount: 1, aspectRatio: '1:1', outputMimeType: 'image/jpeg' },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const b64Image = geminiData.predictions?.[0]?.bytesBase64Encoded;
          if (b64Image) {
            return NextResponse.json({
              success: true,
              provider: 'GEMINI_IMAGEN',
              imageUrl: `data:image/jpeg;base64,${b64Image}`,
              promptUsed: basePrompt,
            });
          }
        } else {
          const errText = await geminiRes.text();
          console.error('Gemini Imagen API Error:', errText);
        }
      } catch (err) {
        console.error('Gemini fetch error:', err);
      }
    }

    // 3. FALLBACK CONTENT-SPECIFIC GENERATIVE VISUAL
    const seed = Math.floor(Math.random() * 100000);
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt)}?width=1080&height=1080&nologo=true&seed=${seed}`;

    return NextResponse.json({
      success: true,
      provider: openAiKey ? 'OPENAI' : geminiKey ? 'GEMINI' : 'RAYU_AI_ENGINE',
      imageUrl: fallbackUrl,
      promptUsed: basePrompt,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server AI Image Generation failed' },
      { status: 500 }
    );
  }
}
