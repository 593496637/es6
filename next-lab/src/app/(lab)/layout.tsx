import Link from 'next/link';

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header
        style={{
          padding: '12px 24px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <Link href='/' style={{ fontWeight: 'bold' }}>
          next-lab
        </Link>
        <Link href='/playground' style={{ color: '#888', fontSize: '14px' }}>
          练习场
        </Link>
      </header>
      <main style={{ padding: '24px' }}>{children}</main>
    </div>
  );
}
