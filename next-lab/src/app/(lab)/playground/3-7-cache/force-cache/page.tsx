import Link from 'next/link';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'force-cache', // 永久缓存
  });
  return res.json();
}

export default async function ForceCachePage() {
  const data = await getData();

  return (
    <div>
      <h1>force-cache 演示</h1>
      <p style={{ color: '#888', fontSize: '13px' }}>
        无论刷新多少次，数据不会变（来自缓存）
      </p>
      <div
        style={{
          padding: '16px',
          background: '#f0f7ff',
          border: '1px solid #cce0ff',
          borderRadius: '8px',
          fontSize: '13px',
          lineHeight: '2',
          marginTop: '16px',
        }}
      >
        <div>
          ID：<code>{data.id}</code>
        </div>
        <div>
          标题：<code>{data.title}</code>
        </div>
      </div>
      <Link
        href='/playground/3-7-cache'
        style={{ fontSize: '13px', marginTop: '12px', display: 'block' }}
      >
        ← 返回
      </Link>
    </div>
  );
}
