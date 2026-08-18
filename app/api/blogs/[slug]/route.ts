import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/adminAuth';
import { deletePost, getPost, getPublishedPost, savePost } from '@/lib/blogs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const post = isAdminRequest(request) ? await getPost(slug) : await getPublishedPost(slug);
  if (!post) return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!isAdminRequest(request)) return unauthorized();
  const { slug } = await params;
  try {
    const body = await request.json();
    const post = await savePost(body, slug);
    return NextResponse.json({ post });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not update the blog.';
    return NextResponse.json({ error: message }, { status: message.includes('not found') ? 404 : 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (!isAdminRequest(request)) return unauthorized();
  const { slug } = await params;
  try {
    await deletePost(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not delete the blog.';
    return NextResponse.json({ error: message }, { status: message.includes('not found') ? 404 : 400 });
  }
}
