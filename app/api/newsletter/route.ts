import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const RECIPIENTS = ['team@nudgeable.ai', 'egauravpatel@gmail.com', 'work.nudgeable@gmail.com'] as const;

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });
  }

  let email = '';
  try {
    const body = await request.json() as { email?: string };
    email = typeof body.email === 'string' ? body.email.trim() : '';
  } catch {
    return NextResponse.json({ error: 'Invalid signup request.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid work email is required.' }, { status: 400 });
  }

  const from = process.env.CONTACT_FROM_EMAIL || 'Nudgeable <team@nudgeable.app>';
  const resend = new Resend(apiKey);
  const safeEmail = escapeHtml(email);

  try {
    const notify = await resend.emails.send({
      from,
      to: [...RECIPIENTS],
      replyTo: email,
      subject: `Newsletter signup: ${email}`,
      text: `A new subscriber joined the Nudgeable newsletter.\n\nEmail: ${email}`,
      html: `
        <h2>New newsletter signup</h2>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p>This person subscribed from the Insights blogs page.</p>
      `
    });

    if (notify.error) {
      console.error('Newsletter notify failed:', notify.error);
      return NextResponse.json({ error: 'Could not complete newsletter signup.' }, { status: 502 });
    }

    const confirm = await resend.emails.send({
      from,
      to: email,
      subject: 'You’re on the Nudgeable newsletter',
      text: [
        'Thanks for subscribing to the Nudgeable newsletter.',
        '',
        'You’ll get practical ideas about AI, behavior and work — one useful insight at a time, with no daily noise.',
        '',
        'Nudgeable',
        'https://www.nudgeable.ai/insights/blogs'
      ].join('\n'),
      html: `
        <h2>You’re on the list.</h2>
        <p>Thanks for subscribing to the Nudgeable newsletter.</p>
        <p>You’ll get practical ideas about AI, behavior and work — one useful insight at a time, with no daily noise.</p>
        <p><a href="https://www.nudgeable.ai/insights/blogs">Read the latest articles</a></p>
      `
    });

    if (confirm.error) {
      console.error('Newsletter confirmation failed:', confirm.error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Newsletter signup failed:', error);
    return NextResponse.json({ error: 'Could not complete newsletter signup.' }, { status: 502 });
  }
}
