'use client';

import { FormEvent, useState } from 'react';

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Submission failed');
      }
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return <form className={`contact-form ${compact ? 'compact' : ''}`} onSubmit={submit} aria-label="Contact Nudgeable">
    <div className="form-grid">
      <label><span>Name</span><input name="name" autoComplete="name" required placeholder="Your name" /></label>
      <label><span>Work email</span><input type="email" name="email" autoComplete="email" required placeholder="you@company.com" /></label>
      <label><span>Company</span><input name="company" autoComplete="organization" required placeholder="Company name" /></label>
      <label><span>Area of interest</span><select name="interest" required defaultValue="Corporate AI Training"><option>Corporate AI Training</option><option>Enterprise Practice Lab</option><option>AI Coach</option><option>Actions Engine</option><option>Other</option></select></label>
      <label><span>Team size</span><select name="teamSize" required defaultValue=""><option value="" disabled>Select range</option><option>Under 25</option><option>25-100</option><option>101-500</option><option>500+</option></select></label>
      <label className={compact ? '' : 'full'}><span>What would you like to achieve?</span><textarea name="message" rows={compact ? 3 : 5} placeholder="Share the audience, tools available and expected outcome." /></label>
    </div>
    <button className="button button-primary submit-button" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send enquiry'}</button>
    <div className="form-status" aria-live="polite" aria-atomic="true">
      {status === 'sent' && <p className="form-message success">Thanks — your enquiry has been sent.</p>}
      {status === 'error' && <p className="form-message error">The form could not be submitted. Email team@nudgeable.ai.</p>}
    </div>
  </form>;
}
