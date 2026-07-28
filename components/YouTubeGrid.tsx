'use client';

import { useEffect, useState } from 'react';
import { fallbackVideos } from './data';
import { Icon } from './Icon';

type Video = { id: string; title: string; category: string; duration?: string; thumbnail?: string; url?: string };

function isLiveYouTubeId(id?: string) {
  return Boolean(id && !id.startsWith('video-') && !id.startsWith('workflow-'));
}

function shortsUrl(video: Video) {
  if (isLiveYouTubeId(video.id)) return `https://www.youtube.com/shorts/${video.id}`;
  return video.url || '/insights#shorts';
}

function shortsThumbnail(video: Video) {
  if (isLiveYouTubeId(video.id)) return `https://i.ytimg.com/vi/${video.id}/oar2.jpg`;
  return video.thumbnail;
}

export function YouTubeGrid({ limit = 6 }: { limit?: number }) {
  const [videos, setVideos] = useState<Video[]>(fallbackVideos.slice(0, limit));

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/youtube?type=shorts&limit=${limit}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Could not load Shorts')))
      .then(data => { if (Array.isArray(data.videos) && data.videos.length) setVideos(data.videos); })
      .catch(() => undefined);
    return () => controller.abort();
  }, [limit]);

  return <div className="shorts-grid">
    {videos.map((video, index) => {
      const href = shortsUrl(video);
      const external = href.startsWith('http');
      const thumb = shortsThumbnail(video);
      return <a
        className="short-tile"
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        key={`${video.id}-${index}`}
        aria-label={`Watch ${video.title} on YouTube`}
      >
        <div className="short-thumb">
          {thumb
            ? <img
                src={thumb}
                alt=""
                loading="lazy"
                decoding="async"
                onError={event => {
                  const fallback = video.thumbnail || (isLiveYouTubeId(video.id) ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` : '');
                  if (fallback && event.currentTarget.src !== fallback) event.currentTarget.src = fallback;
                  else event.currentTarget.style.display = 'none';
                }}
              />
            : <div className="short-art"><span>AI</span><div className="short-wave"><i/><i/><i/><i/></div></div>}
          <div className="play-circle" aria-hidden="true"><Icon name="play" size={18}/></div>
          {video.duration && <span className="duration">{video.duration}</span>}
          <div className="short-copy"><span>{video.category}</span><h3>{video.title}</h3></div>
        </div>
      </a>;
    })}
  </div>;
}
