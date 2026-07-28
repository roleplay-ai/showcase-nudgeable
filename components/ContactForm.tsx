'use client';

import { FormEvent, useState } from 'react';

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    setStatus('sending');

    if (endpoint) {
      try {
        const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        setStatus('sent');
      } catch {
        setStatus('error');
      }
      return;
    }

    const subject = encodeURIComponent(`Nudgeable enquiry: ${String(data.get('interest') || 'AI Training')}`);
    const body = encodeURIComponent([
      `Name: ${data.get('name')}`,
      `Work email: ${data.get('email')}`,
      `Company: ${data.get('company')}`,
      `Interest: ${data.get('interest')}`,
      `Team size: ${data.get('teamSize') || 'Not provided'}`,
      '',
      String(data.get('message') || '')
    ].join('\n'));
    window.location.href = `mailto:team@nudgeable.ai?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return <form className={`contact-form ${compact ? 'compact' : ''}`} onSubmit={submit} aria-label="Contact Nudgeable">
    <div className="form-grid">
      <label><span>Name</span><input name="name" autoComplete="name" required placeholder="Your name" /></label>
      <label><span>Work email</span><input type="email" name="email" autoComplete="email" required placeholder="you@company.com" /></label>
      <label><span>Company</span><input name="company" autoComplete="organization" required placeholder="Company name" /></label>
      <label><span>Area of interest</span><select name="interest" required defaultValue="Corporate AI Training"><option>Corporate AI Training</option><option>Enterprise Practice Lab</option><option>AI Coach</option><option>Actions Engine</option><option>Other</option></select></label>
      {!compact && <label><span>Team size</span><select name="teamSize" defaultValue=""><option value="" disabled>Select range</option><option>Under 25</option><option>25-100</option><option>101-500</option><option>500+</option></select></label>}
      <label className={compact ? '' : 'full'}><span>What would you like to achieve?</span><textarea name="message" rows={compact ? 3 : 5} placeholder="Share the audience, tools available and expected outcome." /></label>
    </div>
    <button className="button button-primary submit-button" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send enquiry'}</button>
    <div className="form-status" aria-live="polite" aria-atomic="true">
      {status === 'sent' && <p className="form-message success">Your email client has been opened, or the enquiry was submitted.</p>}
      {status === 'error' && <p className="form-message error">The form could not be submitted. Email team@nudgeable.ai.</p>}
    </div>
  </form>;
}
