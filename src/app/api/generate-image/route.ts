import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * RAYU AI Visual Engine — Two-Stage Pipeline
 * Stage 1: GPT-4o Mini analyzes the story content and produces a rich, specific visual scene description
 * Stage 2: DALL-E 3 renders that scene description into a cinematic 1080x1080 image
 *
 * This ensures every image is directly tied to the actual story content,
 * not generic category defaults.
 */

async function buildVisualPromptWithGPT(
  title: string,
  summary: string,
  category: string,
  openAiKey: string
): Promise<string> {
  const systemPrompt = `You are a world-class art director for a premium digital news magazine.
Given a news headline and summary, you describe a single, striking, hyper-realistic photographic scene that *visually represents the core subject* of that story.

Rules:
- Describe ONE real-world physical scene — a specific place, object, person, or event captured as if by a pro photographer.
- Do NOT include text, typography, banners, or written words in the scene.
- Be ultra-specific: name the subject, the lighting, the environment, the mood, the camera angle.
- The scene must feel directly related to the story — not generic.
- Keep it under 120 words.
- End with: "Dark charcoal atmosphere, cyber-lime green (#CCFF00) accent lighting, 8k photorealistic render, cinematic composition, lower third left as empty dark space for text overlay."`;

  const userPrompt = `News Headline: "${title}"
Category: ${category}
Summary: "${summary}"

Describe the perfect photorealistic visual scene for this story:`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiKey.trim()}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 180,
      temperature: 0.85,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('GPT-4o Mini prompt builder error:', err);
    throw new Error(`GPT prompt generation failed: ${err}`);
  }

  const data = await res.json();
  const visualPrompt = data.choices?.[0]?.message?.content?.trim();
  if (!visualPrompt) throw new Error('GPT returned empty prompt');
  return visualPrompt;
}

/**
 * Gemini-based content analysis for visual prompt generation
 */
async function buildVisualPromptWithGemini(
  title: string,
  summary: string,
  category: string,
  geminiKey: string
): Promise<string> {
  const prompt = `You are a world-class art director for a premium digital news magazine.
Given a news headline and summary, describe a single, striking, hyper-realistic photographic scene that visually represents the EXACT subject of this story.

News Headline: "${title}"
Category: ${category}
Summary: "${summary}"

Rules:
- Describe ONE real physical scene — specific place, object, event.
- NO text, logos, or words in the scene.
- Ultra-specific: name the subject, lighting, environment, mood, camera angle.
- Scene must directly relate to the story — not generic stock photo.
- Under 100 words.
- End with: "Dark charcoal atmosphere, cyber-lime green accent lighting, 8k photorealistic render, cinematic, lower third as empty dark negative space."

Describe the visual scene now:`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey.trim()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 200, temperature: 0.85 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error('Gemini prompt builder error:', err);
    throw new Error(`Gemini prompt generation failed: ${err}`);
  }

  const data = await res.json();
  const visualPrompt = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!visualPrompt) throw new Error('Gemini returned empty prompt');
  return visualPrompt;
}

export async function POST(req: NextRequest) {
  try {
    const { title = '', category = '', summary = '', provider = 'OPENAI', layout = 'bottom' } = await req.json();

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    let visualPrompt: string | null = null;

    // ── STAGE 1: Intelligent Content Analysis → Rich Visual Prompt ──────────────
    // Try GPT-4o Mini first (best quality prompt generation)
    if (openAiKey) {
      try {
        visualPrompt = await buildVisualPromptWithGPT(title, summary, category, openAiKey);
        console.log('[RAYU AI] GPT-4o Mini visual prompt:', visualPrompt);
      } catch (err) {
        console.warn('[RAYU AI] GPT prompt generation failed, trying Gemini:', err);
      }
    }

    // Fallback to Gemini for prompt generation
    if (!visualPrompt && geminiKey) {
      try {
        visualPrompt = await buildVisualPromptWithGemini(title, summary, category, geminiKey);
        console.log('[RAYU AI] Gemini visual prompt:', visualPrompt);
      } catch (err) {
        console.warn('[RAYU AI] Gemini prompt generation failed:', err);
      }
    }

    // Last resort: construct prompt from raw content
    if (!visualPrompt) {
      visualPrompt = `A dramatic, cinematic photorealistic scene representing: ${title}. ${summary?.slice(0, 120)}. Dark charcoal atmosphere, cyber-lime green accent lighting, 8k render, cinematic, lower third empty dark space.`;
    }

    // ── STAGE 2: Image Generation ─────────────────────────────────────────────

    // OPENAI DALL·E 3
    if ((provider === 'OPENAI' || provider === 'AUTO') && openAiKey) {
      try {
        const imageRes = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey.trim()}`,
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: visualPrompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
            quality: 'standard',
          }),
        });

        if (imageRes.ok) {
          const imageData = await imageRes.json();
          const b64 = imageData.data?.[0]?.b64_json;
          if (b64) {
            return NextResponse.json({
              success: true,
              provider: 'OPENAI_DALLE3',
              imageUrl: `data:image/png;base64,${b64}`,
              promptUsed: visualPrompt,
            });
          }
        } else {
          const errText = await imageRes.text();
          console.error('[RAYU AI] DALL-E 3 error:', errText);
        }
      } catch (err) {
        console.error('[RAYU AI] DALL-E 3 fetch error:', err);
      }
    }

    // GEMINI IMAGEN 3
    if ((provider === 'GEMINI' || provider === 'AUTO') && geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${geminiKey.trim()}`,
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
          const b64Image = geminiData.predictions?.[0]?.bytesBase64Encoded;
          if (b64Image) {
            return NextResponse.json({
              success: true,
              provider: 'GEMINI_IMAGEN3',
              imageUrl: `data:image/jpeg;base64,${b64Image}`,
              promptUsed: visualPrompt,
            });
          }
        } else {
          const errText = await geminiRes.text();
          console.error('[RAYU AI] Gemini Imagen error:', errText);
        }
      } catch (err) {
        console.error('[RAYU AI] Gemini Imagen fetch error:', err);
      }
    }

    // ── STAGE 3: Pollinations fallback with AI-generated prompt ──────────────
    const seed = Math.floor(Math.random() * 999999);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(visualPrompt)}?width=1080&height=1080&nologo=true&seed=${seed}&model=flux`;

    return NextResponse.json({
      success: true,
      provider: 'POLLINATIONS_FLUX',
      imageUrl: pollinationsUrl,
      promptUsed: visualPrompt,
    });
  } catch (error) {
    console.error('[RAYU AI] Fatal generate-image error:', error);
    return NextResponse.json(
      { success: false, error: 'AI Image Generation pipeline failed' },
      { status: 500 }
    );
  }
}
