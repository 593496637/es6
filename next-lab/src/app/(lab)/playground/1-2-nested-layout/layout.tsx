import Link from 'next/link';

export default function NestedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <aside
        style={{
          width: '160px',
          borderRight: '1px solid #eee',
          paddingRight: '24px',
        }}
      >
        <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>章节目录</p>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
          <li>
            <Link href='/playground/1-2-nested-layout'>介绍</Link>
          </li>
          <li>
            <Link href='/playground/1-2-nested-layout/about'>关于</Link>
          </li>
        </ul>
      </aside>
      <section style={{ flex: 1 }}>{children}</section>
    </div>
  );
}
