// app/layout.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'My Next Blog',
    template: '%s | My Next Blog', // ⬅️ 子页面可以提供自己的 %s
  },
  description: 'Learning Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='zh-CN'>
      <body className='bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50'>
        {/* 整站统一的外层容器 */}
        <div className='min-h-screen flex flex-col'>
          {/* 顶部导航栏 */}
          <header className='border-b border-zinc-200 bg-white/80 backdrop-blur dark:bg-zinc-950/80 dark:border-zinc-800'>
            <nav className='mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4'>
              <Link href='/' className='text-sm font-semibold'>
                My Next Blog
              </Link>

              <div className='flex items-center gap-4 text-sm'>
                <Link href='/' className='hover:underline'>
                  首页
                </Link>
                <Link href='/posts' className='hover:underline'>
                  文章
                </Link>
                <Link href='/todos' className='hover:underline'>
                  Todos
                </Link>
                <Link href='/ssr-demo' className='hover:underline'>
                  SSR Demo
                </Link>
                <Link href='/csr-demo' className='hover:underline'>
                  CSR Demo
                </Link>
              </div>
            </nav>
          </header>

          {/* 中间区域交给各个 page/layout 去渲染 */}
          <main className='flex-1'>{children}</main>

          {/* 统一 footer（可选） */}
          <footer className='border-t border-zinc-200 bg-white/80 py-4 text-center text-xs text-zinc-500 dark:bg-zinc-950 dark:border-zinc-800'>
            学习 Next.js · App Router Demo
          </footer>
        </div>
      </body>
    </html>
  );
}
