import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * RAYU Studio V2 — Vision Content Extraction API Route
 *
 * Sequentially tests vision-capable models:
 * 1. Groq Vision (llama-3.2-11b-vision-preview)
 * 2. OpenAI Vision (gpt-4o-mini)
 * 3. Gemini Vision (gemini-1.5-flash)
 *
 * Returns structured JSON:
 * { title, category, summary, rayuTakeaway } in RAYU's raw/unfiltered voice.
 */

const SYSTEM_PROMPT = `You are RAYU's executive content editor. 
Analyze the visible text and visual concepts in this uploaded image/screenshot.
Extract and synthesize structured JSON:
{
  "title": "Clear, punchy, UPPERCASE headline in RAYU's raw/unfiltered editorial voice (under 10 words)",
  "category": "One of: TECH, WORLD, LIFE, LEARNINGS",
  "summary": "1-2 sentence supporting body summary describing what is shown or discussed in this image",
  "rayuTakeaway": "1 short, punchy editorial insight in RAYU's voice"
}
Rules: Output ONLY raw valid JSON. No markdown backticks or commentary.`;

async function tryGroqVision(imageBase64: string, groqKey: string) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.2-11b-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: SYSTEM_PROMPT },
            { type: 'image_url', image_url: { url: imageBase64 } },
          ],
        },
      ],
      max_tokens: 350,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Groq Vision HTTP ${res.status}: ${text.slice(0, 150)}`);
  }

  const data = await res.json();
  const rawContent = data.choices?.[0]?.message?.content?.trim() || '';
  const cleanedJson = rawContent.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
  return JSON.parse(cleanedJson);
}

async function tryOpenAiVision(imageBase64: string, openAiKey: string) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: SYSTEM_PROMPT },
            { type: 'image_url', image_url: { url: imageBase64 } },
          ],
        },
      ],
      max_tokens: 350,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI Vision HTTP ${res.status}: ${text.slice(0, 150)}`);
  }

  const data = await res.json();
  const rawContent = data.choices?.[0]?.message?.content?.trim() || '';
  const cleanedJson = rawContent.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
  return JSON.parse(cleanedJson);
}

async function tryGeminiVision(imageBase64: string, geminiKey: string) {
  if (!geminiKey.startsWith('AIza')) {
    throw new Error(`Gemini Key warning: format is OAuth, requires AI Studio key starting with AIzaSy...`);
  }

  const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: SYSTEM_PROMPT },
              { inlineData: { mimeType, data: cleanBase64 } },
            ],
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini Vision HTTP ${res.status}: ${text.slice(0, 150)}`);
  }

  const data = await res.json();
  const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
  const cleanedJson = rawContent.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
  return JSON.parse(cleanedJson);
}

export async function POST(req: NextRequest) {
  const errors: string[] = [];

  try {
    const body = await req.json();
    const { imageBase64 = '', originalBase64 = '', imageUrl = '' } = body;
    const targetImage = imageBase64 || originalBase64 || imageUrl;

    if (!targetImage) {
      return NextResponse.json(
        { success: false, error: 'No image data payload provided for vision analysis' },
        { status: 400 }
      );
    }

    const groqKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const openAiKey = (process.env.OPENAI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const geminiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');

    // 1. Try Groq Llama 3.2 Vision
    if (groqKey) {
      try {
        console.log('[RAYU Vision] Attempting Groq Vision API...');
        const parsed = await tryGroqVision(targetImage, groqKey);
        if (parsed?.title) {
          return NextResponse.json({
            success: true,
            providerUsed: 'Groq Llama 3.2 Vision',
            title: parsed.title.toUpperCase(),
            category: parsed.category || 'TECH',
            summary: parsed.summary || parsed.title,
            rayuTakeaway: parsed.rayuTakeaway || parsed.summary,
          });
        }
      } catch (err: any) {
        console.warn('[RAYU Vision] Groq failed:', err.message);
        errors.push(`Groq Vision: ${err.message}`);
      }
    }

    // 2. Try OpenAI GPT-4o-mini Vision
    if (openAiKey) {
      try {
        console.log('[RAYU Vision] Attempting OpenAI Vision API...');
        const parsed = await tryOpenAiVision(targetImage, openAiKey);
        if (parsed?.title) {
          return NextResponse.json({
            success: true,
            providerUsed: 'OpenAI GPT-4o-mini Vision',
            title: parsed.title.toUpperCase(),
            category: parsed.category || 'TECH',
            summary: parsed.summary || parsed.title,
            rayuTakeaway: parsed.rayuTakeaway || parsed.summary,
          });
        }
      } catch (err: any) {
        console.warn('[RAYU Vision] OpenAI failed:', err.message);
        errors.push(`OpenAI Vision: ${err.message}`);
      }
    }

    // 3. Try Gemini 1.5 Flash Vision
    if (geminiKey) {
      try {
        console.log('[RAYU Vision] Attempting Gemini Vision API...');
        const parsed = await tryGeminiVision(targetImage, geminiKey);
        if (parsed?.title) {
          return NextResponse.json({
            success: true,
            providerUsed: 'Gemini 1.5 Flash Vision',
            title: parsed.title.toUpperCase(),
            category: parsed.category || 'TECH',
            summary: parsed.summary || parsed.title,
            rayuTakeaway: parsed.rayuTakeaway || parsed.summary,
          });
        }
      } catch (err: any) {
        console.warn('[RAYU Vision] Gemini failed:', err.message);
        errors.push(`Gemini Vision: ${err.message}`);
      }
    }

    // Explicit error response if all vision providers failed
    return NextResponse.json(
      {
        success: false,
        error: `All Vision AI models failed to extract content. Errors: ${errors.join(' | ')}`,
        errors,
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error('[RAYU Vision] Unexpected Route Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Vision Extraction Error: ${error.message || String(error)}`,
      },
      { status: 500 }
    );
  }
}
