import Link from 'next/link';

// 演示用的静态"文章"数据
const posts = [
  { slug: 'hello-nextjs', title: 'Hello Next.js' },
  { slug: 'app-router-guide', title: 'App Router 指南' },
  { slug: 'rsc-explained', title: 'RSC 详解' },
];

export default function StaticRoutesPage() {
  return (
    <div>
      <h1>2-1 静态路由 & 嵌套路由</h1>

      {/* 静态路由演示 */}
      <section>
        <h2>站内静态路由</h2>
        <ul style={{ lineHeight: '2.5' }}>
          <li>
            <Link href='/'>/ 首页</Link>
          </li>
          <li>
            <Link href='/playground'>/playground 练习导航</Link>
          </li>
          <li>
            <Link href='/blog'>/blog 博客列表</Link>
          </li>
        </ul>
      </section>

      {/* 嵌套路由演示 */}
      <section style={{ marginTop: '24px' }}>
        <h2>嵌套路由（博客文章）</h2>
        <p style={{ color: '#888', fontSize: '14px' }}>
          下面链接指向 /blog/[slug]，下节（动态路由）会实现，先看 URL 结构
        </p>
        <ul style={{ lineHeight: '2.5' }}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              <span
                style={{ color: '#aaa', marginLeft: '8px', fontSize: '13px' }}
              >
                → /blog/{post.slug}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 路由结构可视化 */}
      <section style={{ marginTop: '24px' }}>
        <h2>当前项目路由结构</h2>
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
├── page.tsx              → /
├── playground/
│   ├── page.tsx          → /playground
│   ├── 1-1-layout/       → /playground/1-1-layout
│   ├── 1-2-nested-layout/→ /playground/1-2-nested-layout
│   ├── 1-3-loading-error/→ /playground/1-3-loading-error
│   ├── 1-4-link-navigation/ → /playground/1-4-link-navigation
│   └── 2-1-static-routes/→ /playground/2-1-static-routes
└── blog/
    ├── page.tsx          → /blog
    └── [slug]/page.tsx   → /blog/:slug`}
        </pre>
      </section>
    </div>
  );
}
