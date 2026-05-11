// src/app/(lab)/playground/3-4-static-dynamic/page.tsx
import Link from 'next/link';

export default async function StaticDynamicPage() {
  return (
    <div>
      <h1>3-4 静态 vs 动态渲染</h1>

      <section style={{ marginTop: '24px' }}>
        <h2>渲染时机对比</h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>特性</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>静态渲染</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>动态渲染</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                feature: '执行时机',
                static: 'next build 时',
                dynamic: '每次 HTTP 请求',
              },
              {
                feature: '能读取 cookies/headers',
                static: '❌',
                dynamic: '✅',
              },
              {
                feature: '能展示实时数据',
                static: '❌（除非 ISR）',
                dynamic: '✅',
              },
              {
                feature: '响应速度',
                static: '极快（CDN）',
                dynamic: '较慢（实时计算）',
              },
              {
                feature: '服务器压力',
                static: '无',
                dynamic: '每次请求都要计算',
              },
            ].map((row) => (
              <tr key={row.feature} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{row.feature}</td>
                <td style={{ padding: '8px', color: '#0070f3' }}>
                  {row.static}
                </td>
                <td style={{ padding: '8px', color: '#d97706' }}>
                  {row.dynamic}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>dynamic 配置项</h2>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '1.8',
          }}
        >
          {`// 触发动态渲染
export const dynamic = 'force-dynamic'   // 每次请求重新执行

// 强制静态渲染
export const dynamic = 'force-static'    // 动态函数返回空值，不报错
export const dynamic = 'error'           // 动态函数直接报错，更严格

// 默认
export const dynamic = 'auto'            // Next.js 自动判断`}
        </pre>

        <h2 style={{ marginTop: '24px' }}>自动触发动态渲染的条件</h2>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '1.8',
          }}
        >
          {`// 条件一：使用动态函数
const cookieStore = await cookies()
const headersList = await headers()

// 条件二：动态路由且没有 generateStaticParams

// 条件三：fetch 关闭缓存
fetch(url, { cache: 'no-store' })`}
        </pre>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>实际演示</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link href='/playground/3-4-static-dynamic/static-demo'>
            → 静态渲染演示（build 后刷新，时间不变）
          </Link>
          <Link href='/playground/3-4-static-dynamic/dynamic-demo'>
            → 动态渲染演示（刷新页面，时间更新）
          </Link>
        </div>
      </section>
    </div>
  );
}
