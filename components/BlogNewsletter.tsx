'use client';

import { FormEvent, useState } from 'react';

export function BlogNewsletter({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get('email');
    setStatus('sending');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Signup failed');
      }
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return <section className={`blog-newsletter${compact ? ' compact' : ''}`}>
    <div className="blog-news-mark" aria-hidden="true">✦</div>
    <div className="blog-news-copy">
      <span className="eyebrow">THE NUDGEABLE NEWSLETTER</span>
      <h2>Practical ideas for AI, behavior and work.</h2>
      <p>One useful insight in your inbox. No daily noise.</p>
    </div>
    {status === 'sent'
      ? <div className="blog-subscribe-success">
        <strong>You’re on the list.</strong>
        <span>Watch your inbox for the next insight.</span>
      </div>
      : <form className="blog-subscribe" onSubmit={submit}>
        <input type="email" name="email" required placeholder="Enter your work email" aria-label="Work email" autoComplete="email" />
        <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'SENDING…' : 'SUBSCRIBE'}</button>
        <small className={status === 'error' ? 'error' : undefined}>{status === 'error' ? 'Could not subscribe. Email team@nudgeable.ai.' : 'Unsubscribe anytime.'}</small>
      </form>}
  </section>;
}
