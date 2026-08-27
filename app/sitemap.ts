import type { MetadataRoute } from 'next';
import { listPublishedPosts } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai';
  const now = new Date();
  const posts = await listPublishedPosts();

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/ai-role-play`, lastModified: now, changeFrequency: 'monthly', priority: .9 },
    { url: `${base}/nudgeengine`, lastModified: now, changeFrequency: 'monthly', priority: .9 },
    { url: `${base}/ai-academy/index.html`, lastModified: now, changeFrequency: 'weekly', priority: .9 },
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
