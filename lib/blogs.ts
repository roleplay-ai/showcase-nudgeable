import { randomUUID } from 'crypto';
import path from 'path';
import { excerptFrom, sanitizeHtml, uniqueSlug, type BlogPost } from './blogShared';
import { getSupabase, supabaseConfigured } from './supabase';

export type { BlogPost } from './blogShared';
export { formatBlogDate, slugify } from './blogShared';

const BUCKET = 'blog-images';
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category?: string | null;
  author: string;
  published: boolean;
  published_at: string;
  updated_at: string;
  meta_title?: string | null;
  meta_description?: string | null;
};

function fromRow(row: BlogRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image || undefined,
    category: row.category || 'AI at Work',
    author: row.author,
    published: row.published,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    metaTitle: row.meta_title || undefined,
    metaDescription: row.meta_description || undefined
  };
}

function toRow(post: BlogPost): BlogRow {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    cover_image: post.coverImage || null,
    category: post.category,
    author: post.author,
    published: post.published,
    published_at: post.publishedAt,
    updated_at: post.updatedAt,
    meta_title: post.metaTitle || null,
    meta_description: post.metaDescription || null
  };
}

function throwIfError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export async function listPosts() {
  if (!supabaseConfigured()) return [];
  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });
  throwIfError(error);
  return ((data || []) as BlogRow[]).map(fromRow);
}

export async function listPublishedPosts() {
  if (!supabaseConfigured()) return [];
  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  throwIfError(error);
  return ((data || []) as BlogRow[]).map(fromRow);
}

export async function getPost(slug: string) {
  if (!supabaseConfigured()) return null;
  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  throwIfError(error);
  return data ? fromRow(data as BlogRow) : null;
}

export async function getPublishedPost(slug: string) {
  const post = await getPost(slug);
  return post?.published ? post : null;
}

type BlogInput = {
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category?: string;
  author?: string;
  published?: boolean;
  slug?: string;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
};

async function slugIndex() {
  const { data, error } = await getSupabase().from('blog_posts').select('id, slug');
  throwIfError(error);
  return (data || []) as Array<{ id: string; slug: string }>;
}

function normalizePost(input: BlogInput, posts: Array<{ id: string; slug: string }>, existing?: BlogPost): BlogPost {
  const title = input.title.trim();
  const content = sanitizeHtml(input.content || '');
  const now = new Date().toISOString();
  const published = input.published !== false;
  return {
    id: existing?.id || randomUUID(),
    slug: uniqueSlug(input.slug?.trim() || title, posts, existing?.id),
    title,
    excerpt: (input.excerpt || '').trim() || excerptFrom(content, title),
    content,
    coverImage: input.coverImage?.trim() || undefined,
    category: (input.category || existing?.category || 'AI at Work').trim() || 'AI at Work',
    author: (input.author || existing?.author || 'Nudgeable').trim() || 'Nudgeable',
    published,
    publishedAt: existing?.publishedAt || input.publishedAt || now,
    updatedAt: now,
    metaTitle: (input.metaTitle || '').trim() || undefined,
    metaDescription: (input.metaDescription || '').trim() || undefined
  };
}

export async function savePost(input: BlogInput, slug?: string) {
  if (!input.title?.trim()) throw new Error('A title is required.');
  const supabase = getSupabase();
  const existing = slug ? await getPost(slug) : null;
  if (slug && !existing) throw new Error('Blog post not found.');
  const post = normalizePost(input, await slugIndex(), existing || undefined);
  const row = toRow(post);

  if (existing) {
    const { data, error } = await supabase.from('blog_posts').update(row).eq('id', existing.id).select('*').single();
    throwIfError(error);
    return fromRow(data as BlogRow);
  }

  const { data, error } = await supabase.from('blog_posts').insert(row).select('*').single();
  throwIfError(error);
  return fromRow(data as BlogRow);
}

export async function deletePost(slug: string) {
  const { data, error } = await getSupabase().from('blog_posts').delete().eq('slug', slug).select('id');
  throwIfError(error);
  if (!data?.length) throw new Error('Blog post not found.');
}

function extensionFor(type: string, filename: string) {
  const fromName = path.extname(filename).toLowerCase();
  if (fromName && ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(fromName)) return fromName;
  if (type === 'image/jpeg') return '.jpg';
  if (type === 'image/png') return '.png';
  if (type === 'image/webp') return '.webp';
  if (type === 'image/gif') return '.gif';
  return '.jpg';
}

export async function saveBlogImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error('Use a JPG, PNG, WEBP or GIF image.');
  if (file.size > MAX_IMAGE_BYTES) throw new Error('Images must be 5MB or smaller.');

  const supabase = getSupabase();
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${extensionFor(file.type, file.name)}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(BUCKET).upload(filename, bytes, {
    contentType: file.type,
    upsert: false
  });
  throwIfError(error);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}
