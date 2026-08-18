import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/adminAuth';
import { listPosts, listPublishedPosts, savePost } from '@/lib/blogs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const admin = isAdminRequest(request) && request.nextUrl.searchParams.get('admin') === '1';
  const posts = admin ? await listPosts() : await listPublishedPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();
  try {
    const body = await request.json();
    const post = await savePost(body);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Could not save the blog.' }, { status: 400 });
  }
}
