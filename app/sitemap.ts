import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai';
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/ai-role-play`, lastModified: now, changeFrequency: 'monthly', priority: .9 },
    { url: `${base}/nudgeengine`, lastModified: now, changeFrequency: 'monthly', priority: .9 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: 'weekly', priority: .9 }
  ];
}
