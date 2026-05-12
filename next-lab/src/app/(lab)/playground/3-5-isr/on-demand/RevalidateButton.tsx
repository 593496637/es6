'use client';

import { useState } from 'react';

export default function RevalidateButton() {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const handleRevalidate = async () => {
    setStatus('loading');

    // 第一步：调接口，标记缓存过期
    // await 保证接口返回后才继续执行
    await fetch('/api/revalidate?path=/playground/3-5-isr/on-demand');

    // 第二步：接口返回了，说明标记已完成，直接刷新
    // 刷新这次请求会触发 Next.js 后台重新生成页面
    window.location.reload();
  };

  return (
    <button
      onClick={handleRevalidate}
      disabled={status === 'loading'}
      style={{
        marginTop: '16px',
        padding: '8px 16px',
        background: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        fontSize: '13px',
      }}
    >
      {status === 'idle' ? '触发重新生成' : '生成中...'}
    </button>
  );
}
