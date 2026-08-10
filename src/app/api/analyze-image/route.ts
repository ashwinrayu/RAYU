import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * RAYU Studio V2 — Screenshot Content Synthesis API Route
 *
 * Receives extracted OCR text from browser Tesseract.js (or image base64)
 * and synthesizes structured RAYU post content using Groq Llama-3.3-70b.
 */

const SYSTEM_PROMPT = `You are RAYU's executive content editor.
You are given text extracted from an uploaded screenshot, graphic, tweet, chat, or article.
Analyze the text and synthesize structured JSON in RAYU's raw/unfiltered voice:
{
  "title": "Clear, punchy, UPPERCASE headline summarizing the main topic/subject (under 10 words, RAYU voice)",
  "category": "One of: TECH, WORLD, LIFE, LEARNINGS",
  "summary": "1-2 sentence supporting body summary describing what this screenshot/content is about",
  "rayuTakeaway": "1 short, punchy editorial insight in RAYU's raw voice"
}
Rules: Output ONLY raw valid JSON. No markdown formatting backticks.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { extractedText = '', filename = '' } = body;

    const groqKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    if (!groqKey) {
      return NextResponse.json(
        { success: false, error: 'GROQ_API_KEY environment variable is missing or empty' },
        { status: 500 }
      );
    }

    const textToSynthesize = extractedText.trim() || filename || 'GENERAL TECH CONCEPT';
    console.log(`[RAYU Analyze Route] Synthesizing ${textToSynthesize.length} chars of OCR text via Groq Llama 3.3 70b...`);

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Extracted Screenshot Text:\n"""\n${textToSynthesize.slice(0, 3000)}\n"""\n\nJSON Output:`,
          },
        ],
        max_tokens: 350,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { success: false, error: `Groq LLM HTTP ${res.status}: ${errText.slice(0, 200)}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content?.trim() || '';
    const cleanedJson = rawContent
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/, '')
      .replace(/\s*```$/, '')
      .trim();

    try {
      const parsed = JSON.parse(cleanedJson);
      const category = ['TECH', 'WORLD', 'LIFE', 'LEARNINGS'].includes(parsed.category)
        ? parsed.category
        : 'TECH';

      return NextResponse.json({
        success: true,
        providerUsed: 'Groq Llama 3.3 70b',
        title: (parsed.title || 'IDENTIFIED SCREENSHOT CONTENT').toUpperCase(),
        category,
        summary: parsed.summary || textToSynthesize.slice(0, 150),
        rayuTakeaway: parsed.rayuTakeaway || parsed.summary || 'Extracted screenshot insight.',
      });
    } catch (jsonErr) {
      console.warn('[RAYU Analyze Route] JSON parse fallback:', rawContent);
      const firstLine = textToSynthesize.split('\n')[0].slice(0, 60).toUpperCase();
      return NextResponse.json({
        success: true,
        providerUsed: 'Groq Llama 3.3 70b (Fallback)',
        title: firstLine || 'IDENTIFIED SCREENSHOT CONTENT',
        category: 'TECH',
        summary: textToSynthesize.slice(0, 200),
        rayuTakeaway: 'Content extracted from screenshot.',
      });
    }
  } catch (error: any) {
    console.error('[RAYU Analyze Route] Error:', error);
    return NextResponse.json(
      { success: false, error: `Route Error: ${error.message || String(error)}` },
      { status: 500 }
    );
  }
}
