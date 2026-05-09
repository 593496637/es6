import Link from 'next/link';

const chapters = [
  {
    section: '阶段一：跑起来',
    items: [
      { href: '/playground/1-1-layout', label: '1-1 项目结构与 Layout' },
      { href: '/playground/1-2-nested-layout', label: '1-2 嵌套 Layout' },
      { href: '/playground/1-3-loading-error', label: '1-3 Loading & Error' },
      { href: '/playground/1-4-link-navigation', label: '1-4 Link 导航' },
    ],
  },
  {
    section: '阶段二：路由系统',
    items: [
      {
        href: '/playground/2-1-static-routes',
        label: '2-1 静态路由 & 嵌套路由',
      },
      { href: '/playground/2-2-dynamic-routes', label: '2-2 动态路由 [slug]' },
      { href: '/playground/2-3-route-groups', label: '2-3 路由组 (group)' },
      { href: '/playground/2-4-router-hooks', label: '2-4 Router Hooks' },
    ],
  },
];

export default function PlaygroundIndex() {
  return (
    <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 24px' }}>
      <h1>Next.js 练习场</h1>
      {chapters.map((chapter) => (
        <section key={chapter.section} style={{ marginTop: '32px' }}>
          <h2
            style={{
              fontSize: '14px',
              color: '#888',
              textTransform: 'uppercase',
            }}
          >
            {chapter.section}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.5' }}>
            {chapter.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
