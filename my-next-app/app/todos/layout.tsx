// app/todos/layout.tsx
import type { ReactNode } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

export default function TodosLayout({ children }: LayoutProps) {
  return (
    <main className='min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-black'>
      {/* 顶部公共区域 */}
      <header className='w-full max-w-3xl px-4 py-4 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='text-xl font-semibold text-black dark:text-zinc-50'>
          Todos 区域
        </h1>
        <p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
          这里的页面都在 /todos 路由下。
        </p>

        <nav className='mt-3 flex gap-2 text-sm'>
          <Link
            href='/'
            className='text-blue-600 hover:underline dark:text-blue-400'
          >
            回到首页
          </Link>
          <span className='text-zinc-400'>·</span>
          <Link
            href='/todos/1'
            className='text-blue-600 hover:underline dark:text-blue-400'
          >
            Todo 1
          </Link>
          <Link
            href='/todos/2'
            className='text-blue-600 hover:underline dark:text-blue-400'
          >
            Todo 2
          </Link>
          <Link
            href='/todos/3'
            className='text-blue-600 hover:underline dark:text-blue-400'
          >
            Todo 3
          </Link>
        </nav>
      </header>

      {/* 下面是具体页面内容 */}
      <section className='w-full max-w-3xl px-4 py-8 flex-1 flex justify-center'>
        {children}
      </section>
    </main>
  );
}
