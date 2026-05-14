import { NextRequest, NextResponse } from 'next/server'

// 模拟数据库
const posts: Record<string, { id: string; title: string; content: string }> = {
  '1': { id: '1', title: 'Hello Next.js', content: '...' },
  '2': { id: '2', title: 'Route Handlers', content: '...' },
}

type Params = { params: Promise<{ id: string }> }

// GET /api/posts/1
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const post = posts[id]

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}

// PUT /api/posts/1
export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params
  const body = await req.json()

  if (!posts[id]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  posts[id] = { ...posts[id], ...body }
  return NextResponse.json(posts[id])
}

// DELETE /api/posts/1
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params

  if (!posts[id]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  delete posts[id]
  return new Response(null, { status: 204 })
}