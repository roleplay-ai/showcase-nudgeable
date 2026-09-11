import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/adminAuth';
import { getSupabase, supabaseConfigured } from '@/lib/supabase';
import type { AnalyticsEvent } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;
const STATS_SAMPLE = 5000;

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

  const supabase = getSupabase();

  let query = supabase
    .from('analytics_events')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (eventType === 'pageview' || eventType === 'click') query = query.eq('event_type', eventType);
  if (routeFilter) query = query.ilike('route', `%${routeFilter}%`);
  if (ipFilter) query = query.eq('ip', ipFilter);

  query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Rough aggregate stats over the most recent slice of events -- good
  // enough for a dashboard without needing a SQL aggregation function.
  const { data: sample, error: sampleError } = await supabase
    .from('analytics_events')
    .select('ip, route, event_type')
    .order('created_at', { ascending: false })
    .limit(STATS_SAMPLE);

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
      topIps
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
