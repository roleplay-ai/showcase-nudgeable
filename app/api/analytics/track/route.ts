import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, supabaseConfigured } from '@/lib/supabase';
import { getClientIp } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clip(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(request: NextRequest) {
  // Fire-and-forget beacon: never make the caller's page wait or error out
  // visibly, and skip silently if analytics storage isn't configured yet.
  if (!supabaseConfigured()) {
    return NextResponse.json({ ok: false }, { status: 202 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    // navigator.sendBeacon may deliver a Blob whose text is JSON but without
    // a JSON content-type; try text() as a fallback before giving up.
    try {
      body = JSON.parse(await request.text());
    } catch {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
  }

  const payload = (body || {}) as Record<string, unknown>;
  const eventType = payload.eventType === 'click' ? 'click' : 'pageview';
  const route = clip(payload.route, 500) || '/';
  const target = clip(payload.target, 300);
  const referrer = clip(payload.referrer, 500);
  const userAgent = clip(request.headers.get('user-agent'), 300);
  const ip = getClientIp(request);

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('analytics_events').insert({
      ip,
      event_type: eventType,
      route,
      target,
      referrer,
      user_agent: userAgent
    });
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
