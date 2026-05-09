import Link from 'next/link';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '40px 24px' }}>
      <header
        style={{
          marginBottom: '40px',
          borderBottom: '1px solid #eee',
          paddingBottom: '16px',
        }}
      >
        <Link href='/' style={{ fontWeight: 'bold', fontSize: '18px' }}>
          next-lab
        </Link>
        <nav
          style={{ display: 'inline-flex', gap: '24px', marginLeft: '32px' }}
        >
          <Link href='/blog'>博客</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
