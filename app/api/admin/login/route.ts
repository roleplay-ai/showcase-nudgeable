import { NextRequest, NextResponse } from 'next/server';
import { adminPasswordConfigured, applyAdminCookie, createAdminSession, passwordsMatch } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!adminPasswordConfigured()) {
    return NextResponse.json({ error: 'Set ADMIN_PASSWORD to enable the blog editor.' }, { status: 503 });
  }

  let password = '';
  try {
    const body = await request.json() as { password?: string };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ error: 'Invalid sign-in request.' }, { status: 400 });
  }

  if (!passwordsMatch(password, process.env.ADMIN_PASSWORD || '')) {
    return NextResponse.json({ error: 'That password is not correct.' }, { status: 401 });
  }

  return applyAdminCookie(NextResponse.json({ ok: true }), createAdminSession());
}
