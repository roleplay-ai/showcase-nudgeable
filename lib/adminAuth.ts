import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const ADMIN_COOKIE = 'nudgeable_admin';
const SESSION_MS = 1000 * 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || '';
}

export function adminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function passwordsMatch(submitted: string, expected: string) {
  const left = Buffer.from(submitted);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function createAdminSession() {
  const expires = String(Date.now() + SESSION_MS);
  const signature = createHmac('sha256', secret()).update(expires).digest('hex');
  return `${expires}.${signature}`;
}

export function isValidAdminSession(token?: string) {
  if (!token || !secret()) return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = createHmac('sha256', secret()).update(expires).digest('hex');
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function applyAdminCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MS / 1000
  });
  return response;
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });
  return response;
}

export function isAdminRequest(request: NextRequest) {
  return isValidAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
}

export async function isAdmin() {
  const jar = await cookies();
  return isValidAdminSession(jar.get(ADMIN_COOKIE)?.value);
}

export function unauthorized() {
  return NextResponse.json({ error: 'Admin sign-in required.' }, { status: 401 });
}
