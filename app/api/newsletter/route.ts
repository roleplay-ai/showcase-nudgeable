import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { brandedEmail, detailsTable, EMAIL_RECIPIENTS } from '@/lib/email';

export const runtime = 'nodejs';

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
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai').replace(/\/$/, '');

  try {
    const notify = await resend.emails.send({
      from,
      to: [...EMAIL_RECIPIENTS],
      replyTo: email,
      subject: `Newsletter signup: ${email}`,
      text: `A new subscriber joined the Nudgeable newsletter.\n\nEmail: ${email}`,
      html: brandedEmail({
        preview: `New newsletter signup from ${email}`,
        eyebrow: 'Newsletter',
        title: 'A new subscriber joined.',
        intro: 'Someone subscribed from the Insights blogs page.',
        bodyHtml: detailsTable([{ label: 'Email', value: email }]),
        cta: { label: 'Reply to subscriber', href: `mailto:${email}` }
      })
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
        `${site}/insights/blogs`
      ].join('\n'),
      html: brandedEmail({
        preview: 'Practical ideas about AI, behavior and work — one useful insight at a time.',
        eyebrow: 'You’re subscribed',
        title: 'You’re on the list.',
        intro: 'Thanks for joining the Nudgeable newsletter. You’ll get practical ideas about AI, behavior and work — one useful insight at a time, with no daily noise.',
        bodyHtml: `
          <p style="margin:0 0 22px;font-size:16px;line-height:1.6;color:#6e6870;">While you wait, the latest articles are on the Insights page.</p>
        `,
        cta: { label: 'Read the latest articles', href: `${site}/insights/blogs` }
      })
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
