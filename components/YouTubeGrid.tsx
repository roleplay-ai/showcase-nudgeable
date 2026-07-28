'use client';

import { useEffect, useState } from 'react';
import { fallbackVideos } from './data';
import { Icon } from './Icon';

type Video = { id: string; title: string; category: string; duration?: string; thumbnail?: string; url?: string };

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
    {videos.map((video, index) => <a className="short-tile" href={video.url || '/insights#shorts'} target={video.url ? '_blank' : undefined} rel={video.url ? 'noopener noreferrer' : undefined} key={`${video.id}-${index}`} aria-label={`Watch ${video.title}`}>
      <div className="short-thumb">
        {video.thumbnail
          ? <img src={video.thumbnail} alt={`Thumbnail for ${video.title}`} loading="lazy" decoding="async" />
          : <div className="short-art"><span>AI</span><div className="short-wave"><i/><i/><i/><i/></div></div>}
        <div className="play-circle"><Icon name="play" size={18}/></div>
        {video.duration && <span className="duration">{video.duration}</span>}
      </div>
      <div className="short-copy"><span>{video.category}</span><h3>{video.title}</h3></div>
    </a>)}
  </div>;
}
