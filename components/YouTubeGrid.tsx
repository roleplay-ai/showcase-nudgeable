'use client';

import { useEffect, useRef, useState } from 'react';
import { fallbackVideos } from './data';
import { Icon } from './Icon';
import { VideoCarouselNext, VideoCarouselPrev } from './VideoCarouselNav';

type Video = { id: string; title: string; category: string; duration?: string; thumbnail?: string; url?: string };

function isLiveYouTubeId(id?: string) {
  return Boolean(id && !id.startsWith('video-') && !id.startsWith('workflow-'));
}

function shortsThumbnail(video: Video) {
  if (isLiveYouTubeId(video.id)) return `https://i.ytimg.com/vi/${video.id}/oar2.jpg`;
  return video.thumbnail;
}

export function YouTubeGrid({ limit = 6 }: { limit?: number }) {
  const fetchLimit = Math.max(limit, 16);
  const [videos, setVideos] = useState<Video[]>(fallbackVideos.slice(0, fetchLimit));
  const [playing, setPlaying] = useState<Video | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/youtube?type=shorts&limit=${fetchLimit}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Could not load Shorts')))
      .then(data => { if (Array.isArray(data.videos) && data.videos.length) setVideos(data.videos); })
      .catch(() => undefined);
    return () => controller.abort();
  }, [fetchLimit]);

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
    const amount = Math.min(track.clientWidth * 0.8, 280);
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  return <>
    <div className="video-carousel-shell">
      <VideoCarouselPrev onClick={() => scrollTrack(-1)} label="Previous short videos" />
      <div className="shorts-grid" ref={trackRef}>
        {videos.map((video, index) => {
          const thumb = shortsThumbnail(video);
          return <button
            type="button"
            className="short-tile"
            key={`${video.id}-${index}`}
            onClick={() => setPlaying(video)}
            aria-label={`Play ${video.title}`}
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
          </button>;
        })}
      </div>
      <VideoCarouselNext onClick={() => scrollTrack(1)} label="Next short videos" />
    </div>

    {playing && <div className="insights-modal" role="dialog" aria-modal="true" aria-labelledby="home-short-dialog-title" onClick={event => { if (event.currentTarget === event.target) setPlaying(null); }}>
      <div className="insights-modal-card portrait">
        <div className="insights-modal-head"><strong id="home-short-dialog-title">{playing.title}</strong><button ref={closeButtonRef} type="button" onClick={() => setPlaying(null)} aria-label="Close video">×</button></div>
        {isLiveYouTubeId(playing.id)
          ? <iframe src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`} title={playing.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          : <div className="insights-modal-placeholder"><strong>Add the YouTube Data API key</strong><span>The live video will play here once the playlist integration is configured.</span></div>}
      </div>
    </div>}
  </>;
}
