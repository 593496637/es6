import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // v15+ params 是 Promise
) {
  const { id } = await params

  return NextResponse.json({ id, title: `Post ${id}` })
}