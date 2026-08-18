import Link from 'next/link';
import { formatBlogDate, readingTimeMinutes, type BlogPost } from '@/lib/blogShared';
import { BlogThumb } from './BlogThumb';

export function BlogCard({ post }: { post: BlogPost }) {
  return <Link className="blog-card" href={`/insights/blogs/${post.slug}`}>
    <BlogThumb post={post} />
    <div className="blog-card-body">
      <span className="blog-pill">{post.category}</span>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <div className="blog-meta">
        <span>{formatBlogDate(post.publishedAt)} · {readingTimeMinutes(post.content)} min read</span>
        <b>Read article ↗</b>
      </div>
    </div>
  </Link>;
}
