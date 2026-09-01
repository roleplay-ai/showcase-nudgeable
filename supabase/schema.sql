-- Run this in the Supabase SQL editor, then add NEXT_PUBLIC_SUPABASE_URL
-- and SUPABASE_SERVICE_ROLE_KEY to .env.local and Vercel.

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  author text not null default 'Nudgeable',
  category text not null default 'AI at Work',
  published boolean not null default true,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  meta_title text,
  meta_description text
);

create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published_at desc);

alter table public.blog_posts add column if not exists category text not null default 'AI at Work';
-- SEO fields: optional overrides for the <title> tag and meta description.
-- Left blank, the site falls back to the post title / short excerpt.
alter table public.blog_posts add column if not exists meta_title text;
alter table public.blog_posts add column if not exists meta_description text;

-- Hero featured article: only one post should be featured at a time (enforced in app code).
alter table public.blog_posts add column if not exists featured boolean not null default false;

create index if not exists blog_posts_featured_idx
  on public.blog_posts (featured)
  where featured = true;

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published posts" on public.blog_posts;
create policy "Public can read published posts"
  on public.blog_posts
  for select
  using (published = true);

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view blog images" on storage.objects;
create policy "Public can view blog images"
  on storage.objects
  for select
  using (bucket_id = 'blog-images');

-- AI Academy training videos + thumbnails, uploaded from
-- AI_WorkStudio_Matched_Video_Mapping.xlsx and referenced directly by public
-- URL from public/ai-academy pages (see assets/video-tab.js, tools/index.html
-- and claude/index.html). Objects are named by a slug of the original
-- "Video File Name" / thumbnail column, e.g. "chatgpt-codex-compare-ai-coding-tools.mp4".
insert into storage.buckets (id, name, public, file_size_limit)
values ('academy-videos', 'academy-videos', true, 52428800)
on conflict (id) do nothing;

drop policy if exists "Public can view academy videos" on storage.objects;
create policy "Public can view academy videos"
  on storage.objects
  for select
  using (bucket_id = 'academy-videos');

insert into public.blog_posts (
  id, slug, title, excerpt, content, cover_image, author, category, published, published_at, updated_at
) values (
  '6f2c1b5a-9d3e-4a11-8c44-0f8d2a7b91e0',
  'start-using-ai-in-your-actual-workweek',
  'Start using AI in your actual workweek',
  'Most teams try AI in a demo. The ones who get value put it on a real task, with a clear outcome, before the week is over.',
  $$<p>AI capability does not change a workplace until it shows up in the calendar. The useful question is not “which model is best?” It is “which recurring task can we do better this week?”</p><h2>Pick one real task</h2><p>Choose something you already do: a weekly update, a customer reply, a meeting recap, or a first draft of a plan. If the task has a known format and a known reader, it is a good place to start.</p><ul><li>Write the outcome in one sentence before you open a tool.</li><li>Give the model the same context a colleague would need.</li><li>Edit the result as if a teammate wrote it.</li></ul><h2>Make the workflow visible</h2><p>People copy what they can see. A short explainer, a shared prompt, or a five-minute walkthrough is more useful than a slide about transformation. When the steps are visible, the team can improve them.</p><blockquote>Practice beats policy. One finished task teaches more than another framework.</blockquote><h2>Judge the work, not the novelty</h2><p>The test is simple: did this save time, raise quality, or reduce rework? If it did, keep it. If it did not, change the task or the prompt. That is how AI becomes part of the work, instead of a side experiment.</p>$$,
  '/assets/hero-practice-lab.jpg',
  'Nudgeable',
  'AI at Work',
  true,
  '2026-08-12T09:00:00.000Z',
  '2026-08-12T09:00:00.000Z'
)
on conflict (slug) do nothing;
