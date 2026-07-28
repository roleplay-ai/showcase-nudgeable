import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const RECIPIENTS = ['team@nudgeable.ai', 'egauravpatel@gmail.com', 'work.nudgeable@gmail.com'] as const;

function textValue(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

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

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  const name = textValue(form, 'name');
  const email = textValue(form, 'email');
  const company = textValue(form, 'company');
  const interest = textValue(form, 'interest') || 'AI Training';
  const teamSize = textValue(form, 'teamSize') || 'Not provided';
  const message = textValue(form, 'message');

  if (!name || !email || !company) {
    return NextResponse.json({ error: 'Name, work email and company are required.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid work email is required.' }, { status: 400 });
  }

  const from = process.env.CONTACT_FROM_EMAIL || 'Nudgeable <team@nudgeable.app>';
  const subject = `Nudgeable enquiry: ${interest}`;
  const text = [
    `Name: ${name}`,
    `Work email: ${email}`,
    `Company: ${company}`,
    `Interest: ${interest}`,
    `Team size: ${teamSize}`,
    '',
    message || '(No message provided)'
  ].join('\n');

  const html = `
    <h2>New Nudgeable enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Work email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Interest:</strong> ${escapeHtml(interest)}</p>
    <p><strong>Team size:</strong> ${escapeHtml(teamSize)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message || '(No message provided)').replaceAll('\n', '<br />')}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [...RECIPIENTS],
      replyTo: email,
      subject,
      text,
      html
    });

    if (error) {
      console.error('Contact email failed:', error);
      return NextResponse.json({ error: 'Failed to send enquiry email.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return NextResponse.json({ error: 'Failed to send enquiry email.' }, { status: 502 });
  }
}
