import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name') ?? 'World';

  return NextResponse.json({
    message: `Hello, ${name}!`,
    time: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json(
    {
      received: body,
      status: 'ok',
    },
    { status: 201 },
  );
}
