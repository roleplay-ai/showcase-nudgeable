'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import type { AnalyticsEvent } from '@/lib/analytics';
import { AnalyticsChart, type TimelineBucket } from './AnalyticsChart';

interface Stats {
  sampleSize: number;
  uniqueIps: number;
  totalPageviews: number;
  totalClicks: number;
  topRoutes: { route: string; count: number }[];
  topIps: { ip: string; count: number }[];
  timeline: TimelineBucket[];
}

interface Response {
  events: AnalyticsEvent[];
  total: number;
  page: number;
  pageSize: number;
  stats: Stats | null;
  configured: boolean;
}

function rangeLabel(range: string) {
  switch (range) {
    case '24h': return 'Last 24 hours';
    case '7d': return 'Last 7 days';
    case '15d': return 'Last 15 days';
    case '30d': return 'Last 30 days';
    default: return '';
  }
}

function formatTime(value: string) {
  try {
    return new Date(value).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return value;
  }
}

export function AnalyticsDashboard() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [ipFilter, setIpFilter] = useState('');
  const [rangeFilter, setRangeFilter] = useState('');

  const load = useCallback(async (pageArg: number) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(pageArg) });
      if (typeFilter) params.set('type', typeFilter);
      if (routeFilter) params.set('route', routeFilter);
      if (ipFilter) params.set('ip', ipFilter);
      if (rangeFilter) params.set('range', rangeFilter);
      const response = await fetch(`/api/analytics?${params.toString()}`, { cache: 'no-store' });
      if (response.status === 401) {
        setSignedIn(false);
        return;
      }
      const payload = await response.json().catch(() => ({})) as Partial<Response> & { error?: string };
      if (!response.ok) {
        setError(payload.error || 'Could not load analytics.');
        setData(null);
        return;
      }
      setData({
        events: Array.isArray(payload.events) ? payload.events : [],
        total: payload.total ?? 0,
        page: payload.page ?? pageArg,
        pageSize: payload.pageSize ?? 50,
        stats: payload.stats ?? null,
        configured: payload.configured !== false
      });
    } finally {
      setLoading(false);
    }
  }, [typeFilter, routeFilter, ipFilter, rangeFilter]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const response = await fetch('/api/admin/session', { cache: 'no-store' });
      const payload = await response.json().catch(() => ({})) as { configured?: boolean };
      if (cancelled) return;
      setConfigured(payload.configured !== false);
      setSignedIn(response.ok);
      if (response.ok) await load(1);
      setReady(true);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!signedIn) return;
    setPage(1);
    void load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, routeFilter, ipFilter, rangeFilter, signedIn]);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const payload = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) {
      setError(payload.error || 'Could not sign in.');
      return;
    }
    setPassword('');
    setSignedIn(true);
    await load(1);
  }

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setSignedIn(false);
    setData(null);
  }

  function changePage(next: number) {
    setPage(next);
    void load(next);
  }

  if (!ready) {
    return <div className="blog-write-page"><div className="container"><p>Loading analytics…</p></div></div>;
  }

  if (!configured) {
    return <div className="blog-write-page"><div className="container blog-login-card">
      <span className="eyebrow">ADMIN</span>
      <h1>Analytics is not configured.</h1>
      <p>Set <code>ADMIN_PASSWORD</code> in the environment to enable this page.</p>
    </div></div>;
  }

  if (!signedIn) {
    return <div className="blog-write-page"><div className="container blog-login-card">
      <span className="eyebrow">ADMIN</span>
      <h1>Site analytics.</h1>
      <p>Sign in to see visitor IP addresses, pages viewed, and clicks.</p>
      <form className="blog-login-form" onSubmit={signIn}>
        <label><span>Admin password</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required /></label>
        <button className="button button-primary" type="submit">Sign in</button>
        {error && <p className="form-message error">{error}</p>}
      </form>
    </div></div>;
  }

  const stats = data?.stats;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return <div className="blog-write-page">
    <div className="container analytics-layout">
      <div className="blog-write-head">
        <div>
          <span className="eyebrow">ADMIN</span>
          <h1>Site analytics</h1>
        </div>
        <div className="blog-write-actions">
          <button type="button" className="button button-secondary" onClick={() => void load(page)}>{loading ? 'Refreshing…' : 'Refresh'}</button>
          <button type="button" className="button button-secondary" onClick={signOut}>Sign out</button>
        </div>
      </div>

      {error && <p className="form-message error">{error}</p>}
      {data && !data.configured && <p className="form-message error">Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to start recording visits.</p>}

      {stats && <div className="analytics-stats">
        <div className="analytics-stat-card">
          <span>Unique IP addresses</span>
          <strong>{stats.uniqueIps}</strong>
        </div>
        <div className="analytics-stat-card">
          <span>Page views</span>
          <strong>{stats.totalPageviews}</strong>
        </div>
        <div className="analytics-stat-card">
          <span>Clicks</span>
          <strong>{stats.totalClicks}</strong>
        </div>
        <div className="analytics-stat-card">
          <span>Total events</span>
          <strong>{data?.total ?? 0}</strong>
        </div>
      </div>}

      {stats && stats.timeline.length > 0 && <div className="analytics-chart-card">
        <div className="analytics-chart-head">
          <strong>Page views &amp; clicks over time</strong>
          <span>{rangeFilter ? rangeLabel(rangeFilter) : 'Last 30 days'}</span>
        </div>
        <AnalyticsChart timeline={stats.timeline} />
      </div>}

      {stats && <div className="analytics-top-lists">
        <div>
          <strong>Top pages</strong>
          <ul>
            {stats.topRoutes.map(item => (
              <li key={item.route}><code>{item.route}</code><span>{item.count}</span></li>
            ))}
            {!stats.topRoutes.length && <li>No visits recorded yet.</li>}
          </ul>
        </div>
        <div>
          <strong>Top IP addresses</strong>
          <ul>
            {stats.topIps.map(item => (
              <li key={item.ip}>
                <button type="button" className="button button-text" onClick={() => setIpFilter(item.ip)}>{item.ip}</button>
                <span>{item.count}</span>
              </li>
            ))}
            {!stats.topIps.length && <li>No visits recorded yet.</li>}
          </ul>
        </div>
      </div>}

      <div className="analytics-range-tabs">
        {[
          { value: '', label: 'All time' },
          { value: '24h', label: '24 hours' },
          { value: '7d', label: '7 days' },
          { value: '15d', label: '15 days' },
          { value: '30d', label: '30 days' }
        ].map(option => (
          <button
            key={option.value || 'all'}
            type="button"
            className={`analytics-range-tab${rangeFilter === option.value ? ' is-active' : ''}`}
            onClick={() => setRangeFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="analytics-filters">
        <label>
          <span>Event type</span>
          <select value={typeFilter} onChange={event => setTypeFilter(event.target.value)}>
            <option value="">All events</option>
            <option value="pageview">Page views</option>
            <option value="click">Clicks</option>
          </select>
        </label>
        <label>
          <span>Route contains</span>
          <input value={routeFilter} onChange={event => setRouteFilter(event.target.value)} placeholder="/insights" />
        </label>
        <label>
          <span>IP address</span>
          <input value={ipFilter} onChange={event => setIpFilter(event.target.value)} placeholder="203.0.113.4" />
        </label>
        {(typeFilter || routeFilter || ipFilter || rangeFilter) && (
          <button type="button" className="button button-text" onClick={() => { setTypeFilter(''); setRouteFilter(''); setIpFilter(''); setRangeFilter(''); }}>Clear filters</button>
        )}
      </div>

      <div className="analytics-table-wrap">
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>IP address</th>
              <th>Event</th>
              <th>Route</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {(data?.events || []).map(event => (
              <tr key={event.id}>
                <td>{formatTime(event.created_at)}</td>
                <td><button type="button" className="button button-text" onClick={() => setIpFilter(event.ip)}>{event.ip}</button></td>
                <td><span className={`analytics-badge analytics-badge-${event.event_type}`}>{event.event_type}</span></td>
                <td><code>{event.route}</code></td>
                <td>{event.target || '—'}</td>
              </tr>
            ))}
            {!loading && data && !data.events.length && (
              <tr><td colSpan={5}>No events match these filters yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {data && data.total > data.pageSize && <div className="analytics-pagination">
        <button type="button" className="button button-secondary" disabled={page <= 1} onClick={() => changePage(page - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button type="button" className="button button-secondary" disabled={page >= totalPages} onClick={() => changePage(page + 1)}>Next</button>
      </div>}
    </div>
  </div>;
}
