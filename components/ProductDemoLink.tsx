'use client';

import { useState } from 'react';
import { Icon } from './Icon';

export function ProductDemoLink({ videoId, label }: { videoId: string; label: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="product-demo-placeholder">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={`${label} demo`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="product-demo-placeholder" onClick={() => setPlaying(true)} aria-label={`Play ${label} demo`}>
      <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" />
      <span className="demo-play" aria-hidden="true"><Icon name="play" size={18} /></span>
    </button>
  );
}
