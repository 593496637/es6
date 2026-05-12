import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');

  if (!path) {
    return NextResponse.json({ error: '缺少 path 参数' }, { status: 400 });
  }

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, path });
}
