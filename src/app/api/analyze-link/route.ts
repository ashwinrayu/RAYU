import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * RAYU Studio V2 — Link Scraper & AI Content Synthesizer API Route
 *
 * 1. Fetches HTML content from target URL.
 * 2. Extracts title, meta description, and paragraph text.
 * 3. Sends extracted text to Groq Llama-3.3-70b to synthesize structured RAYU post data.
 */

const SYSTEM_PROMPT = `You are RAYU's executive content editor.
You are given article text scraped from a website link.
Analyze the article content and synthesize structured JSON in RAYU's raw/unfiltered voice:
{
  "title": "Clear, punchy, UPPERCASE headline summarizing the main story/topic (under 10 words, RAYU voice)",
  "category": "One of: TECH, WORLD, LIFE, LEARNINGS",
  "summary": "1-2 sentence supporting body summary describing what this article is about",
  "rayuTakeaway": "1 short, punchy editorial insight in RAYU's raw voice"
}
Rules: Output ONLY raw valid JSON. No markdown formatting backticks.`;

function cleanHtmlToText(html: string): { title: string; metaDesc: string; text: string } {
  // Extract <title>
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Extract meta description or og:description
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i);
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
  const metaDesc = (ogDescMatch ? ogDescMatch[1] : metaDescMatch ? metaDescMatch[1] : '').trim();

  // Strip script, style tags
  const cleanBody = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return { title, metaDesc, text: cleanBody.slice(0, 3500) };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url = '' } = body;

    if (!url || !url.startsWith('http')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid URL starting with http:// or https://' },
        { status: 400 }
      );
    }

    const groqKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    if (!groqKey) {
      return NextResponse.json(
        { success: false, error: 'GROQ_API_KEY environment variable is missing' },
        { status: 500 }
      );
    }

    console.log(`[RAYU Link Scraper] Fetching URL: ${url}`);
    
    let htmlText = '';
    try {
      const pageRes = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 RAYU/2.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        signal: AbortSignal.timeout(10000) // 10s fetch timeout
      });

      if (!pageRes.ok) {
        throw new Error(`HTTP ${pageRes.status} ${pageRes.statusText}`);
      }
      htmlText = await pageRes.text();
    } catch (fetchErr: any) {
      console.warn('[RAYU Link Scraper] Web fetch error:', fetchErr.message);
      // Fallback: Use URL structure to form a title
      const domain = url.replace(/https?:\/\//, '').split('/')[0];
      const pathSlug = url.split('/').filter(Boolean).pop()?.replace(/[-_]/g, ' ').toUpperCase() || 'ARTICLE CONTENT';
      
      const fallbackTitle = `${domain.toUpperCase()}: ${pathSlug.slice(0, 45)}`;
      return NextResponse.json({
        success: true,
        providerUsed: 'URL Domain Parser (Fallback)',
        title: fallbackTitle,
        category: 'TECH',
        summary: `Content extracted from article link ${url}`,
        rayuTakeaway: `Key takeaways from ${domain}`,
      });
    }

    const { title, metaDesc, text } = cleanHtmlToText(htmlText);
    const contentToAnalyze = `Page Title: ${title}\nMeta Description: ${metaDesc}\nArticle Text:\n${text}`;

    console.log(`[RAYU Link Scraper] Synthesizing ${contentToAnalyze.length} chars of article content via Groq...`);

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
            content: `Article Link: ${url}\nScraped Content:\n"""\n${contentToAnalyze.slice(0, 3000)}\n"""\n\nJSON Output:`,
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
        providerUsed: 'Groq Llama 3.3 70b (Link Scraper)',
        title: (parsed.title || title || 'IDENTIFIED ARTICLE LINK').toUpperCase(),
        category,
        summary: parsed.summary || metaDesc || text.slice(0, 150),
        rayuTakeaway: parsed.rayuTakeaway || parsed.summary || 'Extracted article link insight.',
      });
    } catch (jsonErr) {
      const fallbackTitle = (title || 'IDENTIFIED ARTICLE LINK').toUpperCase();
      return NextResponse.json({
        success: true,
        providerUsed: 'Groq (Parsed Fallback)',
        title: fallbackTitle.slice(0, 60),
        category: 'TECH',
        summary: metaDesc || text.slice(0, 200),
        rayuTakeaway: 'Key takeaway from article link.',
      });
    }
  } catch (error: any) {
    console.error('[RAYU Link Scraper] Error:', error);
    return NextResponse.json(
      { success: false, error: `Link Extraction Error: ${error.message || String(error)}` },
      { status: 500 }
    );
  }
}
