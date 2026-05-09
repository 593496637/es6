import Link from 'next/link';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
        <Link href='/playground'>← 练习导航</Link>
      </nav>
      <main style={{ padding: '24px' }}>{children}</main>
    </div>
  );
}
