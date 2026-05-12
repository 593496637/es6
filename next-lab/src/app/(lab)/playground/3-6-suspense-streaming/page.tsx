import { Suspense } from 'react';
import Link from 'next/link';
import SlowPosts from './components/SlowPosts';
import SlowUser from './components/SlowUser';
import { UserSkeleton, PostsSkeleton } from './components/Skeletons';

export default function SuspenseStreamingPage() {
  return (
    <div>
      <h1>3-6 Suspense & Streaming</h1>

      {/* 说明：这部分立刻渲染 */}
      <div
        style={{
          padding: '12px 16px',
          background: '#f0f7ff',
          border: '1px solid #cce0ff',
          borderRadius: '8px',
          fontSize: '13px',
          marginTop: '16px',
          marginBottom: '32px',
        }}
      >
        <p style={{ margin: '0 0 4px', fontWeight: 600 }}>✅ 这行立刻显示</p>
        <p style={{ margin: 0, color: '#888' }}>
          下方用户信息等 1.5s，文章列表等 2s，但它们不互相阻塞，也不阻塞这里
        </p>
      </div>

      {/* 用户信息：1.5s 后显示 */}
      <section style={{ marginBottom: '32px' }}>
        <h2>用户信息（1.5s）</h2>
        <Suspense fallback={<UserSkeleton />}>
          <SlowUser />
        </Suspense>
      </section>

      {/* 文章列表：2s 后显示 */}
      <section>
        <h2>文章列表（2s）</h2>
        <Suspense fallback={<PostsSkeleton />}>
          <SlowPosts />
        </Suspense>
      </section>

      {/* 说明：这部分也立刻渲染 */}
      <div
        style={{
          marginTop: '32px',
          padding: '12px 16px',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#888',
        }}
      >
        <p style={{ margin: '0 0 4px' }}>对比：不用 Suspense 的话</p>
        <p style={{ margin: 0 }}>
          整个页面会等 2s（最慢的那个），用户看到白屏，然后一次性全部显示
        </p>
      </div>

      <section style={{ marginTop: '32px' }}>
        <h2>更直观的对比演示</h2>
        <Link href='/playground/3-6-suspense-streaming/compare'>
          → 三个块分别在 500ms / 1500ms / 3000ms 到达
        </Link>
      </section>
    </div>
  );
}
