'use client';

import { useState } from 'react';

export interface TimelineBucket {
  key: string;
  label: string;
  visitors: number;
}

const VISITOR_COLOR = '#1d4ed8';

const WIDTH = 900;
const HEIGHT = 220;
const PAD_LEFT = 34;
const PAD_BOTTOM = 24;
const PAD_TOP = 12;

export function AnalyticsChart({ timeline }: { timeline: TimelineBucket[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!timeline.length) return null;

  const max = Math.max(1, ...timeline.map(b => b.visitors));
  const plotWidth = WIDTH - PAD_LEFT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const barSlot = plotWidth / timeline.length;
  const barWidth = Math.max(2, Math.min(28, barSlot * 0.6));
  const baseline = HEIGHT - PAD_BOTTOM;

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
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Unique visitors over time" className="analytics-chart-svg">
      {gridLines.map(line => (
        <g key={line.fraction}>
          <line x1={PAD_LEFT} x2={WIDTH} y1={line.y} y2={line.y} className="analytics-chart-grid" />
          <text x={PAD_LEFT - 8} y={line.y} textAnchor="end" dominantBaseline="middle" className="analytics-chart-axis-label">{line.value}</text>
        </g>
      ))}

      {timeline.map((bucket, index) => {
        const x = PAD_LEFT + index * barSlot + (barSlot - barWidth) / 2;
        const top = yFor(bucket.visitors);
        const height = Math.max(0, baseline - top);

        return <g
          key={bucket.key}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="analytics-chart-bar-group"
        >
          {/* Full-height invisible hit target, bigger than the visible bar */}
          <rect x={PAD_LEFT + index * barSlot} y={PAD_TOP} width={barSlot} height={plotHeight} fill="transparent" />
          {bucket.visitors > 0 && (
            <rect
              x={x}
              y={top}
              width={barWidth}
              height={height}
              rx={2}
              fill={VISITOR_COLOR}
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
      <span><i style={{ background: VISITOR_COLOR }} />Visitors: {active.visitors}</span>
    </div>}
  </div>;
}
