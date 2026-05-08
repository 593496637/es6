// src/app/playground/page.tsx
export default function PlaygroundIndex() {
  const chapters = [
    { href: '/playground/1-1-layout', label: '1-1 项目结构与 Layout' },
    { href: '/playground/1-2-nested-layout', label: '1-2 嵌套 Layout' },
    { href: '/playground/1-3-loading-error', label: '1-3 Loading & Error' },
    { href: '/playground/1-4-link-navigation', label: '1-4 Link 导航' },
  ];

  return (
    <div>
      <h1>Next.js 练习场</h1>
      <ul style={{ lineHeight: '2.5' }}>
        {chapters.map((c) => (
          <li key={c.href}>
            <a href={c.href}>{c.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
