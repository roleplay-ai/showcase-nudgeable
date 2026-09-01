import { blogVisual, type BlogPost } from '@/lib/blogShared';

export function BlogThumb({
  post,
  large,
  photo,
  titleOverlay
}: {
  post: Pick<BlogPost, 'slug' | 'category' | 'title'> & { coverImage?: string };
  large?: boolean;
  photo?: boolean;
  titleOverlay?: boolean;
}) {
  const visual = blogVisual(post);
  if (photo && post.coverImage) {
    return <div className={`blog-thumb ${large ? 'large' : ''}${titleOverlay ? ' has-caption' : ''}`}>
      <img src={post.coverImage} alt={post.title || ''} />
      {titleOverlay && post.title && <div className="blog-thumb-caption"><span>{post.title}</span></div>}
    </div>;
  }

  return <div className={`blog-thumb tone-${visual.tone} art-${visual.art}${large ? ' large' : ''}`} aria-hidden="true">
    <div className="blog-thumb-dots" />
    <div className="blog-thumb-orbit" />
    <div className="blog-thumb-orbit two" />
    <div className="blog-thumb-object left" />
    <div className="blog-thumb-object center"><span /></div>
    <div className="blog-thumb-object right" />
  </div>;
}
