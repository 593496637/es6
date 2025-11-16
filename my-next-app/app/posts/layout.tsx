// app/posts/layout.tsx

import Link from 'next/link';

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-3xl px-4 py-8'>
        {/* 博客区域统一的头部 */}
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-black dark:text-white'>
              博客
            </h1>
            <p className='mt-1 text-xs text-zinc-500'>
              这里是文章列表和文章详情的公共布局
            </p>
          </div>

          {/* 返回列表的快捷入口 */}
          <Link
            href='/posts'
            className='text-xs text-blue-600 hover:underline dark:text-blue-400'
          >
            返回文章列表
          </Link>
        </div>

        {/* 把真正的页面内容插进来 */}
        {children}
      </div>
    </div>
  );
}
