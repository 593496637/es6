// app/todos/TodoClientActions.tsx
'use client';

import { useState } from 'react';

type Props = {
  initialCompleted: boolean;
};

export default function TodoClientActions({ initialCompleted }: Props) {
  const [completed, setCompleted] = useState(initialCompleted);

  return (
    <div className='mt-6 rounded border border-zinc-200 p-4 text-sm dark:border-zinc-700'>
      <p className='mb-2 text-zinc-700 dark:text-zinc-200'>
        这是一个 <span className='font-semibold'>客户端组件</span>， 用本地
        state 来模拟切换完成状态（不真正保存到服务器）。
      </p>

      <p className='mb-3'>
        当前本地状态：
        <span
          className={
            completed
              ? 'ml-1 font-semibold text-emerald-600 dark:text-emerald-400'
              : 'ml-1 font-semibold text-orange-600 dark:text-orange-400'
          }
        >
          {completed ? '已完成' : '未完成'}
        </span>
      </p>

      <button
        type='button'
        onClick={() => setCompleted((prev) => !prev)}
        className='rounded border border-zinc-400 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800'
      >
        切换本地完成状态
      </button>
    </div>
  );
}
