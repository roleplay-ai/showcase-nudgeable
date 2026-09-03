'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BLOG_CATEGORIES, type BlogPost } from '@/lib/blogShared';
import { BlogCard } from './BlogCard';
import { BlogNewsletter } from './BlogNewsletter';
import { BlogThumb } from './BlogThumb';

const FILTERS = ['All', ...BLOG_CATEGORIES];

export function BlogsLibrary({ posts }: { posts: BlogPost[] }) {
  const [selected, setSelected] = useState('All');
  const featured = posts.find(post => post.featured) ?? posts[0];
  const rest = posts.filter(post => post.id !== featured?.id).filter(post => selected === 'All' || post.category === selected);

  return <div className="blogs-page">
    <section className="blogs-hero">
      <div className="container blogs-hero-grid">
        <div className="blogs-hero-copy">
          <span className="eyebrow blogs-eyebrow-amber">ARTICLES</span>
          <h1>Practical ideas about AI, behavior and work.</h1>
          <p>Research, observations and useful frameworks for turning better thinking into everyday action.</p>
        </div>
        {featured
          ? <Link className="blog-featured" href={`/insights/blogs/${featured.slug}`}>
            <div className="blog-featured-media">
              <BlogThumb post={featured} photo />
              <div className="blog-featured-overlay">
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
              </div>
            </div>
          </Link>
          : <div className="blogs-empty">
            <strong>Articles are on the way.</strong>
            <p>New writing from the Nudgeable team will appear here.</p>
          </div>}
      </div>
    </section>

    <section className="blogs-library">
      <div className="container">
        <div className="blogs-section-head">
          <div>
            <span className="eyebrow purple">EXPLORE BY TOPIC</span>
            <h2>Latest articles</h2>
          </div>
          {/* <p>Clear thinking you can use at work.</p> */}
        </div>
        <div className="blog-filters" role="tablist" aria-label="Article topics">
          {FILTERS.map(filter => (
            <button
              key={filter}
              type="button"
              className={selected === filter ? 'active' : ''}
              onClick={() => setSelected(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        {rest.length > 0 && <div className="blog-cards">{rest.map(post => <BlogCard key={post.id} post={post} />)}</div>}
        {!rest.length && featured && selected !== 'All' && <p className="blogs-empty-filter">No articles in {selected} yet.</p>}
        <BlogNewsletter />
      </div>
    </section>

    {/* <section className="container blog-practice">
      <div>
        <strong>Put these ideas into practice.</strong>
        <span>Explore guided AI workflows and apply them to real work.</span>
      </div>
      <a href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">OPEN PRACTICE LAB</a>
    </section> */}
  </div>;
}
