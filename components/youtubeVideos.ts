export type YouTubeVideo = {
  id: string;
  title: string;
  category: string;
  duration?: string;
  thumbnail?: string;
  url?: string;
  description?: string;
  publishedAt?: string;
};

export function formatVideoDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function isLiveYouTubeId(id?: string) {
  return Boolean(id && !id.startsWith('video-') && !id.startsWith('workflow-'));
}
