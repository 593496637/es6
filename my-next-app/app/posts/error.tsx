// app/posts/error.tsx

'use client';

import { useEffect } from 'react';

type PostsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PostsError({ error, reset }: PostsErrorProps) {
  useEffect(() => {
    // 这里你可以打日志到监控，或者 console.error
    console.error('Posts 区域出错了：', error);
  }, [error]);

  return (
    <main className='min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-black'>
      <div className='w-full max-w-3xl px-4 py-8'>
        <h1 className='text-2xl font-bold text-red-600 dark:text-red-400'>
          /posts 区域出错了
        </h1>
        <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
          出错信息：{error.message}
        </p>
        <p className='mt-4 text-sm text-zinc-600 dark:text-zinc-400'>
          你可以尝试重新加载这个页面：
        </p>
        <button
          onClick={() => reset()}
          className='mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
        >
          再试一次
        </button>
      </div>
    </main>
  );
}
