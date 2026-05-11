// src/app/(lab)/playground/2-4-router-hooks/page.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

// ---- useSearchParams 单独抽出，最小范围 Suspense ----
function SearchParamsSection() {
  const searchParams = useSearchParams();

  const all = Array.from(searchParams.entries());

  return (
    <section style={{ marginTop: '24px' }}>
      <h2>3. useSearchParams — 读取查询参数</h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link href='?tab=home&lang=zh'>设置 tab=home&lang=zh</Link>
        <Link href='?tab=posts&lang=en'>设置 tab=posts&lang=en</Link>
        <Link href='?'>清空参数</Link>
      </div>
      <div
        style={{
          marginTop: '12px',
          background: '#f5f5f5',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '13px',
        }}
      >
        {all.length === 0 ? (
          <span style={{ color: '#aaa' }}>无查询参数</span>
        ) : (
          all.map(([k, v]) => (
            <div key={k}>
              <code>{k}</code> = <code>{v}</code>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

// ---- 主页面 ----
export default function RouterHooksPage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <h1>2-4 Router Hooks</h1>

      {/* 1. usePathname */}
      <section>
        <h2>1. usePathname — 读取当前路径</h2>
        <div
          style={{
            background: '#f5f5f5',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '13px',
          }}
        >
          当前路径：<code>{pathname}</code>
        </div>
        <p style={{ color: '#888', fontSize: '13px', marginTop: '8px' }}>
          切换页面时这里会变化，常用于高亮导航菜单
        </p>
      </section>

      {/* 2. useRouter */}
      <section style={{ marginTop: '24px' }}>
        <h2>2. useRouter — 编程式跳转</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/playground')}>
            push(`/playground`)
          </button>
          <button onClick={() => router.replace('/playground')}>
            replace(`/playground`)
          </button>
          <button onClick={() => router.back()}>back()</button>
          <button onClick={() => router.refresh()}>refresh()</button>
        </div>
        <table
          style={{
            marginTop: '12px',
            fontSize: '13px',
            borderCollapse: 'collapse',
            width: '100%',
          }}
        >
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>方法</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>历史记录</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>适用场景</th>
            </tr>
          </thead>
          <tbody>
            {[
              { method: 'push(url)', history: '追加', scene: '普通跳转' },
              {
                method: 'replace(url)',
                history: '替换当前',
                scene: '登录后跳转、防止回退',
              },
              { method: 'back()', history: '后退一步', scene: '返回按钮' },
              {
                method: 'refresh()',
                history: '不变',
                scene: '重新获取服务端数据',
              },
            ].map((row) => (
              <tr key={row.method} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>
                  <code>{row.method}</code>
                </td>
                <td style={{ padding: '8px' }}>{row.history}</td>
                <td style={{ padding: '8px' }}>{row.scene}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 3. useSearchParams（最小范围 Suspense）*/}
      <Suspense fallback={<p style={{ color: '#aaa' }}>读取参数中...</p>}>
        <SearchParamsSection />
      </Suspense>

      {/* 4. useParams */}
      <section style={{ marginTop: '24px' }}>
        <h2>4. useParams — 读取动态路由参数</h2>
        <p style={{ color: '#888', fontSize: '13px' }}>
          当前页面是静态路由，useParams 返回空对象。
          点击下方链接进入动态路由页面查看效果：
        </p>
        <Link href='/playground/2-4-router-hooks/demo-slug'>
          → /playground/2-4-router-hooks/demo-slug
        </Link>
      </section>
    </div>
  );
}
