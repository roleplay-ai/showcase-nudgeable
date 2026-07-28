'use client';

import { useEffect, useRef, useState } from 'react';
import { VideoCarouselNext, VideoCarouselPrev } from './VideoCarouselNav';

type Video = {
  id: string;
  title: string;
  category: string;
  duration?: string;
  thumbnail?: string;
  url?: string;
  description?: string;
};

const fallbackVideos: Video[] = [
  { id: 'workflow-1', title: 'Build a Slide Deck From a Document, Start to Finish', category: 'Claude · Presentations', duration: '9:16', thumbnail: '/insights/workflow-1.png', description: 'Turn a long document into a complete, structured presentation.' },
  { id: 'workflow-2', title: 'Set Up an Agent That Clears Your Inbox Every Morning', category: 'ChatGPT · Automation', duration: '7:24', thumbnail: '/insights/workflow-2.png', description: 'Automate inbox triage, summaries and follow-ups.' },
  { id: 'workflow-3', title: 'Turn a Messy Sales Export Into a Chart in Five Minutes', category: 'Gemini · Data', duration: '8:42', thumbnail: '/insights/workflow-3.png', description: 'Clean data, build charts and identify useful patterns quickly.' }
];

const topicColors: Record<string, string> = {
  Claude: '#7c3aed',
  Copilot: '#0ea5e9',
  Gemini: '#2563eb',
  ChatGPT: '#10b981',
  'AI Agents': '#f59e0b',
  Data: '#2563eb',
  Presentations: '#7c3aed',
  Research: '#7c3aed',
  Automation: '#10b981'
};

function cleanTitle(title: string) {
  return title
    .replace(/(?:^|\s)#[\w.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shortDescription(value?: string) {
  if (!value) return '';
  const cleaned = value
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/(?:^|\s)#[\w.-]+/g, ' ')
    .replace(/[\u2705\u2714\u2611]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const parts = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  const sentence = parts.find(part => !/^(try|get|download|subscribe|learn more)\b/i.test(part)) || parts[0] || cleaned;
  if (sentence.length <= 120) return sentence;
  return `${sentence.slice(0, 117).trim()}…`;
}

function detectTool(text: string) {
  if (text.includes('claude')) return 'Claude';
  if (text.includes('copilot')) return 'Copilot';
  if (text.includes('gemini')) return 'Gemini';
  if (text.includes('chatgpt') || text.includes('chat gpt')) return 'ChatGPT';
  if (text.includes('agent')) return 'AI Agents';
  return '';
}

function detectTopic(text: string) {
  if (text.includes('presentation') || text.includes('slide') || text.includes('ppt') || text.includes('deck')) return 'Presentations';
  if (text.includes('research')) return 'Research';
  if (text.includes('automat') || text.includes('email') || text.includes('inbox')) return 'Automation';
  if (text.includes('data') || text.includes('excel') || text.includes('chart') || text.includes('sales export')) return 'Data';
  if (text.includes('no code') || text.includes('internal tool')) return 'No code';
  return 'AI for Work';
}

function classify(video: Video) {
  const title = video.title.toLowerCase();
  const body = `${video.description || ''} ${video.category || ''}`.toLowerCase();
  const tool = detectTool(title) || detectTool(body);
  const topic = detectTopic(`${title} ${body}`);
  if (tool && topic && topic !== 'AI for Work') return `${tool} · ${topic}`;
  if (tool) return tool;
  if (video.category.includes('·')) return video.category;
  return topic;
}

function categoryTone(label: string) {
  const key = Object.keys(topicColors).find(name => label.includes(name));
  return key ? topicColors[key] : '#7c3aed';
}

function thumbnailFor(video: Video) {
  if (video.thumbnail) return video.thumbnail;
  if (video.id && !video.id.startsWith('workflow-')) return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  return undefined;
}

function isPlayable(video: Video) {
  return Boolean(video.id && !video.id.startsWith('workflow-'));
}

export function WorkflowVideoGrid({ limit = 3 }: { limit?: number }) {
  const [videos, setVideos] = useState<Video[]>(fallbackVideos.slice(0, limit));
  const [playing, setPlaying] = useState<Video | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/youtube?type=workflows&limit=${Math.max(limit, 12)}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Could not load workflows')))
      .then(data => {
        if (!Array.isArray(data.videos) || !data.videos.length) return;
        setVideos(data.videos.slice(0, Math.max(limit, 12)).map((video: Video) => ({
          ...video,
          title: cleanTitle(video.title),
          description: shortDescription(video.description),
          thumbnail: thumbnailFor(video)
        })));
      })
      .catch(error => { if (error?.name !== 'AbortError') undefined; });
    return () => controller.abort();
  }, [limit]);

  useEffect(() => {
    if (!playing) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setPlaying(null);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [playing]);

  function scrollTrack(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.min(track.clientWidth * 0.85, 360);
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  return <>
    <div className="video-carousel-shell workflow-carousel">
      <VideoCarouselPrev onClick={() => scrollTrack(-1)} label="Previous workflows" />
      <div className="insights-workflow-grid workflow-carousel-track" ref={trackRef}>
        {videos.map(video => {
          const label = classify(video);
          const thumbnail = thumbnailFor(video);
          return <article className="insights-video-card insights-workflow-card" key={video.id}>
            <button type="button" className="insights-thumbnail landscape" onClick={() => setPlaying(video)} aria-label={`Play ${video.title}`}>
              {thumbnail
                ? <img src={thumbnail} alt="" loading="lazy" decoding="async" onError={event => { event.currentTarget.style.display = 'none'; }} />
                : <span className="insights-placeholder">Video thumbnail</span>}
              <span className="insights-play" aria-hidden="true">▶</span>
              {video.duration && <span className="insights-duration">{video.duration}</span>}
            </button>
            <div className="insights-card-copy">
              <h3>{video.title}</h3>
              <span className="insights-category"><i style={{ background: categoryTone(label) }} aria-hidden="true" /><span>{label}</span></span>
              {video.description && <p>{video.description}</p>}
              <div className="insights-card-actions">
                <button type="button" onClick={() => setPlaying(video)}>Watch workflow</button>
                <a href="https://ai.nudgeable.app/" target="_blank" rel="noopener noreferrer">Try in Practice Lab →</a>
              </div>
            </div>
          </article>;
        })}
      </div>
      <VideoCarouselNext onClick={() => scrollTrack(1)} label="Next workflows" />
    </div>

    {playing && <div className="insights-modal" role="dialog" aria-modal="true" aria-labelledby="home-workflow-dialog-title" onClick={event => { if (event.currentTarget === event.target) setPlaying(null); }}>
      <div className="insights-modal-card">
        <div className="insights-modal-head"><strong id="home-workflow-dialog-title">{playing.title}</strong><button ref={closeButtonRef} type="button" onClick={() => setPlaying(null)} aria-label="Close video">×</button></div>
        {isPlayable(playing)
          ? <iframe src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`} title={playing.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          : <div className="insights-modal-placeholder"><strong>Add the YouTube Data API key</strong><span>The live video will play here once the playlist integration is configured.</span></div>}
      </div>
    </div>}
  </>;
}
