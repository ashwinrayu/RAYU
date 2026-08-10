import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * RAYU AI Visual Engine API Route
 * 
 * Strict error reporting — NO silent fallbacks.
 * Logs raw requests and responses to server logs and returns explicit error details to client.
 */

// ── 1. Groq Prompt Synthesis (Llama-3.1-8b) ──────────────────────────────────
async function buildPromptWithGroq(
  title: string,
  summary: string,
  category: string,
  storyUrl: string,
  storyImageUrl: string,
  fullArticleContent: string,
  groqKey: string
): Promise<{ prompt: string; rawResponse: any }> {
  console.log('[RAYU AI API] Requesting Groq Llama-3.1-8b prompt synthesis...');

  const contextDetails = [
    `Headline: "${title}"`,
    `Category: ${category}`,
    `Summary: "${summary}"`,
    storyUrl ? `Source URL: ${storyUrl}` : '',
    storyImageUrl && !storyImageUrl.startsWith('data:') ? `Original Image Reference URL: ${storyImageUrl}` : '',
    fullArticleContent ? `Full Article Text Excerpt: "${fullArticleContent.slice(0, 300)}"` : '',
  ].filter(Boolean).join('\n');

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
          content: `You are an AI visual content analyzer and senior art director for RAYU digital magazine.
Your task:
1. Analyze the provided story headline, article excerpt, link, and original image reference to IDENTIFY the core subject matter, main physical objects/people/setting, and mood.
2. Re-create ONE striking, hyper-realistic 8k photographic scene description (under 80 words) that visually re-imagines this identified subject specifically for RAYU's dark editorial aesthetic.
3. Rules: No text, words, logos, or typography inside the image.
4. End with: "Cinematic dark atmosphere, neon cyber-lime green (#CCFF00) accent lighting, 8k photorealistic render, lower third left clean empty dark negative space."`,
        },
        {
          role: 'user',
          content: `Content to Analyze & Re-create Visual For:\n${contextDetails}\n\nRe-created Visual Scene Description:`,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  const rawText = await res.text();
  console.log(`[RAYU AI API] Groq HTTP Status: ${res.status}`);
  
  if (!res.ok) {
    throw new Error(`Groq Prompt API returned HTTP ${res.status}: ${rawText.slice(0, 300)}`);
  }

  let data: any;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error(`Groq returned invalid JSON: ${rawText.slice(0, 200)}`);
  }

  const prompt = data.choices?.[0]?.message?.content?.trim();
  if (!prompt) {
    throw new Error(`Groq returned empty completion: ${JSON.stringify(data)}`);
  }

  return { prompt, rawResponse: data };
}

// ── 2. DALL-E 3 Generation ───────────────────────────────────────────────────
async function generateWithDallE(
  prompt: string,
  openAiKey: string
): Promise<{ imageUrl: string; rawResponse: any }> {
  console.log('[RAYU AI API] Calling OpenAI DALL-E 3 API...');

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

  const rawText = await res.text();
  console.log(`[RAYU AI API] OpenAI DALL-E 3 HTTP Status: ${res.status}`);
  console.log(`[RAYU AI API] OpenAI DALL-E 3 Response: ${rawText.slice(0, 300)}`);

  if (!res.ok) {
    throw new Error(`OpenAI DALL-E 3 HTTP ${res.status}: ${rawText}`);
  }

  const data = JSON.parse(rawText);
  const imageUrl = data.data?.[0]?.url;
  if (!imageUrl) {
    throw new Error(`OpenAI response missing image URL: ${rawText}`);
  }

  return { imageUrl, rawResponse: data };
}

// ── 3. Gemini Imagen 3 Generation ───────────────────────────────────────────
async function generateWithGemini(
  prompt: string,
  geminiKey: string
): Promise<{ imageUrl: string; rawResponse: any }> {
  console.log('[RAYU AI API] Calling Google Gemini Imagen API...');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${geminiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio: '1:1', outputMimeType: 'image/jpeg' },
      }),
    }
  );

  const rawText = await res.text();
  console.log(`[RAYU AI API] Gemini Imagen HTTP Status: ${res.status}`);
  console.log(`[RAYU AI API] Gemini Imagen Response: ${rawText.slice(0, 300)}`);

  if (!res.ok) {
    throw new Error(`Google Gemini Imagen HTTP ${res.status}: ${rawText}`);
  }

  const data = JSON.parse(rawText);
  const b64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) {
    throw new Error(`Gemini response missing bytesBase64Encoded image: ${rawText}`);
  }

  return { imageUrl: `data:image/jpeg;base64,${b64}`, rawResponse: data };
}

// ── 4. Hugging Face FLUX Generation ──────────────────────────────────────────
async function generateWithHuggingFace(
  prompt: string,
  hfKey: string
): Promise<{ imageUrl: string; rawResponse: any }> {
  console.log('[RAYU AI API] Calling Hugging Face Inference API...');

  const res = await fetch('https://router.huggingface.co/hf-inference/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${hfKey}`,
    },
    body: JSON.stringify({
      model: 'black-forest-labs/FLUX.1-schnell',
      prompt: prompt.slice(0, 400),
    }),
  });

  const rawText = await res.text();
  console.log(`[RAYU AI API] HuggingFace HTTP Status: ${res.status}`);

  if (!res.ok) {
    throw new Error(`HuggingFace HTTP ${res.status}: ${rawText.slice(0, 300)}`);
  }

  const data = JSON.parse(rawText);
  const b64 = data.data?.[0]?.b64_json;
  const url = data.data?.[0]?.url;

  if (b64) return { imageUrl: `data:image/png;base64,${b64}`, rawResponse: data };
  if (url) return { imageUrl: url, rawResponse: data };

  throw new Error(`HuggingFace response missing image data: ${rawText.slice(0, 200)}`);
}

// ── 5. Pollinations AI Flux Generation ───────────────────────────────────────
async function generateWithPollinations(
  prompt: string
): Promise<{ imageUrl: string }> {
  console.log('[RAYU AI API] Calling Pollinations AI Flux...');
  const seed = Math.floor(Math.random() * 999999);
  const encoded = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1080&height=1080&nologo=true&seed=${seed}&model=flux`;
  
  // Verify Pollinations endpoint is responding with 200
  const checkRes = await fetch(imageUrl, { method: 'HEAD' });
  console.log(`[RAYU AI API] Pollinations HEAD Status: ${checkRes.status}`);
  
  if (!checkRes.ok) {
    throw new Error(`Pollinations AI endpoint returned HTTP ${checkRes.status}`);
  }

  return { imageUrl };
}

// ── Main Route POST Handler ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const providerErrors: Record<string, string> = {};

  try {
    const body = await req.json();
    const {
      title = '',
      category = '',
      summary = '',
      storyUrl = '',
      storyImageUrl = '',
      fullArticleContent = '',
      provider = 'AUTO',
    } = body;

    const openAiKey = (process.env.OPENAI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const geminiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const groqKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const hfKey = (process.env.HUGGINGFACE_API_KEY || '').trim().replace(/^["']|["']$/g, '');

    console.log(`\n========================================`);
    console.log(`[RAYU AI API] NEW GENERATION REQUEST`);
    console.log(`[RAYU AI API] Title: "${title}"`);
    console.log(`[RAYU AI API] Category: "${category}"`);
    console.log(`[RAYU AI API] Source URL: "${storyUrl}"`);
    console.log(`[RAYU AI API] Requested Provider: "${provider}"`);
    console.log(`[RAYU AI API] Keys Present: OpenAI=${!!openAiKey}, Gemini=${!!geminiKey}, Groq=${!!groqKey}, HF=${!!hfKey}`);
    console.log(`========================================\n`);

    // Step 1: Synthesize visual prompt
    let visualPrompt = '';
    let promptSource = '';

    if (groqKey.startsWith('gsk_')) {
      try {
        const groqResult = await buildPromptWithGroq(
          title,
          summary,
          category,
          storyUrl,
          storyImageUrl,
          fullArticleContent,
          groqKey
        );
        visualPrompt = groqResult.prompt;
        promptSource = 'Groq Llama-3.1-8b Content Analyzer';
      } catch (err: any) {
        console.error('[RAYU AI API] Groq prompt failed:', err.message);
        providerErrors['Groq Prompt'] = err.message;
      }
    }

    if (!visualPrompt) {
      visualPrompt = `A striking photorealistic scene representing news story: "${title}". ${summary}. Cinematic dark atmosphere, neon cyber-lime green accent lighting, 8k photorealistic render. No text or words.`;
      promptSource = 'Direct Headline Synthesis';
    }

    console.log(`[RAYU AI API] Visual Prompt (${promptSource}):\n"${visualPrompt}"\n`);

    // Step 2: Handle Explicit Provider Selection
    if (provider === 'OPENAI') {
      if (!openAiKey) {
        return NextResponse.json(
          { success: false, error: 'OPENAI_API_KEY is missing from environment variables (.env.local).' },
          { status: 400 }
        );
      }
      try {
        const res = await generateWithDallE(visualPrompt, openAiKey);
        return NextResponse.json({
          success: true,
          provider: 'OpenAI DALL-E 3',
          imageUrl: res.imageUrl,
          promptUsed: visualPrompt,
          promptSource,
        });
      } catch (err: any) {
        return NextResponse.json(
          { success: false, error: `OpenAI DALL-E 3 Failed: ${err.message}`, promptUsed: visualPrompt },
          { status: 502 }
        );
      }
    }

    if (provider === 'GEMINI') {
      if (!geminiKey) {
        return NextResponse.json(
          { success: false, error: 'GEMINI_API_KEY is missing from environment variables (.env.local).' },
          { status: 400 }
        );
      }
      try {
        const res = await generateWithGemini(visualPrompt, geminiKey);
        return NextResponse.json({
          success: true,
          provider: 'Google Gemini Imagen 3',
          imageUrl: res.imageUrl,
          promptUsed: visualPrompt,
          promptSource,
        });
      } catch (err: any) {
        return NextResponse.json(
          { success: false, error: `Google Gemini Imagen Failed: ${err.message}`, promptUsed: visualPrompt },
          { status: 502 }
        );
      }
    }

    if (provider === 'HUGGINGFACE') {
      if (!hfKey) {
        return NextResponse.json(
          { success: false, error: 'HUGGINGFACE_API_KEY is missing from environment variables (.env.local).' },
          { status: 400 }
        );
      }
      try {
        const res = await generateWithHuggingFace(visualPrompt, hfKey);
        return NextResponse.json({
          success: true,
          provider: 'Hugging Face FLUX.1-schnell',
          imageUrl: res.imageUrl,
          promptUsed: visualPrompt,
          promptSource,
        });
      } catch (err: any) {
        return NextResponse.json(
          { success: false, error: `Hugging Face FLUX Failed: ${err.message}`, promptUsed: visualPrompt },
          { status: 502 }
        );
      }
    }

    // Step 3: AUTO Mode Execution Order (OpenAI -> Gemini -> HF -> Pollinations)
    if (openAiKey.startsWith('sk-')) {
      try {
        const res = await generateWithDallE(visualPrompt, openAiKey);
        return NextResponse.json({
          success: true,
          provider: 'OpenAI DALL-E 3',
          imageUrl: res.imageUrl,
          promptUsed: visualPrompt,
          promptSource,
        });
      } catch (err: any) {
        console.error('[RAYU AI API] AUTO Mode - OpenAI failed:', err.message);
        providerErrors['OpenAI DALL-E 3'] = err.message;
      }
    }

    if (geminiKey.startsWith('AIza')) {
      try {
        const res = await generateWithGemini(visualPrompt, geminiKey);
        return NextResponse.json({
          success: true,
          provider: 'Google Gemini Imagen 3',
          imageUrl: res.imageUrl,
          promptUsed: visualPrompt,
          promptSource,
        });
      } catch (err: any) {
        console.error('[RAYU AI API] AUTO Mode - Gemini failed:', err.message);
        providerErrors['Gemini Imagen'] = err.message;
      }
    }

    if (hfKey.startsWith('hf_')) {
      try {
        const res = await generateWithHuggingFace(visualPrompt, hfKey);
        return NextResponse.json({
          success: true,
          provider: 'Hugging Face FLUX',
          imageUrl: res.imageUrl,
          promptUsed: visualPrompt,
          promptSource,
        });
      } catch (err: any) {
        console.error('[RAYU AI API] AUTO Mode - HuggingFace failed:', err.message);
        providerErrors['Hugging Face FLUX'] = err.message;
      }
    }

    // Fallback to Pollinations AI
    try {
      const res = await generateWithPollinations(visualPrompt);
      return NextResponse.json({
        success: true,
        provider: 'Pollinations AI (FLUX)',
        imageUrl: res.imageUrl,
        promptUsed: visualPrompt,
        promptSource,
        providerErrors, // Surface any errors from attempted paid APIs
      });
    } catch (err: any) {
      providerErrors['Pollinations AI'] = err.message;
    }

    // All Providers Failed
    return NextResponse.json(
      {
        success: false,
        error: 'All AI image generation providers failed.',
        providerErrors,
        promptUsed: visualPrompt,
      },
      { status: 502 }
    );

  } catch (error: any) {
    console.error('[RAYU AI API] Fatal Error in POST /api/generate-image:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Server Fatal Error: ${error.message || String(error)}`,
        providerErrors,
      },
      { status: 500 }
    );
  }
}
