import { Suspense } from 'react';
import { getPosts, getUser, getStats } from '@/lib/mock-api';

// 三个速度不同的组件，让分块到达的时间差更明显
async function Block1() {
  await getUser(500);
  return (
    <div
      style={{
        padding: '16px',
        background: '#f0fff4',
        border: '1px solid #b7ebc8',
        borderRadius: '8px',
        fontSize: '13px',
      }}
    >
      ✅ 块一：500ms 后到达
    </div>
  );
}

async function Block2() {
  await getStats(1500);
  return (
    <div
      style={{
        padding: '16px',
        background: '#fff7ed',
        border: '1px solid #ffd8a8',
        borderRadius: '8px',
        fontSize: '13px',
      }}
    >
      ✅ 块二：1500ms 后到达
    </div>
  );
}

async function Block3() {
  await getPosts(3000);
  return (
    <div
      style={{
        padding: '16px',
        background: '#fdf4ff',
        border: '1px solid #e9d5ff',
        borderRadius: '8px',
        fontSize: '13px',
      }}
    >
      ✅ 块三：3000ms 后到达
    </div>
  );
}

function BlockSkeleton({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#aaa',
      }}
    >
      ⏳ {label} 加载中...
    </div>
  );
}

export default function ComparePage() {
  return (
    <div>
      <h1>Streaming 分块演示</h1>
      <p style={{ color: '#888', fontSize: '13px', marginTop: '8px' }}>
        三个块独立加载，互不阻塞，按各自速度依次到达
      </p>

      {/* 立刻显示 */}
      <div
        style={{
          padding: '16px',
          background: '#f0f7ff',
          border: '1px solid #cce0ff',
          borderRadius: '8px',
          fontSize: '13px',
          margin: '16px 0',
        }}
      >
        ✅ 页面骨架：0ms 立刻显示（HTML 第一块）
      </div>

      {/* 三个独立 Suspense 块 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Suspense fallback={<BlockSkeleton label='块一（500ms）' />}>
          <Block1 />
        </Suspense>

        <Suspense fallback={<BlockSkeleton label='块二（1500ms）' />}>
          <Block2 />
        </Suspense>

        <Suspense fallback={<BlockSkeleton label='块三（3000ms）' />}>
          <Block3 />
        </Suspense>
      </div>

      {/* 对比说明 */}
      <div
        style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '13px',
          lineHeight: '1.8',
        }}
      >
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>
          如果不用 Streaming：
        </p>
        <p style={{ margin: 0, color: '#888' }}>
          整个页面等 3000ms 白屏，然后三块同时出现
        </p>
        <p style={{ margin: '8px 0 0', fontWeight: 600 }}>用了 Streaming：</p>
        <p style={{ margin: 0, color: '#888' }}>
          0ms 看到骨架 → 500ms 块一出现 → 1500ms 块二出现 → 3000ms 块三出现
        </p>
      </div>
    </div>
  );
}
