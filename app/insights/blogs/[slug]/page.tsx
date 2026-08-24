import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticle } from '@/components/BlogArticle';
import { getPublishedPost, listPublishedPosts } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: 'Blog' };
  const seoTitle = post.metaTitle || post.title;
  const seoDescription = post.metaDescription || post.excerpt;
  const shareImage = post.coverImage
    ? [{ url: post.coverImage }]
    : [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }];
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: `/insights/blogs/${post.slug}` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `/insights/blogs/${post.slug}`,
      type: 'article',
      images: shareImage
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: shareImage.map(image => image.url)
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === 'write') notFound();
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const related = (await listPublishedPosts())
    .filter(item => item.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  return <BlogArticle post={post} related={related} />;
}
