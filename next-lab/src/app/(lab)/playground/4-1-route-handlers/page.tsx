'use client';

import { useState } from 'react';

export default function RouteHandlerDemo() {
  const [getResult, setGetResult] = useState<string>('');
  const [postResult, setPostResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleGet() {
    setLoading(true);
    const res = await fetch('/playground/4-1-route-handlers/api?name=Next.js');
    const data = await res.json();
    setGetResult(JSON.stringify(data, null, 2));
    setLoading(false);
  }

  async function handlePost() {
    setLoading(true);
    const res = await fetch('/playground/4-1-route-handlers/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: 'Alice', action: 'test' }),
    });
    const data = await res.json();
    setPostResult(JSON.stringify(data, null, 2));
    setLoading(false);
  }

  return (
    <div className='p-8 space-y-6'>
      <h1 className='text-2xl font-bold'>4-1 Route Handlers</h1>

      <div className='space-y-4'>
        <div>
          <button
            onClick={handleGet}
            disabled={loading}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
          >
            GET /api?name=Next.js
          </button>
          {getResult && (
            <pre className='mt-2 p-4 bg-gray-100 rounded text-sm'>
              {getResult}
            </pre>
          )}
        </div>

        <div>
          <button
            onClick={handlePost}
            disabled={loading}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50'
          >
            POST /api (body: user + action)
          </button>
          {postResult && (
            <pre className='mt-2 p-4 bg-gray-100 rounded text-sm'>
              {postResult}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
