'use client';

import { useState } from 'react';

export default function RouteHandlerDemo() {
  const [getResult, setGetResult] = useState('');
  const [postResult, setPostResult] = useState('');
  const [crudId, setCrudId] = useState('1');
  const [crudResult, setCrudResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGet() {
    setLoading(true);
    const res = await fetch('/playground/4-1-route-handlers/api?name=Next.js');
    setGetResult(JSON.stringify(await res.json(), null, 2));
    setLoading(false);
  }

  async function handlePost() {
    setLoading(true);
    const res = await fetch('/playground/4-1-route-handlers/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: 'Alice', action: 'test' }),
    });
    setPostResult(JSON.stringify(await res.json(), null, 2));
    setLoading(false);
  }

  async function callPostsApi(method: string, body?: object) {
    setLoading(true);
    const res = await fetch(`/api/posts/${crudId}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
    const text =
      res.status === 204
        ? '204 No Content'
        : JSON.stringify(await res.json(), null, 2);
    setCrudResult(`${method} ${res.status}\n${text}`);
    setLoading(false);
  }

  return (
    <div className='p-8 space-y-10'>
      <h1 className='text-2xl font-bold'>4-1 Route Handlers</h1>

      {/* 基础 GET / POST */}
      <section className='space-y-4'>
        <h2 className='text-lg font-semibold'>基础接口</h2>
        <div className='flex gap-3'>
          <button
            onClick={handleGet}
            disabled={loading}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
          >
            GET /api?name=Next.js
          </button>
          <button
            onClick={handlePost}
            disabled={loading}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50'
          >
            POST /api
          </button>
        </div>
        {getResult && (
          <pre className='p-4 bg-gray-100 rounded text-sm'>{getResult}</pre>
        )}
        {postResult && (
          <pre className='p-4 bg-gray-100 rounded text-sm'>{postResult}</pre>
        )}
      </section>

      {/* 动态路由 CRUD */}
      <section className='space-y-4'>
        <h2 className='text-lg font-semibold'>动态路由 /api/posts/[id]</h2>
        <div className='flex items-center gap-3'>
          <span className='text-sm text-gray-500'>id =</span>
          <input
            value={crudId}
            onChange={(e) => setCrudId(e.target.value)}
            className='w-16 border rounded px-2 py-1 text-sm'
          />
        </div>
        <div className='flex gap-3 flex-wrap'>
          <button
            onClick={() => callPostsApi('GET')}
            disabled={loading}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
          >
            GET
          </button>
          <button
            onClick={() => callPostsApi('PUT', { title: 'Updated Title' })}
            disabled={loading}
            className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50'
          >
            PUT (改 title)
          </button>
          <button
            onClick={() => callPostsApi('DELETE')}
            disabled={loading}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50'
          >
            DELETE
          </button>
        </div>
        {crudResult && (
          <pre className='p-4 bg-gray-100 rounded text-sm'>{crudResult}</pre>
        )}
      </section>
    </div>
  );
}
