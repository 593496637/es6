// src/app/(lab)/playground/3-3-server-fetch/page.tsx
import { getPosts, getUser, getStats } from '@/lib/mock-api';
import { Suspense } from 'react';

function SuspenseFallback({ text }: { text: string }) {
  return (
    <div
      style={{
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '8px',
        border: '1px solid #eee',
        fontSize: '13px',
        color: '#888',
      }}
    >
      {text}
    </div>
  );
}

// ---- 子组件各自取数据 ----

async function UserCard() {
  const user = await getUser();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      <span style={{ fontSize: '32px' }}>{user.avatar}</span>
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{user.name}</p>
        <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>{user.bio}</p>
      </div>
    </div>
  );
}

async function StatsBar() {
  const stats = await getStats();
  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '8px',
        fontSize: '13px',
      }}
    >
      {[
        { label: '文章', value: stats.posts },
        { label: '阅读', value: stats.views },
        { label: '点赞', value: stats.likes },
      ].map((item) => (
        <div key={item.label} style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '20px' }}>
            {item.value}
          </p>
          <p style={{ margin: 0, color: '#888' }}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

async function PostList() {
  const posts = await getPosts();
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {posts.map((post) => (
        <li
          key={post.slug}
          style={{
            padding: '12px 0',
            borderBottom: '1px solid #eee',
            fontSize: '13px',
          }}
        >
          <p style={{ margin: '0 0 4px', fontWeight: 600 }}>{post.title}</p>
          <p style={{ margin: 0, color: '#888' }}>
            {post.summary} · {post.date}
          </p>
        </li>
      ))}
    </ul>
  );
}

// ---- 并行请求演示 ----

async function ParallelDemo() {
  // 并行：同时发出两个请求
  // getUser 需要 600ms，getStats 需要 400ms
  // 顺序执行总耗时 ~1000ms，并行只需 ~600ms（取最慢的那个）
  const [user, stats] = await Promise.all([getUser(600), getStats(400)]);

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
      <p style={{ margin: '0 0 8px', fontWeight: 600 }}>
        ✅ Promise.all 并行请求
        <span
          style={{ color: '#888', marginLeft: '8px', fontWeight: 'normal' }}
        >
          耗时 ≈ max(600ms, 400ms) = 600ms，而非顺序的 1000ms
        </span>
      </p>
      <p style={{ margin: 0, color: '#888' }}>
        {user.name} · 文章 {stats.posts} 篇 · 阅读 {stats.views} 次
      </p>
    </div>
  );
}

// ---- 主页面 ----

export default async function ServerFetchPage() {
  return (
    <div>
      <h1>3-3 服务端数据获取</h1>

      {/* 核心对比 */}
      <section style={{ marginTop: '24px' }}>
        <h2>模式对比</h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>模式</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>写法</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>适用场景</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                mode: '顺序请求',
                code: 'await A; await B',
                scene: '后一个依赖前一个的结果',
              },
              {
                mode: '并行请求',
                code: 'Promise.all([A, B])',
                scene: '互不依赖，推荐默认用这个',
              },
              {
                mode: '组件级请求',
                code: '每个组件内 await',
                scene: '组件自治，配合 Suspense 流式加载',
              },
            ].map((row) => (
              <tr key={row.mode} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{row.mode}</td>
                <td style={{ padding: '8px' }}>
                  <code>{row.code}</code>
                </td>
                <td style={{ padding: '8px', color: '#888' }}>{row.scene}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 并行请求演示 */}
      <section style={{ marginTop: '32px' }}>
        <h2>并行请求演示</h2>
        <Suspense
          fallback={
            <SuspenseFallback text="并行请求中…（等待最慢的那个）" />
          }
        >
          <ParallelDemo />
        </Suspense>
      </section>

      {/* 组件级请求演示 */}
      <section style={{ marginTop: '32px' }}>
        <h2>组件级请求（各自取数据）</h2>
        <p style={{ color: '#888', fontSize: '13px' }}>
          UserCard、StatsBar、PostList 各自独立 fetch，互不干扰
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: '12px',
          }}
        >
          <Suspense
            fallback={
              <SuspenseFallback text="用户信息加载中…" />
            }
          >
            <UserCard />
          </Suspense>

          <Suspense
            fallback={
              <SuspenseFallback text="统计数据加载中…" />
            }
          >
            <StatsBar />
          </Suspense>

          <Suspense
            fallback={
              <SuspenseFallback text="列表加载中…" />
            }
          >
            <PostList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
