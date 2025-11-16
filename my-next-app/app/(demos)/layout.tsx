// app/(demos)/layout.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  // Demo 区域自己的标题模板
  title: {
    default: 'Demos',
    template: '%s | Demos | My Next Blog',
  },
  description: '各种 SSR / CSR / 数据获取等演示页面',
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-3xl px-4 py-8'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-black dark:text-white'>
              Demo 区域
            </h1>
            <p className='mt-1 text-xs text-zinc-500'>
              这里是 SSR / CSR / 其他实验页面的公共布局
            </p>
          </div>

          <Link
            href='/'
            className='text-xs text-blue-600 hover:underline dark:text-blue-400'
          >
            回到首页
          </Link>
        </header>

        {/* 具体 demo 页内容 */}
        {children}
      </div>
    </div>
  );
}
