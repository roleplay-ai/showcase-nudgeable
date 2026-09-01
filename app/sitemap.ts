import type { MetadataRoute } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import { listPublishedPosts } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

const TIP_SLUGS: string[] = JSON.parse(
  readFileSync(join(process.cwd(), 'public/ai-academy/tips/slugs.json'), 'utf8')
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai';
  const now = new Date();
  const posts = await listPublishedPosts();

  const tipPages: MetadataRoute.Sitemap = [
    { url: `${base}/ai-academy/tips/index.html`, lastModified: now, changeFrequency: 'monthly', priority: .8 },
    ...TIP_SLUGS.map(slug => ({
      url: `${base}/ai-academy/tips/${slug}.html`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: .7
    }))
  ];

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/ai-role-play`, lastModified: now, changeFrequency: 'monthly', priority: .9 },
    { url: `${base}/nudgeengine`, lastModified: now, changeFrequency: 'monthly', priority: .9 },
    { url: `${base}/ai-academy/index.html`, lastModified: now, changeFrequency: 'weekly', priority: .9 },
    ...tipPages,
    { url: `${base}/insights`, lastModified: now, changeFrequency: 'weekly', priority: .9 },
    { url: `${base}/insights/blogs`, lastModified: now, changeFrequency: 'weekly', priority: .8 },
    ...posts.map(post => ({
      url: `${base}/insights/blogs/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: .7
    }))
  ];
}
