import type { Metadata } from 'next';
import { BlogsLibrary } from '@/components/BlogsLibrary';
import { listPublishedPosts } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Insights Blog',
  description: 'Practical ideas about AI, behavior and work.',
  alternates: { canonical: '/insights/blogs' },
  openGraph: {
    title: 'Insights Blog',
    description: 'Research, observations and useful frameworks for turning better thinking into everyday action.',
    url: '/insights/blogs',
    type: 'website',
    images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights Blog',
    description: 'Research, observations and useful frameworks for turning better thinking into everyday action.',
    images: ['/assets/og-default.png']
  }
};

export default async function BlogsPage() {
  const posts = await listPublishedPosts();
  return <BlogsLibrary posts={posts} />;
}
