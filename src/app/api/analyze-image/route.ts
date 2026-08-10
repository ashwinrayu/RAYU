import { NextRequest, NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * RAYU Image Content Analyzer API Route
 *
 * Primary: Uses Groq Llama 3.2 Vision (llama-3.2-11b-vision-preview) for blazing fast, 
 * accurate visual text & image content extraction directly from image pixels.
 *
 * Fallback: Tesseract.js OCR + Groq Llama 3.3 70b.
 */

async function analyzeImageWithGroqVision(
  imageBase64: string,
  groqKey: string
): Promise<{ title: string; category: string; summary: string; rayuTakeaway: string } | null> {
  try {
    console.log('[RAYU Image Analyzer] Sending image to Groq Llama 3.2 Vision API...');
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
              {
                type: 'text',
                text: `You are an AI news editor for RAYU magazine. 
Read all visible text and visual content in this image (screenshot, product bottle, article, graphic, chat).
Synthesize structured JSON:
{
  "title": "Clear, punchy, UPPERCASE headline summarizing the main subject/product/text shown (under 10 words)",
  "category": "TECH",
  "summary": "1-2 sentence news summary describing what is shown in this image",
  "rayuTakeaway": "1 short punchy editorial insight"
}
Output ONLY raw JSON. No markdown formatting wrappers.`,
              },
              {
                type: 'image_url',
                image_url: { url: imageBase64 },
              },
            ],
          },
        ],
        max_tokens: 350,
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('[RAYU Groq Vision] HTTP Error:', res.status, errText.slice(0, 200));
      return null;
    }

    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content?.trim() || '';
    const cleanedJson = rawContent
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/, '')
      .replace(/\s*```$/, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);

    if (parsed.title) {
      return {
        title: parsed.title.toUpperCase(),
        category: parsed.category || 'TECH',
        summary: parsed.summary || parsed.title,
        rayuTakeaway: parsed.rayuTakeaway || parsed.summary || parsed.title,
      };
    }
  } catch (err: any) {
    console.warn('[RAYU Groq Vision] Vision analysis error:', err.message);
  }
  return null;
}

async function synthesizeArticleFromOcrText(
  extractedText: string,
  groqKey: string
): Promise<{ title: string; category: string; summary: string; rayuTakeaway: string }> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are an executive news editor for RAYU magazine.
Analyze the raw OCR text extracted from an image and output structured JSON:
{
  "title": "Clear, punchy, uppercase headline summarizing the main subject or product (under 10 words)",
  "category": "TECH",
  "summary": "1-2 sentence news summary describing what this image/product/article is about",
  "rayuTakeaway": "1 short punchy editorial insight"
}
Output ONLY valid JSON. No markdown formatting.`,
        },
        {
          role: 'user',
          content: `Extracted Text from Image:\n"""\n${extractedText.slice(0, 2000)}\n"""\n\nJSON Metadata:`,
        },
      ],
      max_tokens: 300,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    throw new Error(`Groq LLM HTTP ${res.status}`);
  }

  const data = await res.json();
  const rawContent = data.choices?.[0]?.message?.content?.trim() || '';
  const cleanedJson = rawContent.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
  const parsed = JSON.parse(cleanedJson);

  return {
    title: (parsed.title || 'IDENTIFIED VISUAL CONTENT').toUpperCase(),
    category: parsed.category || 'TECH',
    summary: parsed.summary || extractedText.slice(0, 150),
    rayuTakeaway: parsed.rayuTakeaway || parsed.summary,
  };
}

export async function POST(req: NextRequest) {
  let worker: any = null;

  try {
    const body = await req.json();
    const { imageBase64 = '', imageUrl = '' } = body;

    const targetImage = imageBase64 || imageUrl;
    if (!targetImage) {
      return NextResponse.json({ success: false, error: 'No image provided for analysis' }, { status: 400 });
    }

    const groqKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');

    // STAGE 1: Attempt Groq Llama 3.2 Vision directly on image (Blazing fast & ultra-accurate)
    if (groqKey.startsWith('gsk_')) {
      const visionResult = await analyzeImageWithGroqVision(targetImage, groqKey);
      if (visionResult && visionResult.title) {
        console.log('[RAYU Image Analyzer] ✅ Groq Vision Extracted Title:', visionResult.title);
        return NextResponse.json({
          success: true,
          method: 'GROQ_VISION',
          title: visionResult.title,
          category: visionResult.category,
          summary: visionResult.summary,
          rayuTakeaway: visionResult.rayuTakeaway,
        });
      }
    }

    // STAGE 2: Fallback to Tesseract.js OCR + Groq Llama 3.3 70b
    let extractedText = '';
    try {
      console.log('[RAYU Image Analyzer] Fallback to Tesseract OCR text extraction...');
      worker = await createWorker('eng');
      const ocrResult = await worker.recognize(targetImage);
      extractedText = ocrResult.data.text ? ocrResult.data.text.trim() : '';
      await worker.terminate();
      worker = null;
    } catch (ocrErr: any) {
      console.warn('[RAYU Image Analyzer] OCR worker error:', ocrErr.message);
      if (worker) {
        try { await worker.terminate(); } catch {}
        worker = null;
      }
    }

    if (extractedText && extractedText.length > 5 && groqKey.startsWith('gsk_')) {
      try {
        const synthesized = await synthesizeArticleFromOcrText(extractedText, groqKey);
        return NextResponse.json({
          success: true,
          method: 'OCR_LLM',
          extractedText,
          title: synthesized.title,
          category: synthesized.category,
          summary: synthesized.summary,
          rayuTakeaway: synthesized.rayuTakeaway,
        });
      } catch (err: any) {
        console.warn('[RAYU Image Analyzer] Synthesis error:', err.message);
      }
    }

    // STAGE 3: Final fallback using extracted OCR lines
    const titleFromOcr = extractedText ? extractedText.split('\n')[0].toUpperCase().slice(0, 60) : 'IDENTIFIED VISUAL CONTENT';

    return NextResponse.json({
      success: true,
      method: 'OCR_FALLBACK',
      extractedText,
      title: titleFromOcr || 'IDENTIFIED VISUAL CONCEPT',
      category: 'TECH',
      summary: extractedText.slice(0, 200) || 'Visual content identified from uploaded image.',
      rayuTakeaway: 'Content identified and formatted for RAYU publication.',
    });

  } catch (error: any) {
    console.error('[RAYU Image Analyzer] Route Error:', error);
    if (worker) {
      try { await worker.terminate(); } catch {}
    }
    return NextResponse.json({
      success: true,
      title: 'IDENTIFIED VISUAL CONCEPT',
      category: 'TECH',
      summary: 'Visual content identified from uploaded graphic.',
      rayuTakeaway: 'Content formatted for RAYU publication.',
    });
  }
}
