'use client';

import { useState } from 'react';

export interface TimelineBucket {
  key: string;
  label: string;
  pageviews: number;
  clicks: number;
}

const PAGEVIEW_COLOR = '#1d4ed8';
const CLICK_COLOR = '#b45309';

const WIDTH = 900;
const HEIGHT = 220;
const PAD_LEFT = 34;
const PAD_BOTTOM = 24;
const PAD_TOP = 12;
const GAP = 2; // surface gap between stacked segments

export function AnalyticsChart({ timeline }: { timeline: TimelineBucket[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!timeline.length) return null;

  const max = Math.max(1, ...timeline.map(b => b.pageviews + b.clicks));
  const plotWidth = WIDTH - PAD_LEFT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const barSlot = plotWidth / timeline.length;
  const barWidth = Math.max(2, Math.min(28, barSlot * 0.6));

  // Show at most ~10 x-axis labels so they don't collide.
  const labelStride = Math.max(1, Math.ceil(timeline.length / 10));

  function yFor(value: number) {
    return PAD_TOP + plotHeight - (value / max) * plotHeight;
  }

  const gridLines = [0.25, 0.5, 0.75, 1].map(fraction => ({
    fraction,
    y: PAD_TOP + plotHeight * (1 - fraction),
    value: Math.round(max * fraction)
  }));

  const active = hovered !== null ? timeline[hovered] : null;

  return <div className="analytics-chart">
    <div className="analytics-chart-legend">
      <span><i style={{ background: PAGEVIEW_COLOR }} />Page views</span>
      <span><i style={{ background: CLICK_COLOR }} />Clicks</span>
    </div>
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Page views and clicks over time" className="analytics-chart-svg">
      {gridLines.map(line => (
        <g key={line.fraction}>
          <line x1={PAD_LEFT} x2={WIDTH} y1={line.y} y2={line.y} className="analytics-chart-grid" />
          <text x={PAD_LEFT - 8} y={line.y} textAnchor="end" dominantBaseline="middle" className="analytics-chart-axis-label">{line.value}</text>
        </g>
      ))}

      {timeline.map((bucket, index) => {
        const x = PAD_LEFT + index * barSlot + (barSlot - barWidth) / 2;
        const total = bucket.pageviews + bucket.clicks;
        const baseline = HEIGHT - PAD_BOTTOM;

        // Pageviews sit on the baseline; clicks stack above them with a 2px
        // surface gap between the two segments.
        const pageviewTop = yFor(bucket.pageviews);
        const pageviewHeight = Math.max(0, baseline - pageviewTop);
        const clickSegmentBottom = bucket.pageviews > 0 ? pageviewTop - GAP : baseline;
        const clickTop = total > 0 ? yFor(total) : baseline;
        const clickHeight = Math.max(0, clickSegmentBottom - clickTop);

        return <g
          key={bucket.key}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="analytics-chart-bar-group"
        >
          {/* Full-height invisible hit target, bigger than the visible bar */}
          <rect x={PAD_LEFT + index * barSlot} y={PAD_TOP} width={barSlot} height={plotHeight} fill="transparent" />
          {bucket.pageviews > 0 && (
            <rect
              x={x}
              y={pageviewTop}
              width={barWidth}
              height={pageviewHeight}
              rx={2}
              fill={PAGEVIEW_COLOR}
              opacity={hovered === null || hovered === index ? 1 : 0.35}
            />
          )}
          {bucket.clicks > 0 && (
            <rect
              x={x}
              y={clickTop}
              width={barWidth}
              height={clickHeight}
              rx={2}
              fill={CLICK_COLOR}
              opacity={hovered === null || hovered === index ? 1 : 0.35}
            />
          )}
          {index % labelStride === 0 && (
            <text
              x={PAD_LEFT + index * barSlot + barSlot / 2}
              y={HEIGHT - PAD_BOTTOM + 16}
              textAnchor="middle"
              className="analytics-chart-axis-label"
            >
              {bucket.label}
            </text>
          )}
        </g>;
      })}
    </svg>
    {active && <div className="analytics-chart-tooltip">
      <strong>{active.label}</strong>
      <span><i style={{ background: PAGEVIEW_COLOR }} />Page views: {active.pageviews}</span>
      <span><i style={{ background: CLICK_COLOR }} />Clicks: {active.clicks}</span>
    </div>}
  </div>;
}
