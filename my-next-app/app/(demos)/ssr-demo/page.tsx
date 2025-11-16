// app/ssr-demo/page.tsx
import { Metadata } from 'next';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const metadata: Metadata = {
  title: 'SSR Demo',
};

export default async function SSRDemoPage() {
  // 1. 在服务器上发请求获取数据
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    // 这个设置表示：不要缓存，每次请求都重新取（典型 SSR 行为）
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: Todo = await res.json();

  // 为了看得更明显，我们加一个时间戳
  const serverTime = new Date().toISOString();

  // 2. 返回 JSX，这一步也是在服务器上执行的
  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black'>
      <h1 className='text-2xl font-bold text-black dark:text-zinc-50'>
        SSR Demo 页面
      </h1>

      <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
        这个页面的数据是在服务器上请求，然后渲染成 HTML 再返回给浏览器。
      </p>

      <p className='mt-2 text-xs text-zinc-500'>服务器渲染时间：{serverTime}</p>

      <pre className='mt-6 max-w-xl overflow-x-auto rounded bg-zinc-900 p-4 text-left text-xs text-zinc-100'>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
