import { readFileSync } from 'fs';
import { join } from 'path';
import { listPublishedPosts } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

type SitemapEntry = {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

function tipSlugs(): string[] {
  try {
    return JSON.parse(
      readFileSync(join(process.cwd(), 'public/ai-academy/tips/slugs.json'), 'utf8')
    );
  } catch {
    return [];
  }
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toIso(value?: Date | string) {
  if (!value) return new Date().toISOString();
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function buildXml(entries: SitemapEntry[]) {
  const body = entries
    .map(entry => {
      const parts = [
        `<loc>${escapeXml(entry.url)}</loc>`,
        `<lastmod>${toIso(entry.lastModified)}</lastmod>`
      ];
      if (entry.changeFrequency) parts.push(`<changefreq>${entry.changeFrequency}</changefreq>`);
      if (typeof entry.priority === 'number') parts.push(`<priority>${entry.priority}</priority>`);
      return `<url>${parts.join('')}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai').replace(/\/$/, '');
  const now = new Date();
  let posts: Awaited<ReturnType<typeof listPublishedPosts>> = [];
  try {
    posts = await listPublishedPosts();
  } catch {
    posts = [];
  }

  const tips = tipSlugs();
  const entries: SitemapEntry[] = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/ai-role-play`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/nudgeengine`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/ai-academy/index.html`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/ai-academy/tips/index.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...tips.map(slug => ({
      url: `${base}/ai-academy/tips/${slug}.html`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    })),
    { url: `${base}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/insights/blogs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ...posts.map(post => ({
      url: `${base}/insights/blogs/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  ];

  return new Response(buildXml(entries), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
