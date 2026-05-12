// src/app/(lab)/playground/page.tsx
import Link from 'next/link';

const chapters = [
  {
    section: '阶段一：跑起来',
    items: [
      {
        href: '/playground/1-1-layout',
        label: '1-1 项目结构与 Layout',
        done: true,
      },
      {
        href: '/playground/1-2-nested-layout',
        label: '1-2 嵌套 Layout',
        done: true,
      },
      {
        href: '/playground/1-3-loading-error',
        label: '1-3 Loading & Error',
        done: true,
      },
      {
        href: '/playground/1-4-link-navigation',
        label: '1-4 Link 导航',
        done: true,
      },
    ],
  },
  {
    section: '阶段二：路由系统',
    items: [
      {
        href: '/playground/2-1-static-routes',
        label: '2-1 静态路由 & 嵌套路由',
        done: true,
      },
      {
        href: '/playground/2-2-dynamic-routes',
        label: '2-2 动态路由 [slug]',
        done: true,
      },
      {
        href: '/playground/2-3-route-groups',
        label: '2-3 路由组 (group)',
        done: true,
      },
      {
        href: '/playground/2-4-router-hooks',
        label: '2-4 Router Hooks',
        done: true,
      },
    ],
  },
  {
    section: '阶段三：理解渲染',
    items: [
      { href: '/playground/3-1-rsc', label: '3-1 RSC 是什么', done: true },
      {
        href: '/playground/3-2-server-client',
        label: '3-2 Server vs Client 边界',
        done: true,
      },
      {
        href: '/playground/3-3-server-fetch',
        label: '3-3 服务端数据获取',
        done: true,
      },
      {
        href: '/playground/3-4-static-dynamic',
        label: '3-4 静态 vs 动态渲染',
        done: true,
      },
      {
        href: '/playground/3-5-isr',
        label: '3-5 ISR 增量静态再生成',
        done: true,
      },
      {
        href: '/playground/3-6-suspense-streaming',
        label: '3-6 Suspense & Streaming',
        done: true,
      },
      { href: '/playground/3-7-cache', label: '3-7 缓存机制', done: true },
    ],
  },
  {
    section: '阶段四：后端能力',
    items: [
      {
        href: '/playground/4-1-route-handlers',
        label: '4-1 Route Handlers',
        done: false,
      },
      {
        href: '/playground/4-2-server-actions',
        label: '4-2 Server Actions',
        done: false,
      },
      { href: '/playground/4-3-proxy', label: '4-3 Proxy 代理', done: false },
      {
        href: '/playground/4-4-middleware',
        label: '4-4 Middleware',
        done: false,
      },
    ],
  },
  {
    section: '阶段五：工程质量',
    items: [
      { href: '/playground/5-1-image', label: '5-1 next/image', done: false },
      { href: '/playground/5-2-font', label: '5-2 next/font', done: false },
      { href: '/playground/5-3-script', label: '5-3 next/script', done: false },
      {
        href: '/playground/5-4-shadcn',
        label: '5-4 Tailwind + shadcn/ui',
        done: false,
      },
      { href: '/playground/5-5-mdx', label: '5-5 MDX', done: false },
      { href: '/playground/5-6-seo', label: '5-6 Metadata & SEO', done: false },
      {
        href: '/playground/5-7-error-handling',
        label: '5-7 错误处理',
        done: false,
      },
    ],
  },
  {
    section: '阶段七：AI 集成',
    items: [
      {
        href: '/playground/7-1-ai-sdk-basic',
        label: '7-1 AI SDK 基础',
        done: false,
      },
      {
        href: '/playground/7-2-llm-proxy',
        label: '7-2 Route Handler 调用 LLM',
        done: false,
      },
      { href: '/playground/7-3-streaming', label: '7-3 流式输出', done: false },
      {
        href: '/playground/7-4-multi-turn',
        label: '7-4 多轮对话',
        done: false,
      },
      {
        href: '/playground/7-5-system-prompt',
        label: '7-5 System Prompt',
        done: false,
      },
      { href: '/playground/7-6-tool-use', label: '7-6 Tool Use', done: false },
      { href: '/playground/7-7-rag', label: '7-7 RAG 文档问答', done: false },
    ],
  },
];

export default function PlaygroundIndex() {
  const total = chapters.flatMap((c) => c.items).length;
  const done = chapters.flatMap((c) => c.items).filter((i) => i.done).length;

  return (
    <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 24px' }}>
      {/* 标题 + 进度 */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ margin: '0 0 8px' }}>Next.js 练习场</h1>
        <p style={{ color: '#888', fontSize: '13px', margin: '0 0 12px' }}>
          {done} / {total} 已完成
        </p>
        {/* 进度条 */}
        <div style={{ height: '4px', background: '#eee', borderRadius: '2px' }}>
          <div
            style={{
              height: '100%',
              width: `${(done / total) * 100}%`,
              background: '#0070f3',
              borderRadius: '2px',
              transition: 'width 0.3s',
            }}
          />
        </div>
      </div>

      {/* 章节列表 */}
      {chapters.map((chapter) => (
        <section key={chapter.section} style={{ marginBottom: '32px' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#aaa',
              margin: '0 0 8px',
            }}
          >
            {chapter.section}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {chapter.items.map((item) => (
              <li
                key={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                {/* 完成状态圆点 */}
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: item.done ? '#0070f3' : '#ddd',
                    flexShrink: 0,
                  }}
                />
                <Link
                  href={item.href}
                  style={{
                    fontSize: '14px',
                    color: item.done ? 'inherit' : '#888',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
