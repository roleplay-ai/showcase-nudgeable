'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icon';

type Video = {
  id: string;
  title: string;
  category: string;
  duration?: string;
  thumbnail?: string;
  url?: string;
};

const fallbackVideos: Video[] = [
  { id: 'workflow-1', title: 'Build a Slide Deck From a Document, Start to Finish', category: 'Claude · Presentations', duration: '9:16', thumbnail: '/insights/workflow-1.png' },
  { id: 'workflow-2', title: 'Set Up an Agent That Clears Your Inbox Every Morning', category: 'ChatGPT · Automation', duration: '7:24', thumbnail: '/insights/workflow-2.png' },
  { id: 'workflow-3', title: 'Turn a Messy Sales Export Into a Chart in Five Minutes', category: 'Gemini · Data', duration: '8:42', thumbnail: '/insights/workflow-3.png' }
];

function cleanTitle(title: string) {
  return title.replace(/\s*#[\w]+/g, '').trim();
}

function thumbnailFor(video: Video) {
  if (video.thumbnail) return video.thumbnail;
  if (video.id && !video.id.startsWith('workflow-')) return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  return undefined;
}

export function WorkflowVideoGrid({ limit = 3 }: { limit?: number }) {
  const [videos, setVideos] = useState<Video[]>(fallbackVideos.slice(0, limit));

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/youtube?type=workflows&limit=${limit}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Could not load workflows')))
      .then(data => {
        if (!Array.isArray(data.videos) || !data.videos.length) return;
        setVideos(data.videos.map((video: Video) => ({
          ...video,
          title: cleanTitle(video.title),
          thumbnail: thumbnailFor(video)
        })));
      })
      .catch(error => { if (error?.name !== 'AbortError') undefined; });
    return () => controller.abort();
  }, [limit]);

  return <div className="landscape-video-grid">
    {videos.map(video => {
      const thumbnail = thumbnailFor(video);
      return <article key={video.id} className="landscape-video-card">
        <a className="landscape-thumb" href={video.url || '/insights#workflows'} target={video.url ? '_blank' : undefined} rel={video.url ? 'noopener noreferrer' : undefined} aria-label={`Watch ${video.title}`}>
          {thumbnail && <img src={thumbnail} alt="" loading="lazy" decoding="async" onError={event => { event.currentTarget.style.display = 'none'; }} />}
          <div className="demo-play"><Icon name="play" size={20}/></div>
          {video.duration && <span className="duration">{video.duration}</span>}
        </a>
        <div><h3>{video.title}</h3><a href="https://ai.nudgeable.app/" target="_blank" rel="noopener noreferrer">Try this in the Practice Lab <Icon name="arrow" size={14}/></a></div>
      </article>;
    })}
  </div>;
}
