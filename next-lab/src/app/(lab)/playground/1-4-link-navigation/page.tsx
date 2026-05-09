// src/app/playground/1-4-link-navigation/page.tsx
'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// ✅ 只把 useSearchParams 相关的部分单独抽出
function TabSection() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'home';

  return (
    <section style={{ marginTop: '24px' }}>
      <h2>2. 携带 Query 参数</h2>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link href='?tab=home'>Home</Link>
        <Link href='?tab=posts'>Posts</Link>
        <Link href='?tab=about'>About</Link>
      </div>
      <p style={{ marginTop: '8px', color: '#888' }}>
        当前 tab：<strong>{tab}</strong>
      </p>
    </section>
  );
}

// 其余 Hook 不受影响，直接在页面组件里用
export default function LinkNavigationPage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <h1>1-4 Link 导航</h1>

      {/* 立刻渲染，不需要等 */}
      <section>
        <h2>1. &lt;Link&gt; 基本用法</h2>
        <Link href='/playground/1-3-loading-error'>← 回到 1-3</Link>
        {' · '}
        <Link href='/playground'>回到导航页</Link>
      </section>

      {/* 只有这一块在等 useSearchParams */}
      <Suspense fallback={<p style={{ color: '#888' }}>读取参数中...</p>}>
        <TabSection />
      </Suspense>

      {/* 立刻渲染，不需要等 */}
      <section style={{ marginTop: '24px' }}>
        <h2>3. useRouter 编程式跳转</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => router.push('/playground')}>push 跳转</button>
          <button onClick={() => router.replace('/playground')}>
            replace 跳转
          </button>
          <button onClick={() => router.back()}>back 后退</button>
        </div>
      </section>

      {/* 立刻渲染，不需要等 */}
      <section style={{ marginTop: '24px' }}>
        <h2>4. usePathname 高亮菜单</h2>
        <NavMenu currentPath={pathname} />
      </section>
    </div>
  );
}

const navItems = [
  { href: '/playground/1-1-layout', label: '1-1 Layout' },
  { href: '/playground/1-2-nested-layout', label: '1-2 嵌套 Layout' },
  { href: '/playground/1-3-loading-error', label: '1-3 Loading & Error' },
  { href: '/playground/1-4-link-navigation', label: '1-4 Link 导航' },
];

function NavMenu({ currentPath }: { currentPath: string }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '12px' }}>
      {navItems.map((item) => {
        const isActive = currentPath === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              style={{
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? '#0070f3' : 'inherit',
                textDecoration: isActive ? 'underline' : 'none',
              }}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
