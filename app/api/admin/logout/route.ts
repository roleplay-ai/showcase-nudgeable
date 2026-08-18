import { NextResponse } from 'next/server';
import { clearAdminCookie } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST() {
  return clearAdminCookie(NextResponse.json({ ok: true }));
}
