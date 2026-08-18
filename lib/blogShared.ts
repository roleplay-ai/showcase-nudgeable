export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  author: string;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
};

export const BLOG_CATEGORIES = ['AI at Work', 'Behavioral Science', 'Workplace', 'HR & Learning'] as const;
export const BLOG_TONES = ['yellow', 'blue', 'purple', 'orange', 'green', 'pink'] as const;
export const BLOG_ARTS = ['bridge', 'loop', 'shield', 'target', 'people', 'steps', 'spark', 'brain'] as const;

const ALLOWED_TAGS = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'blockquote', 'hr', 'img', 'span', 'div']);
const VOID_TAGS = new Set(['br', 'hr', 'img']);

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return slug || 'post';
}

export function uniqueSlug(title: string, posts: Array<{ id: string; slug: string }>, currentId?: string) {
  const base = slugify(title);
  let slug = base;
  let index = 2;
  const taken = new Set(posts.filter(post => post.id !== currentId).map(post => post.slug));
  while (taken.has(slug) || slug === 'write') {
    slug = `${base}-${index}`;
    index += 1;
  }
  return slug;
}

function allowUrl(value: string, kind: 'href' | 'src') {
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  if (kind === 'href' && /^(https?:|mailto:)/i.test(value)) return true;
  if (kind === 'src' && /^https?:/i.test(value)) return true;
  return false;
}

function cleanStyle(value: string) {
  const align = value.match(/text-align\s*:\s*(left|center|right|justify)/i);
  return align ? `text-align: ${align[1].toLowerCase()}` : '';
}

function cleanAttributes(tag: string, raw: string) {
  const attrs: string[] = [];
  const matches = raw.matchAll(/([a-zA-Z:_][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)')/g);
  for (const match of matches) {
    const name = match[1].toLowerCase();
    const value = match[3] ?? match[4] ?? '';
    if (name.startsWith('on') || name === 'srcset') continue;
    if (tag === 'a' && name === 'href' && allowUrl(value, 'href')) attrs.push(`href="${value}"`);
    if (tag === 'a' && name === 'target' && value === '_blank') {
      attrs.push('target="_blank"', 'rel="noopener noreferrer"');
    }
    if (tag === 'img' && name === 'src' && allowUrl(value, 'src')) attrs.push(`src="${value}"`);
    if (tag === 'img' && name === 'alt') attrs.push(`alt="${value.replace(/"/g, '&quot;')}"`);
    if (name === 'style') {
      const style = cleanStyle(value);
      if (style) attrs.push(`style="${style}"`);
    }
  }
  return attrs.join(' ');
}

export function sanitizeHtml(input: string) {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<\/?([a-z0-9]+)(\s[^>]*)?>/gi, (full, tagName: string, rawAttrs = '') => {
      const tag = tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return '';
      const closing = full.trim().startsWith('</');
      if (closing) return VOID_TAGS.has(tag) ? '' : `</${tag}>`;
      const attrs = cleanAttributes(tag, rawAttrs);
      const suffix = VOID_TAGS.has(tag) ? ' />' : '>';
      return attrs ? `<${tag} ${attrs}${suffix}` : `<${tag}${suffix}`;
    })
    .replace(/javascript:/gi, '')
    .trim();
}

export function excerptFrom(html: string, fallback = '') {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= 180) return text || fallback;
  return `${text.slice(0, 177).trim()}…`;
}

export function formatBlogDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function readingTimeMinutes(html: string) {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200) || 1);
}

export function blogVisual(post: { slug: string; category?: string }) {
  let hash = 0;
  for (const character of post.slug) hash += character.charCodeAt(0);
  const categoryIndex = Math.max(0, BLOG_CATEGORIES.indexOf((post.category || 'AI at Work') as typeof BLOG_CATEGORIES[number]));
  return {
    tone: BLOG_TONES[(hash + categoryIndex) % BLOG_TONES.length],
    art: BLOG_ARTS[(hash + categoryIndex * 3) % BLOG_ARTS.length]
  };
}

export function prepareArticleHtml(html: string) {
  const headings: Array<{ id: string; text: string }> = [];
  let withLead = true;
  const prepared = html.replace(/<p(\s[^>]*)?>/i, match => {
    if (!withLead) return match;
    withLead = false;
    if (/class=/i.test(match)) return match.replace(/class="/i, 'class="lead ');
    return match.replace('<p', '<p class="lead"');
  }).replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (full, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    if (!text) return full;
    const id = slugify(text);
    headings.push({ id, text });
    if (/\sid=/i.test(attrs)) return `<h2${attrs}>${inner}</h2>`;
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  return { html: prepared, headings };
}
