'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { fallbackVideos } from './data';
import { Icon } from './Icon';

type Video = {
  id: string;
  title: string;
  category: string;
  duration?: string;
  thumbnail?: string;
  url?: string;
  description?: string;
  publishedAt?: string;
};

const fallbackWorkflows: Video[] = [
  { id: 'workflow-1', title: 'Build a Slide Deck From a Document, Start to Finish', category: 'Claude · Presentations', duration: '9:16', thumbnail: '/insights/workflow-1.png', description: 'Turn a long document into a complete, structured presentation.' },
  { id: 'workflow-2', title: 'Set Up an Agent That Clears Your Inbox Every Morning', category: 'ChatGPT · Automation', duration: '7:24', thumbnail: '/insights/workflow-2.png', description: 'Automate inbox triage, summaries and follow-ups.' },
  { id: 'workflow-3', title: 'Turn a Messy Sales Export Into a Chart in Five Minutes', category: 'Gemini · Data', duration: '8:42', thumbnail: '/insights/workflow-3.png', description: 'Clean data, build charts and identify useful patterns quickly.' },
  { id: 'workflow-4', title: 'Deep Research for Market Insights', category: 'Claude · Research', duration: '10:31', thumbnail: '/insights/workflow-4.png', description: 'Run focused research and turn sources into a structured report.' },
  { id: 'workflow-5', title: 'Build a Simple Internal Tool With AI', category: 'AI Agents · No code', duration: '12:08', thumbnail: '/insights/workflow-5.png', description: 'Create a useful internal tool without writing production code.' }
];

const filters = ['All', 'Claude', 'Copilot', 'Gemini', 'ChatGPT', 'AI Agents', 'Data', 'Presentations', 'Research', 'Automation'];

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

function matches(video: Video, activeFilter: string, search: string) {
  const label = classify(video);
  const text = `${video.title} ${video.description || ''} ${video.category || ''} ${label}`.toLowerCase();
  const filterMatch = activeFilter === 'All' || text.includes(activeFilter.toLowerCase()) || label.includes(activeFilter);
  const searchMatch = !search || text.includes(search.toLowerCase());
  return filterMatch && searchMatch;
}

function youtubeThumbnail(video: Video) {
  if (video.thumbnail) return video.thumbnail;
  if (video.id && !video.id.startsWith('video-') && !video.id.startsWith('workflow-')) {
    return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  }
  return undefined;
}

function youtubeWatchUrl(video: Video, short?: boolean) {
  if (video.url) {
    if (short && video.id && !video.id.startsWith('video-') && !video.id.startsWith('workflow-')) {
      return `https://www.youtube.com/shorts/${video.id}`;
    }
    return video.url;
  }
  if (video.id && !video.id.startsWith('video-') && !video.id.startsWith('workflow-')) {
    return short ? `https://www.youtube.com/shorts/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`;
  }
  return undefined;
}

function normalizeVideos(videos: Video[]) {
  return videos.map(video => ({
    ...video,
    title: cleanTitle(video.title),
    description: shortDescription(video.description),
    thumbnail: youtubeThumbnail(video),
    category: classify(video)
  }));
}

function VideoThumbnail({ video, portrait, featured, onPlay, openOnYouTube }: { video: Video; portrait?: boolean; featured?: boolean; onPlay: (video: Video) => void; openOnYouTube?: boolean }) {
  const thumbnail = youtubeThumbnail(video);
  const href = openOnYouTube ? youtubeWatchUrl(video, portrait) : undefined;
  const media = <>
    {thumbnail
      ? <img src={thumbnail} alt="" loading={featured ? 'eager' : 'lazy'} decoding="async" onError={event => { event.currentTarget.style.display = 'none'; }} />
      : <span className="insights-placeholder">Video thumbnail</span>}
    <span className="insights-play" aria-hidden="true">▶</span>
    {video.duration && <span className="insights-duration">{video.duration}</span>}
  </>;
  const className = `insights-thumbnail ${portrait ? 'portrait' : 'landscape'}`;

  if (href) {
    return <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.title} on YouTube`}>
      {media}
    </a>;
  }

  return <button type="button" className={className} onClick={() => onPlay(video)} aria-label={`Play ${video.title}`}>
    {media}
  </button>;
}

async function loadPlaylist(type: 'shorts' | 'workflows', signal: AbortSignal) {
  const response = await fetch(`/api/youtube?type=${type}&limit=250`, { signal });
  if (!response.ok) throw new Error(`${type} unavailable`);
  const data = await response.json();
  return Array.isArray(data.videos) ? normalizeVideos(data.videos) : [];
}

export function InsightsVideoLibrary() {
  const [shorts, setShorts] = useState<Video[]>(fallbackVideos);
  const [workflows, setWorkflows] = useState<Video[]>(fallbackWorkflows);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [shortLimit, setShortLimit] = useState(4);
  const [workflowLimit, setWorkflowLimit] = useState(3);
  const [playing, setPlaying] = useState<Video | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    loadPlaylist('shorts', controller.signal)
      .then(videos => { if (videos.length) setShorts(videos); })
      .catch(error => { if (error?.name !== 'AbortError') undefined; });
    loadPlaylist('workflows', controller.signal)
      .then(videos => { if (videos.length) setWorkflows(videos); })
      .catch(error => { if (error?.name !== 'AbortError') undefined; });
    return () => controller.abort();
  }, []);

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

  const filteredShorts = useMemo(() => shorts.filter(video => matches(video, activeFilter, search)), [shorts, activeFilter, search]);
  const filteredWorkflows = useMemo(() => workflows.filter(video => matches(video, activeFilter, search)), [workflows, activeFilter, search]);
  const featuredShort = filteredShorts[0] || shorts[0];
  const featuredWorkflow = filteredWorkflows[0] || workflows[0];
  const visibleWorkflows = filteredWorkflows.slice(0, workflowLimit);
  const hasMoreWorkflows = filteredWorkflows.length > workflowLimit;

  function changeFilter(filter: string) {
    setActiveFilter(filter);
    setShortLimit(4);
    setWorkflowLimit(3);
  }

  function changeSearch(value: string) {
    setSearch(value);
    setShortLimit(4);
    setWorkflowLimit(3);
  }

  return <div className="insights-page">
    <section className="insights-hero">
      <div className="container insights-hero-grid">
        <div className="insights-hero-copy">
          <span className="eyebrow">INSIGHTS</span>
          <h1>Practical AI insights for work.</h1>
          <p>Short videos on what is changing in AI, plus step-by-step workflow explainers showing how to apply it.</p>
          <div className="insights-counts" aria-label="Video library totals">
            <div><strong>{shorts.length}+</strong><span>Short videos</span></div>
            <div><strong>{workflows.length}+</strong><span>Workflow explainers</span></div>
          </div>
        </div>
        <div className="insights-featured-grid">
          {featuredShort && <article className="insights-feature-card short-feature">
            <small>FEATURED SHORT</small>
            <VideoThumbnail video={featuredShort} portrait featured onPlay={setPlaying} openOnYouTube />
            <h2>{featuredShort.title}</h2>
            <span>{classify(featuredShort)}</span>
          </article>}
          {featuredWorkflow && <article className="insights-feature-card workflow-feature">
            <small>FEATURED WORKFLOW</small>
            <VideoThumbnail video={featuredWorkflow} featured onPlay={setPlaying} />
            <h2>{featuredWorkflow.title}</h2>
            <span>{classify(featuredWorkflow)}</span>
          </article>}
        </div>
      </div>
    </section>

    <section className="insights-library-section" aria-label="AI video library">
      <div className="container">
        <div className="insights-filter-shell">
          <div className="insights-filters" aria-label="Filter videos by topic">
            {filters.map(filter => <button type="button" key={filter} aria-pressed={activeFilter === filter} className={activeFilter === filter ? 'active' : ''} onClick={() => changeFilter(filter)}>{filter}</button>)}
          </div>
          <label className="insights-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search videos and workflows</span><input type="search" value={search} onChange={event => changeSearch(event.target.value)} placeholder="Search videos and workflows..." /></label>
        </div>

        <div id="shorts" className="insights-section-head">
          <div><h2>Latest AI Shorts</h2><p>Quick insights, updates and practical experiments in under three minutes.</p></div>
        </div>
        <div className="insights-shorts-grid">
          {filteredShorts.slice(0, shortLimit).map(video => <article className="insights-video-card" key={video.id}>
            <VideoThumbnail video={video} portrait onPlay={setPlaying} openOnYouTube />
            <div className="insights-card-copy"><h3>{video.title}</h3><span className="insights-category"><i style={{ background: categoryTone(classify(video)) }} aria-hidden="true" /><span>{classify(video)}</span></span></div>
          </article>)}
        </div>
        {!filteredShorts.length && <p className="insights-empty">No Shorts match this filter.</p>}
        {filteredShorts.length > shortLimit && <div className="insights-view-more"><button type="button" onClick={() => setShortLimit(limit => limit + 4)}>View more</button></div>}

        <div id="workflows" className="insights-section-head workflow-heading">
          <div className="insights-section-title">
            <span className="insights-section-icon" aria-hidden="true"><Icon name="book" size={18} /></span>
            <div>
              <h2>Workflow Explainers</h2>
              <p>Step-by-step videos showing how to apply AI to real workplace tasks.</p>
            </div>
          </div>
          {hasMoreWorkflows && <button type="button" className="insights-inline-more" onClick={() => setWorkflowLimit(limit => limit + 3)}>View more</button>}
        </div>
        <div className="insights-workflow-grid">
          {visibleWorkflows.map(video => {
            const label = classify(video);
            return <article className="insights-video-card insights-workflow-card" key={video.id}>
              <VideoThumbnail video={video} onPlay={setPlaying} />
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
        {!filteredWorkflows.length && <p className="insights-empty">No workflow explainers match this filter.</p>}
      </div>
    </section>

    <section className="container insights-practice-cta">
      <div><strong>Practice what you watch.</strong><p>Explore guided AI workflows and apply them to real work.</p></div>
      <a href="https://ai.nudgeable.app/" target="_blank" rel="noopener noreferrer">Open Practice Lab</a>
    </section>

    {playing && <div className="insights-modal" role="dialog" aria-modal="true" aria-labelledby="video-dialog-title" onClick={event => { if (event.currentTarget === event.target) setPlaying(null); }}>
      <div className="insights-modal-card">
        <div className="insights-modal-head"><strong id="video-dialog-title">{playing.title}</strong><button ref={closeButtonRef} type="button" onClick={() => setPlaying(null)} aria-label="Close video">×</button></div>
        {playing.id && !playing.id.startsWith('video-') && !playing.id.startsWith('workflow-')
          ? <iframe src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`} title={playing.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          : <div className="insights-modal-placeholder"><strong>Add the YouTube Data API key</strong><span>The live video will play here once the playlist integration is configured.</span></div>}
      </div>
    </div>}
  </div>;
}
