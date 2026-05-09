import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 24px' }}>
      <h1>文章不存在</h1>
      <p style={{ color: '#888' }}>你访问的文章已被删除或地址有误。</p>
      <Link href='/blog'>← 返回博客列表</Link>
    </div>
  );
}
