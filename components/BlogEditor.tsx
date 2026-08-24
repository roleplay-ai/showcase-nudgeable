'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useRef, useState } from 'react';
import { BLOG_CATEGORIES, formatBlogDate, slugify, type BlogPost } from '@/lib/blogShared';

const SITE_HOST = 'www.nudgeable.ai';

function seoTone(length: number, min: number, max: number) {
  if (!length) return 'muted';
  if (length < min) return 'warn';
  if (length > max) return 'bad';
  return 'good';
}
import { RichTextEditor } from './RichTextEditor';

function BlogEditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingSlug = searchParams.get('slug');
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Nudgeable');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [editorKey, setEditorKey] = useState('new');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState<string>(BLOG_CATEGORIES[0]);
  const [published, setPublished] = useState(true);
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  async function refreshSession() {
    const response = await fetch('/api/admin/session', { cache: 'no-store' });
    const payload = await response.json().catch(() => ({})) as { configured?: boolean };
    setConfigured(payload.configured !== false);
    setSignedIn(response.ok);
    return response.ok;
  }

  async function loadPosts() {
    const response = await fetch('/api/blogs?admin=1', { cache: 'no-store' });
    if (!response.ok) return;
    const payload = await response.json() as { posts?: BlogPost[] };
    setPosts(Array.isArray(payload.posts) ? payload.posts : []);
  }

  useEffect(() => {
    let cancelled = false;
    refreshSession()
      .then(async ok => {
        if (cancelled) return;
        if (ok) await loadPosts();
      })
      .finally(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, []);

  const loadedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (!signedIn) return;
    if (!editingSlug) {
      if (loadedSlug.current) resetForm();
      loadedSlug.current = null;
      return;
    }
    const post = posts.find(item => item.slug === editingSlug);
    if (!post || loadedSlug.current === editingSlug) return;
    loadedSlug.current = editingSlug;
    setTitle(post.title);
    setAuthor(post.author);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCoverImage(post.coverImage || '');
    setCategory(post.category || BLOG_CATEGORIES[0]);
    setPublished(post.published);
    setSlug(post.slug);
    setSlugTouched(true);
    setMetaTitle(post.metaTitle || '');
    setMetaDescription(post.metaDescription || '');
    setEditorKey(post.slug);
  }, [editingSlug, posts, signedIn]);

  // Keep the URL slug in sync with the title for a new, untouched post.
  // Once someone edits the slug directly (or a post is loaded for editing),
  // title changes stop overwriting it.
  useEffect(() => {
    if (editingSlug || slugTouched) return;
    setSlug(title.trim() ? slugify(title) : '');
  }, [title, editingSlug, slugTouched]);

  function resetForm() {
    setTitle('');
    setAuthor('Nudgeable');
    setExcerpt('');
    setContent('');
    setCoverImage('');
    setCategory(BLOG_CATEGORIES[0]);
    setPublished(true);
    setSlug('');
    setSlugTouched(false);
    setMetaTitle('');
    setMetaDescription('');
    setEditorKey(`new-${Date.now()}`);
    loadedSlug.current = null;
    setError('');
    setStatus('');
  }

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const payload = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) {
      setError(payload.error || 'Could not sign in.');
      return;
    }
    setPassword('');
    setSignedIn(true);
    await loadPosts();
  }

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setSignedIn(false);
    resetForm();
  }

  async function uploadCover(file: File) {
    setUploadingCover(true);
    setError('');
    try {
      const data = new FormData();
      data.append('file', file);
      const response = await fetch('/api/blogs/upload', { method: 'POST', body: data });
      const payload = await response.json() as { url?: string; error?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error || 'Could not upload the photo.');
      setCoverImage(payload.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Could not upload the photo.');
    } finally {
      setUploadingCover(false);
    }
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setStatus('');
    try {
      const response = await fetch(editingSlug ? `/api/blogs/${editingSlug}` : '/api/blogs', {
        method: editingSlug ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, excerpt, content, coverImage, category, published, slug, metaTitle, metaDescription })
      });
      const payload = await response.json() as { post?: BlogPost; error?: string };
      if (!response.ok || !payload.post) throw new Error(payload.error || 'Could not save the blog.');
      loadedSlug.current = payload.post.slug;
      setStatus(published ? 'Published.' : 'Saved as draft.');
      await loadPosts();
      router.replace(`/insights/blogs/write?slug=${payload.post.slug}`);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the blog.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(slug: string) {
    if (!window.confirm('Delete this blog post?')) return;
    const response = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' });
    const payload = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) {
      setError(payload.error || 'Could not delete the blog.');
      return;
    }
    if (editingSlug === slug) {
      resetForm();
      router.replace('/insights/blogs/write');
    }
    await loadPosts();
  }

  if (!ready) {
    return <div className="blog-write-page"><div className="container"><p>Loading editor…</p></div></div>;
  }

  if (!configured) {
    return <div className="blog-write-page"><div className="container blog-login-card">
      <span className="eyebrow">ADMIN</span>
      <h1>Blog editor is not configured.</h1>
      <p>Set <code>ADMIN_PASSWORD</code> in the environment to enable publishing.</p>
    </div></div>;
  }

  if (!signedIn) {
    return <div className="blog-write-page"><div className="container blog-login-card">
      <span className="eyebrow">ADMIN</span>
      <h1>Write a blog.</h1>
      <p>Sign in to publish and update articles on the Insights blogs page.</p>
      <form className="blog-login-form" onSubmit={signIn}>
        <label><span>Admin password</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required /></label>
        <button className="button button-primary" type="submit">Sign in</button>
        {error && <p className="form-message error">{error}</p>}
      </form>
    </div></div>;
  }

  return <div className="blog-write-page">
    <div className="container blog-write-layout">
      <form className="blog-write-form" onSubmit={save}>
        <div className="blog-write-head">
          <div>
            <span className="eyebrow">ADMIN</span>
            <h1>{editingSlug ? 'Edit blog' : 'Write a blog'}</h1>
          </div>
          <div className="blog-write-actions">
            <button type="button" className="button button-secondary" onClick={() => { resetForm(); router.replace('/insights/blogs/write'); }}>New post</button>
            <button type="button" className="button button-secondary" onClick={signOut}>Sign out</button>
          </div>
        </div>

        <label><span>Title</span><input value={title} onChange={event => setTitle(event.target.value)} required placeholder="What should the reader take away?" /></label>
        <div className="blog-write-row">
          <label><span>Author</span><input value={author} onChange={event => setAuthor(event.target.value)} placeholder="Nudgeable" /></label>
          <label><span>Topic</span>
            <select value={category} onChange={event => setCategory(event.target.value)}>
              {BLOG_CATEGORIES.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="blog-publish-toggle">
            <input type="checkbox" checked={published} onChange={event => setPublished(event.target.checked)} />
            <span>Publish on the blogs page</span>
          </label>
        </div>
        <label><span>Short excerpt</span><textarea value={excerpt} onChange={event => setExcerpt(event.target.value)} rows={3} placeholder="One or two sentences for the blogs listing." /></label>

        <div className="blog-seo-field">
          <span>SEO &amp; search preview</span>

          <div className="seo-preview">
            <span className="seo-preview-url">{SITE_HOST} › insights › blogs › {slugify(slug) || slugify(title) || 'your-post-slug'}</span>
            <span className="seo-preview-title">{metaTitle.trim() || title.trim() || 'Untitled post'}</span>
            <span className="seo-preview-desc">{metaDescription.trim() || excerpt.trim() || 'Add a meta description so search engines have something useful to show.'}</span>
          </div>

          <label>
            <span>URL slug</span>
            <input
              value={slug}
              onChange={event => { setSlug(event.target.value); setSlugTouched(true); }}
              placeholder={slugify(title) || 'post-url-slug'}
            />
            <div className="seo-hint-row">
              <span className="seo-hint">Saves as /insights/blogs/{slugify(slug) || slugify(title) || 'post-url-slug'}</span>
              <button type="button" className="button button-text" onClick={() => { setSlug(slugify(title)); setSlugTouched(true); }}>Reset to title</button>
            </div>
          </label>

          <label>
            <span>SEO title</span>
            <input value={metaTitle} onChange={event => setMetaTitle(event.target.value)} placeholder={title || 'Falls back to the title above'} maxLength={120} />
            <span className={`seo-counter ${seoTone(metaTitle.length, 30, 60)}`}>{metaTitle.length ? metaTitle.length : 0} characters · aim for 30–60</span>
          </label>

          <label>
            <span>Meta description</span>
            <textarea value={metaDescription} onChange={event => setMetaDescription(event.target.value)} rows={3} placeholder={excerpt || 'Falls back to the short excerpt above'} maxLength={300} />
            <span className={`seo-counter ${seoTone(metaDescription.length, 120, 160)}`}>{metaDescription.length} characters · aim for 120–160</span>
          </label>
        </div>

        <div className="blog-cover-field">
          <span>Cover photo</span>
          <div className="blog-cover-row">
            <label className="button button-secondary blog-cover-button">
              {uploadingCover ? 'Uploading…' : coverImage ? 'Replace photo' : 'Attach photo'}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden disabled={uploadingCover} onChange={event => { const file = event.target.files?.[0]; if (file) void uploadCover(file); }} />
            </label>
            {coverImage && <button type="button" className="button button-text" onClick={() => setCoverImage('')}>Remove</button>}
          </div>
          {coverImage && <div className="blog-cover-preview"><img src={coverImage} alt="Cover preview" /></div>}
        </div>

        <div className="blog-body-field">
          <span>Article</span>
          <RichTextEditor key={editorKey} initialHtml={content} onChange={setContent} />
        </div>

        <div className="blog-write-submit">
          <button className="button button-primary" disabled={saving}>{saving ? 'Saving…' : editingSlug ? 'Update blog' : 'Publish blog'}</button>
          {editingSlug && <Link href={`/insights/blogs/${editingSlug}`} className="button button-secondary">View post</Link>}
        </div>
        {status && <p className="form-message success">{status}</p>}
        {error && <p className="form-message error">{error}</p>}
      </form>

      <aside className="blog-write-aside">
        <strong>Published and drafts</strong>
        {!posts.length && <p>No posts yet. The first article you save will appear here.</p>}
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link href={`/insights/blogs/write?slug=${post.slug}`}>{post.title}</Link>
              <span>{post.published ? 'Published' : 'Draft'} · {formatBlogDate(post.updatedAt)}</span>
              <div>
                <Link href={`/insights/blogs/write?slug=${post.slug}`}>Edit</Link>
                <button type="button" onClick={() => void remove(post.slug)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  </div>;
}

export function BlogEditor() {
  return <Suspense fallback={<div className="blog-write-page"><div className="container"><p>Loading editor…</p></div></div>}>
    <BlogEditorInner />
  </Suspense>;
}
