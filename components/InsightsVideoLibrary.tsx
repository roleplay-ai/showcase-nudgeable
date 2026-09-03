'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { fallbackVideos } from './data';
import { Icon } from './Icon';
import { VideoCarouselNext, VideoCarouselPrev } from './VideoCarouselNav';
import { formatVideoDate, isLiveYouTubeId, type YouTubeVideo as Video } from './youtubeVideos';

type Playing = { video: Video; portrait?: boolean };

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

function youtubeThumbnail(video: Video) {
  if (video.thumbnail) return video.thumbnail;
  if (video.id && !video.id.startsWith('video-') && !video.id.startsWith('workflow-')) {
    return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  }
  return undefined;
}

function normalizeVideos(videos: Video[]) {
  return videos.map(video => ({
    ...video,
    title: cleanTitle(video.title),
    description: shortDescription(video.description),
    thumbnail: youtubeThumbnail(video)
  }));
}

function isPlayable(video: Video) {
  return isLiveYouTubeId(video.id);
}

function VideoThumbnail({ video, portrait, featured, onPlay }: { video: Video; portrait?: boolean; featured?: boolean; onPlay: (video: Video, portrait?: boolean) => void }) {
  const thumbnail = youtubeThumbnail(video);
  const media = <>
    {thumbnail
      ? <img src={thumbnail} alt="" loading={featured ? 'eager' : 'lazy'} decoding="async" onError={event => { event.currentTarget.style.display = 'none'; }} />
      : <span className="insights-placeholder">Video thumbnail</span>}
    <span className="insights-play" aria-hidden="true">▶</span>
    {video.duration && <span className="insights-duration">{video.duration}</span>}
  </>;

  return <button type="button" className={`insights-thumbnail ${portrait ? 'portrait' : 'landscape'}`} onClick={() => onPlay(video, portrait)} aria-label={`Play ${video.title}`}>
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
  const [workflows, setWorkflows] = useState<Video[]>([]);
  const [playing, setPlaying] = useState<Playing | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shortsTrackRef = useRef<HTMLDivElement>(null);
  const workflowsTrackRef = useRef<HTMLDivElement>(null);

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

  function openVideo(video: Video, portrait?: boolean) {
    setPlaying({ video, portrait: Boolean(portrait) });
  }

  function scrollTrack(ref: RefObject<HTMLDivElement | null>, direction: -1 | 1) {
    const track = ref.current;
    if (!track) return;
    const amount = Math.min(track.clientWidth * 0.85, 360);
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  return <div className="insights-page">
    <section className="insights-hero">
      <div className="container insights-hero-inner">
        <div className="insights-hero-copy">
          <span className="eyebrow">Insights</span>
          <h1>Practical AI insights for work.</h1>
          <p>
            Short videos on what is changing in AI, plus step-by-step workflow explainers showing how to apply it.
          </p>
          <div className="insights-hero-features">
            <div className="insights-hero-feature">
              <div className="insights-hero-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M10 9.5l5 3-5 3z" />
                </svg>
              </div>
              <div className="insights-hero-feature-label">Short videos</div>
            </div>
            <div className="insights-hero-feature">
              <div className="insights-hero-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="5" y="3" width="14" height="18" rx="2" />
                  <path d="M8.5 8h7M8.5 12h7M8.5 16h5" />
                </svg>
              </div>
              <div className="insights-hero-feature-label">Workflow explainers</div>
            </div>
            <div className="insights-hero-feature">
              <div className="insights-hero-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M9 18h6" />
                  <path d="M10 21h4" />
                  <path d="M8.6 15.6A6 6 0 1 1 15.4 15.6C14.5 16.3 14 17 14 18h-4c0-1-.5-1.7-1.4-2.4z" />
                </svg>
              </div>
              <div className="insights-hero-feature-label">Practical &amp; actionable</div>
            </div>
          </div>
        </div>

        <div className="insights-hero-visual" aria-hidden="true">
          <div className="insights-hero-glow" />
          <div className="insights-video-stack">
            <div className="insights-hero-bubble">
              <div className="insights-hero-bubble-dots"><i /><i /><i /></div>
            </div>
            <div className="insights-hero-squiggle">
              <svg viewBox="0 0 60 26">
                <path d="M3 7c7 0 4 12 12 12s7-12 14-12 5 12 13 12 6-7 15-7" />
              </svg>
            </div>
            <div className="insights-hero-spark">✦</div>
            <div className="insights-hero-video-card">
              <div className="insights-hero-screen">
                <div className="insights-hero-play" />
              </div>
              <div className="insights-hero-progress"><span /></div>
              <div className="insights-hero-meta-lines">
                <span /><span />
              </div>
            </div>
            <div className="insights-hero-phone">
              <div className="insights-hero-phone-screen">
                <div className="insights-hero-play" />
              </div>
              <div className="insights-hero-phone-line" />
              <div className="insights-hero-phone-line short" />
            </div>
            <div className="insights-hero-dots" />
          </div>
        </div>
      </div>
    </section>

    <section className="insights-library-section" aria-label="AI video library">
      <div className="container">
        <div id="shorts" className="insights-section-head">
          <div><h2>Latest AI Shorts</h2><p>Quick insights, updates and practical experiments in under three minutes.</p></div>
        </div>
        <div className="video-carousel-shell shorts-carousel">
          <VideoCarouselPrev onClick={() => scrollTrack(shortsTrackRef, -1)} label="Previous short videos" />
          <div className="insights-shorts-grid" ref={shortsTrackRef}>
            {shorts.map(video => <article className="insights-video-card" key={video.id}>
              <VideoThumbnail video={video} portrait onPlay={openVideo} />
              <div className="insights-card-copy"><h3>{video.title}</h3></div>
            </article>)}
          </div>
          <VideoCarouselNext onClick={() => scrollTrack(shortsTrackRef, 1)} label="Next short videos" />
        </div>
        {!shorts.length && <p className="insights-empty">No Shorts available yet.</p>}

        <div id="workflows" className="insights-section-head workflow-heading">
          <div className="insights-section-title">
            <span className="insights-section-icon" aria-hidden="true"><Icon name="book" size={18} /></span>
            <div>
              <h2>Workflow Explainers</h2>
              <p>Step-by-step videos showing how to apply AI to real workplace tasks.</p>
            </div>
          </div>
        </div>
        <div className="video-carousel-shell workflow-carousel">
          <VideoCarouselPrev onClick={() => scrollTrack(workflowsTrackRef, -1)} label="Previous workflows" />
          <div className="insights-workflow-grid" ref={workflowsTrackRef}>
            {workflows.map(video => <article className="insights-video-card insights-workflow-card" key={video.id}>
              <VideoThumbnail video={video} onPlay={openVideo} />
              <div className="insights-card-copy">
                <h3>{video.title}</h3>
                {video.publishedAt && <time className="insights-date" dateTime={video.publishedAt}>{formatVideoDate(video.publishedAt)}</time>}
                {video.description && <p>{video.description}</p>}
              </div>
            </article>)}
          </div>
          <VideoCarouselNext onClick={() => scrollTrack(workflowsTrackRef, 1)} label="Next workflows" />
        </div>
        {!workflows.length && <p className="insights-empty">No workflow explainers available yet.</p>}
      </div>
    </section>

    {playing && <div className="insights-modal" role="dialog" aria-modal="true" aria-labelledby="video-dialog-title" onClick={event => { if (event.currentTarget === event.target) setPlaying(null); }}>
      <div className={`insights-modal-card${playing.portrait ? ' portrait' : ''}`}>
        <div className="insights-modal-head"><strong id="video-dialog-title">{playing.video.title}</strong><button ref={closeButtonRef} type="button" onClick={() => setPlaying(null)} aria-label="Close video">×</button></div>
        {isPlayable(playing.video)
          ? <iframe src={`https://www.youtube-nocookie.com/embed/${playing.video.id}?autoplay=1&rel=0`} title={playing.video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          : <div className="insights-modal-placeholder"><strong>Add the YouTube Data API key</strong><span>The live video will play here once the playlist integration is configured.</span></div>}
      </div>
    </div>}
  </div>;
}
