import Link from 'next/link';
import { formatBlogDate, prepareArticleHtml, readingTimeMinutes, type BlogPost } from '@/lib/blogShared';
import { BlogCard } from './BlogCard';
import { BlogNewsletter } from './BlogNewsletter';
import { BlogShare } from './BlogShare';
import { BlogThumb } from './BlogThumb';

function byline(author: string) {
  if (author === 'Nudgeable' || author === 'Gaurav Patel') {
    return { name: 'Gaurav Patel', role: 'Founder, Nudgeable', initials: 'GP' };
  }
  const initials = author.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'NA';
  return { name: author, role: 'Nudgeable', initials };
}

export function BlogArticle({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  const { html, headings } = prepareArticleHtml(post.content);
  const author = byline(post.author);
  const minutes = readingTimeMinutes(post.content);

  return <div className="blog-article-page">
    <article>
      <header className="container blog-article-header">
        <Link href="/insights/blogs" className="blog-back">← All articles</Link>
        <span className="blog-pill">{post.category}</span>
        <h1>{post.title}</h1>
        {post.excerpt && <p className="blog-deck">{post.excerpt}</p>}
        <div className="blog-author">
          <div className="blog-avatar">{author.initials}</div>
          <div className="blog-author-name">
            <strong>{author.name}</strong>
            <small>{author.role}</small>
          </div>
          <div className="blog-date">{formatBlogDate(post.publishedAt)} · {minutes} min read</div>
        </div>
      </header>

      <div className="container blog-article-image">
        <BlogThumb post={post} large photo />
      </div>

      <div className="container blog-reading">
        {headings.length > 0 && (
          <aside className="blog-toc">
            <span>IN THIS ARTICLE</span>
            {headings.map(heading => <a key={heading.id} href={`#${heading.id}`}>{heading.text}</a>)}
          </aside>
        )}
        <div className="blog-body-col">
          <div className="blog-body" dangerouslySetInnerHTML={{ __html: html }} />
          <BlogNewsletter compact />
        </div>
        <BlogShare url={`/insights/blogs/${post.slug}`} title={post.title} />
      </div>
    </article>

    {related.length > 0 && (
      <section className="blog-related">
        <div className="container">
          <div className="blogs-section-head">
            <div>
              <span className="eyebrow purple">KEEP READING</span>
              <h2>Related articles</h2>
            </div>
            <Link href="/insights/blogs">View all articles →</Link>
          </div>
          <div className="blog-cards">{related.map(item => <BlogCard key={item.id} post={item} />)}</div>
        </div>
      </section>
    )}
  </div>;
}
