import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/adminAuth';
import { getSupabase, supabaseConfigured } from '@/lib/supabase';
import type { AnalyticsEvent } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;
const STATS_SAMPLE = 5000;

// Supported time-range filters. 'all' means no lower bound on created_at.
const RANGE_HOURS: Record<string, number> = {
  '24h': 24,
  '7d': 24 * 7,
  '15d': 24 * 15,
  '30d': 24 * 30
};

function rangeCutoffIso(range: string | null): string | null {
  if (!range || !(range in RANGE_HOURS)) return null;
  const ms = RANGE_HOURS[range] * 60 * 60 * 1000;
  return new Date(Date.now() - ms).toISOString();
}

interface TimelineBucket {
  key: string;
  label: string;
  visitors: number;
}

// Buckets the chart into hours (24h range) or days (everything else, capped
// at 30 buckets so "all time" still renders a readable trend rather than an
// unbounded axis). Counts DISTINCT visitor IPs per bucket -- not raw event
// counts -- and only over whatever the caller has already filtered the
// sample down to (event type / route / IP / range), so the chart always
// matches what the stat cards and table are currently showing.
function buildTimeline(sample: { ip: string; created_at: string }[], range: string | null): TimelineBucket[] {
  const hourly = range === '24h';
  const bucketCount = range && range in RANGE_HOURS ? RANGE_HOURS[range] / (hourly ? 1 : 24) : 30;
  const now = new Date();

  function bucketKey(date: Date): string {
    if (hourly) return date.toISOString().slice(0, 13); // YYYY-MM-DDTHH
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  function bucketLabel(date: Date): string {
    return hourly
      ? date.toLocaleString(undefined, { hour: 'numeric' })
      : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  const bucketOrder: string[] = [];
  const bucketLabels = new Map<string, string>();
  const bucketIps = new Map<string, Set<string>>();
  for (let i = bucketCount - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    if (hourly) date.setHours(date.getHours() - i, 0, 0, 0);
    else date.setDate(date.getDate() - i);
    const key = bucketKey(date);
    bucketOrder.push(key);
    bucketLabels.set(key, bucketLabel(date));
    bucketIps.set(key, new Set());
  }

  for (const row of sample) {
    const key = bucketKey(new Date(row.created_at));
    const ips = bucketIps.get(key);
    if (!ips) continue; // outside the displayed window
    ips.add(row.ip);
  }

  return bucketOrder.map(key => ({
    key,
    label: bucketLabels.get(key) || key,
    visitors: bucketIps.get(key)?.size || 0
  }));
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  if (!supabaseConfigured()) {
    return NextResponse.json({ events: [], total: 0, page: 1, pageSize: PAGE_SIZE, stats: null, configured: false });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const eventType = searchParams.get('type');
  const routeFilter = searchParams.get('route');
  const ipFilter = searchParams.get('ip');
  const range = searchParams.get('range');
  const cutoff = rangeCutoffIso(range);

  const supabase = getSupabase();

  let query = supabase
    .from('analytics_events')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (eventType === 'pageview' || eventType === 'click') query = query.eq('event_type', eventType);
  if (routeFilter) query = query.ilike('route', `%${routeFilter}%`);
  if (ipFilter) query = query.eq('ip', ipFilter);
  if (cutoff) query = query.gte('created_at', cutoff);

  query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Rough aggregate stats over the most recent slice of events -- good
  // enough for a dashboard without needing a SQL aggregation function.
  // Same filters as the table above, so the stat cards and chart always
  // reflect exactly what's currently filtered/visible.
  let statsQuery = supabase
    .from('analytics_events')
    .select('ip, route, event_type, created_at')
    .order('created_at', { ascending: false })
    .limit(STATS_SAMPLE);
  if (eventType === 'pageview' || eventType === 'click') statsQuery = statsQuery.eq('event_type', eventType);
  if (routeFilter) statsQuery = statsQuery.ilike('route', `%${routeFilter}%`);
  if (ipFilter) statsQuery = statsQuery.eq('ip', ipFilter);
  if (cutoff) statsQuery = statsQuery.gte('created_at', cutoff);

  const { data: sample, error: sampleError } = await statsQuery;

  let stats = null;
  if (!sampleError && sample) {
    const uniqueIps = new Set(sample.map(row => row.ip)).size;
    const routeCounts = new Map<string, number>();
    const ipCounts = new Map<string, number>();
    let totalPageviews = 0;
    let totalClicks = 0;
    for (const row of sample) {
      routeCounts.set(row.route, (routeCounts.get(row.route) || 0) + 1);
      ipCounts.set(row.ip, (ipCounts.get(row.ip) || 0) + 1);
      if (row.event_type === 'click') totalClicks += 1;
      else totalPageviews += 1;
    }
    const topRoutes = [...routeCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([route, count]) => ({ route, count }));
    const topIps = [...ipCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }));
    stats = {
      sampleSize: sample.length,
      uniqueIps,
      totalPageviews,
      totalClicks,
      topRoutes,
      topIps,
      timeline: buildTimeline(sample, range)
    };
  }

  return NextResponse.json({
    events: (data || []) as AnalyticsEvent[],
    total: count || 0,
    page,
    pageSize: PAGE_SIZE,
    stats,
    configured: true
  });
}
