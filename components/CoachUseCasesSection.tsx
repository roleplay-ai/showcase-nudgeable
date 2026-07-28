'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { SectionHeader } from './SectionHeader';

export type CoachUseCase = {
  id: string;
  videoId: string;
  title: string;
  subtitle: string;
  demoLabel: string;
  bullets: string[];
  variant: 'sales' | 'leadership';
};

export function CoachUseCasesSection({ items }: { items: CoachUseCase[] }) {
  const [playing, setPlaying] = useState<CoachUseCase | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  return <>
    <section id="coach-use-cases" className="soft-section">
      <div className="container">
        <SectionHeader eyebrow="SALES AND LEADERSHIP" title="Two practice environments for critical conversations." />
        <div className="coach-use-case-grid">
          {items.map(item => <article className={`coach-use-case-card ${item.variant}`} key={item.id} id={item.id}>
            <button type="button" className="coach-demo-slot" onClick={() => setPlaying(item)} aria-label={`Play ${item.demoLabel}`}>
              <img src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
              <span className="coach-demo-play" aria-hidden="true"><Icon name="play" size={24} /></span>
            </button>
            <div className="coach-use-copy">
              <span className="eyebrow">{item.title}</span>
              <h2>{item.subtitle}</h2>
              <div className="check-list compact-check-list">
                {item.bullets.map(point => <div className="check-item" key={point}><span><Icon name="check" size={15} /></span><span>{point}</span></div>)}
              </div>
              <button type="button" className="button button-secondary button-compact" onClick={() => setPlaying(item)}>Watch demo <Icon name="play" size={15} /></button>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    {playing && <div className="insights-modal" role="dialog" aria-modal="true" aria-labelledby="coach-demo-dialog-title" onClick={event => { if (event.currentTarget === event.target) setPlaying(null); }}>
      <div className="insights-modal-card">
        <div className="insights-modal-head">
          <strong id="coach-demo-dialog-title">{playing.demoLabel}</strong>
          <button ref={closeButtonRef} type="button" onClick={() => setPlaying(null)} aria-label="Close video">×</button>
        </div>
        <iframe src={`https://www.youtube-nocookie.com/embed/${playing.videoId}?autoplay=1&rel=0`} title={playing.demoLabel} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      </div>
    </div>}
  </>;
}
