'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type PostsSearchBoxProps = {
  initialQuery: string;
};

export default function PostsSearchBox({ initialQuery }: PostsSearchBoxProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 输入框本地状态
  const [value, setValue] = useState(initialQuery);

  // 防抖用的定时器引用
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function applySearch(nextValue: string) {
    const trimmed = nextValue.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmed) {
      params.set('q', trimmed);
    } else {
      params.delete('q');
    }

    const queryString = params.toString();
    const target = queryString ? `/posts?${queryString}` : '/posts';

    // 用 replace 避免打每个字都增加一条历史记录
    router.replace(target);
  }

  // 即时搜索：监听 value 变化，做防抖
  useEffect(() => {
    // 先清掉上一个定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 400ms 后自动触发一次搜索
    timerRef.current = setTimeout(() => {
      applySearch(value);
    }, 400);

    // 组件卸载时清理
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value]); // value 改变时重新设置定时器

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // 用户按回车或点按钮时，立即触发一次搜索（不等 400ms）
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    applySearch(value);
  }

  return (
    <form className='mt-4 flex gap-2' onSubmit={handleSubmit}>
      <input
        type='text'
        name='q'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='输入关键字搜索标题…'
        className='flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700'
      />
      <button
        type='submit'
        className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
      >
        搜索
      </button>
    </form>
  );
}
