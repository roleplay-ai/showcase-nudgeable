import { NextRequest, NextResponse } from 'next/server';
import { adminPasswordConfigured, isAdminRequest } from '@/lib/adminAuth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!adminPasswordConfigured()) {
    return NextResponse.json({ ok: false, configured: false }, { status: 503 });
  }
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, configured: true }, { status: 401 });
  }
  return NextResponse.json({ ok: true, configured: true });
}
