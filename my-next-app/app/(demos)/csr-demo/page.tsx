'use client';

import { useEffect, useState } from 'react';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function CSRDemoPage() {
  const [data, setData] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientTime, setClientTime] = useState<string>('');

  useEffect(() => {
    // 这里只会在浏览器里执行
    setClientTime(new Date().toISOString());

    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((json: Todo) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      });
  }, []);

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black'>
      <h1 className='text-2xl font-bold text-black dark:text-zinc-50'>
        CSR Demo 页面
      </h1>

      <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
        这个页面的数据是在浏览器中用 useEffect 发请求获取的（客户端渲染）。
      </p>

      <p className='mt-2 text-xs text-zinc-500'>
        客户端请求发起时间：{clientTime || '（等待 useEffect 执行中…）'}
      </p>

      <div className='mt-6 max-w-xl'>
        {loading && (
          <p className='text-zinc-600 dark:text-zinc-300'>加载中...</p>
        )}

        {error && <p className='text-red-500'>请求出错：{error}</p>}

        {data && (
          <pre className='mt-4 overflow-x-auto rounded bg-zinc-900 p-4 text-left text-xs text-zinc-100'>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
