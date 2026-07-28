import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 900;

type YouTubePlaylistItem = {
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    position?: number;
    thumbnails?: Record<string, { url?: string }>;
    resourceId?: { videoId?: string };
  };
  contentDetails?: { videoId?: string };
};

type YouTubeVideoDetail = {
  id?: string;
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    thumbnails?: Record<string, { url?: string }>;
  };
  contentDetails?: { duration?: string };
};

const DEFAULT_SHORTS_PLAYLIST = 'PLX2kcOVk5064';
const DEFAULT_WORKFLOWS_PLAYLIST = 'PLWrY3kWovqrDc2XMO3kj66fqMCPwAl4_v';
const MAX_PLAYLIST_ITEMS = 250;

const cacheHeaders = {
  'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=86400'
};

function cachedJson(body: unknown, init: { status?: number } = {}) {
  return NextResponse.json(body, { ...init, headers: cacheHeaders });
}

function isoDuration(value: string) {
  const match = value.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0) + hours * 60;
  const seconds = Number(match[3] || 0);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function playlistId(value?: string) {
  if (!value) return '';
  try {
    const parsed = new URL(value);
    return parsed.searchParams.get('list') || value;
  } catch {
    return value;
  }
}

function playlistFor(type: string) {
  if (type === 'workflows') {
    return playlistId(process.env.YOUTUBE_WORKFLOWS_PLAYLIST_ID || DEFAULT_WORKFLOWS_PLAYLIST);
  }
  return playlistId(process.env.YOUTUBE_SHORTS_PLAYLIST_ID || DEFAULT_SHORTS_PLAYLIST);
}

async function fetchPlaylistItems(apiKey: string, selectedPlaylist: string, requestedLimit: number) {
  const items: YouTubePlaylistItem[] = [];
  let pageToken = '';

  while (items.length < requestedLimit && items.length < MAX_PLAYLIST_ITEMS) {
    const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    playlistUrl.searchParams.set('part', 'snippet,contentDetails');
    playlistUrl.searchParams.set('playlistId', selectedPlaylist);
    playlistUrl.searchParams.set('maxResults', String(Math.min(50, requestedLimit - items.length)));
    playlistUrl.searchParams.set('key', apiKey);
    if (pageToken) playlistUrl.searchParams.set('pageToken', pageToken);

    const playlistResponse = await fetch(playlistUrl, { next: { revalidate: 900 } });
    if (!playlistResponse.ok) {
      const errorText = await playlistResponse.text();
      throw new Error(`YouTube playlist request failed: ${playlistResponse.status} ${errorText}`);
    }

    const playlistData = await playlistResponse.json();
    const pageItems: YouTubePlaylistItem[] = Array.isArray(playlistData.items) ? playlistData.items : [];
    items.push(...pageItems);
    pageToken = playlistData.nextPageToken || '';
    if (!pageToken || pageItems.length === 0) break;
  }

  return items.slice(0, requestedLimit);
}

async function fetchVideoDetails(apiKey: string, ids: string[]) {
  const details = new Map<string, YouTubeVideoDetail>();

  for (let index = 0; index < ids.length; index += 50) {
    const batch = ids.slice(index, index + 50);
    const detailsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    detailsUrl.searchParams.set('part', 'contentDetails,snippet,status');
    detailsUrl.searchParams.set('id', batch.join(','));
    detailsUrl.searchParams.set('key', apiKey);

    const detailsResponse = await fetch(detailsUrl, { next: { revalidate: 900 } });
    if (!detailsResponse.ok) {
      const errorText = await detailsResponse.text();
      throw new Error(`YouTube video details request failed: ${detailsResponse.status} ${errorText}`);
    }

    const detailsData = await detailsResponse.json();
    for (const item of detailsData.items || []) {
      if (item?.id) details.set(item.id, item);
    }
  }

  return details;
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const type = request.nextUrl.searchParams.get('type') === 'workflows' ? 'workflows' : 'shorts';
  const selectedPlaylist = playlistFor(type);
  const requestedLimit = Math.min(
    Math.max(Number(request.nextUrl.searchParams.get('limit') || MAX_PLAYLIST_ITEMS), 1),
    MAX_PLAYLIST_ITEMS
  );

  if (!apiKey || !selectedPlaylist) {
    return cachedJson({
      videos: [],
      configured: false,
      type,
      playlistId: selectedPlaylist,
      message: !apiKey ? 'Add YOUTUBE_API_KEY to load the playlist.' : 'Playlist ID is missing.'
    });
  }

  try {
    const playlistItems = await fetchPlaylistItems(apiKey, selectedPlaylist, requestedLimit);
    const ids = playlistItems
      .map(item => item.contentDetails?.videoId || item.snippet?.resourceId?.videoId)
      .filter(Boolean) as string[];

    if (!ids.length) {
      return cachedJson({ videos: [], configured: true, type, playlistId: selectedPlaylist });
    }

    const details = await fetchVideoDetails(apiKey, ids);

    const videos = playlistItems
      .map(item => {
        const id = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId || '';
        const detail = details.get(id);
        const snippet = detail?.snippet || item.snippet || {};
        return {
          id,
          title: snippet.title || 'Untitled video',
          category: type === 'workflows' ? 'Workflow Explainer' : 'AI Short',
          duration: isoDuration(detail?.contentDetails?.duration || ''),
          thumbnail:
            snippet.thumbnails?.maxres?.url ||
            snippet.thumbnails?.standard?.url ||
            snippet.thumbnails?.high?.url ||
            snippet.thumbnails?.medium?.url,
          url: `https://www.youtube.com/watch?v=${id}`,
          description: snippet.description || '',
          publishedAt: snippet.publishedAt || '',
          position: item.snippet?.position ?? 0
        };
      })
      .filter(video => video.id && video.title !== 'Private video' && video.title !== 'Deleted video')
      .sort((a, b) => {
        const aDate = Date.parse(a.publishedAt || '');
        const bDate = Date.parse(b.publishedAt || '');
        if (Number.isFinite(aDate) && Number.isFinite(bDate) && aDate !== bDate) return bDate - aDate;
        return a.position - b.position;
      });

    return cachedJson({ videos, configured: true, type, playlistId: selectedPlaylist });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown YouTube error';
    return NextResponse.json(
      { videos: [], configured: true, type, playlistId: selectedPlaylist, message },
      { status: 502 }
    );
  }
}
