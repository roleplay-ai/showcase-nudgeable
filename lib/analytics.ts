import type { NextRequest } from 'next/server';

export type AnalyticsEventType = 'pageview' | 'click';

export interface AnalyticsEvent {
  id: string;
  ip: string;
  event_type: AnalyticsEventType;
  route: string;
  target: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
}

/**
 * Best-effort real client IP from a request. Vercel (and most proxies) put the
 * original visitor first in x-forwarded-for; local dev has none of these, so
 * we fall back to 'unknown' rather than a proxy's own address.
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}
