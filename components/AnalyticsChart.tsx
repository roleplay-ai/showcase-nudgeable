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
const PAD_RIGHT = 8;
const PAD_BOTTOM = 24;
const PAD_TOP = 12;

export function AnalyticsChart({ timeline }: { timeline: TimelineBucket[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!timeline.length) return null;

  const max = Math.max(1, ...timeline.map(b => b.visitors));
  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const baseline = HEIGHT - PAD_BOTTOM;
  const slot = timeline.length > 1 ? plotWidth / (timeline.length - 1) : 0;

  // Show at most ~10 x-axis labels so they don't collide.
  const labelStride = Math.max(1, Math.ceil(timeline.length / 10));

  function xFor(index: number) {
    return timeline.length > 1 ? PAD_LEFT + index * slot : PAD_LEFT + plotWidth / 2;
  }

  function yFor(value: number) {
    return PAD_TOP + plotHeight - (value / max) * plotHeight;
  }

  const points = timeline.map((bucket, index) => ({ x: xFor(index), y: yFor(bucket.visitors) }));
  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`;

  const gridLines = [0.25, 0.5, 0.75, 1].map(fraction => ({
    fraction,
    y: PAD_TOP + plotHeight * (1 - fraction),
    value: Math.round(max * fraction)
  }));

  const active = hovered !== null ? timeline[hovered] : null;
  const activePoint = hovered !== null ? points[hovered] : null;

  return <div className="analytics-chart">
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Unique visitors over time" className="analytics-chart-svg">
      {gridLines.map(line => (
        <g key={line.fraction}>
          <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={line.y} y2={line.y} className="analytics-chart-grid" />
          <text x={PAD_LEFT - 8} y={line.y} textAnchor="end" dominantBaseline="middle" className="analytics-chart-axis-label">{line.value}</text>
        </g>
      ))}

      <path d={areaPath} className="analytics-chart-area" fill={VISITOR_COLOR} />
      <path d={linePath} className="analytics-chart-line" stroke={VISITOR_COLOR} fill="none" />

      {activePoint && (
        <line x1={activePoint.x} x2={activePoint.x} y1={PAD_TOP} y2={baseline} className="analytics-chart-crosshair" />
      )}

      {timeline.map((bucket, index) => {
        const x = xFor(index);
        return <g
          key={bucket.key}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="analytics-chart-hit"
        >
          {/* Full-height invisible hit target, wider than the line itself */}
          <rect x={x - slot / 2} y={PAD_TOP} width={slot || plotWidth} height={plotHeight} fill="transparent" />
          {hovered === index && (
            <circle cx={x} cy={points[index].y} r={4} fill={VISITOR_COLOR} className="analytics-chart-dot" />
          )}
          {index % labelStride === 0 && (
            <text x={x} y={HEIGHT - PAD_BOTTOM + 16} textAnchor="middle" className="analytics-chart-axis-label">
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
