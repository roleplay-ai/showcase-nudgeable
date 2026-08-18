import type { Metadata } from 'next';
import { BlogEditor } from '@/components/BlogEditor';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Write a blog',
  robots: { index: false, follow: false }
};

export default function BlogWritePage() {
  return <BlogEditor />;
}
