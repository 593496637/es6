import Link from 'next/link';

export default function RouteGroupsPage() {
  return (
    <div>
      <h1>2-3 路由组 (group)</h1>

      <section>
        <h2>当前项目的路由组结构</h2>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '1.8',
          }}
        >
          {`src/app/
├── (main)/               ← 主站，简洁 header
│   ├── layout.tsx
│   └── blog/             → /blog（URL 无 (main)）
├── (lab)/                ← 练习场，带导航 header  
│   ├── layout.tsx
│   └── playground/       → /playground（URL 无 (lab)）
└── layout.tsx            ← 根 layout，全局共享`}
        </pre>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>验证：两个区域 layout 不同</h2>
        <ul style={{ lineHeight: '2.5', listStyle: 'none', padding: 0 }}>
          <li>
            <Link href='/blog'>→ /blog</Link>
            <span
              style={{ color: '#888', marginLeft: '12px', fontSize: '13px' }}
            >
              使用 (main)/layout.tsx — 居中内容区
            </span>
          </li>
          <li>
            <Link href='/playground'>→ /playground</Link>
            <span
              style={{ color: '#888', marginLeft: '12px', fontSize: '13px' }}
            >
              使用 (lab)/layout.tsx — 顶部导航栏
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
