import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ maxWidth: '640px', margin: '80px auto', padding: '0 24px' }}>
      <h1>next-lab</h1>
      <p style={{ color: '#888' }}>Next.js 系统学习项目</p>
      <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
        <Link href='/blog'>→ 博客</Link>
        <Link href='/playground'>→ 练习场</Link>
      </div>
    </div>
  );
}
