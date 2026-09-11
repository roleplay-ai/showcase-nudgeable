'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function send(eventType: 'pageview' | 'click', route: string, target?: string | null) {
  try {
    const payload = JSON.stringify({
      eventType,
      route,
      target: target || undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined
    });
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/track', blob);
      return;
    }
    void fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true
    });
  } catch {
    // Analytics must never break the page.
  }
}

function describeTarget(el: HTMLElement): string {
  const label = el.getAttribute('aria-label') || el.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120);
  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute('href') || '';
    return label ? `${label} → ${href}` : href || 'link';
  }
  return label || el.tagName.toLowerCase();
}

function AnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    send('pageview', query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const el = target?.closest('a, button, [role="button"]') as HTMLElement | null;
      if (!el) return;
      send('click', window.location.pathname, describeTarget(el));
    }
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}

export function AnalyticsTracker() {
  return <Suspense fallback={null}>
    <AnalyticsTrackerInner />
  </Suspense>;
}
