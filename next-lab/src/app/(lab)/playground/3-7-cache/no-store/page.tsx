import Link from 'next/link';

// 整个页面强制动态渲染
export const dynamic = 'force-dynamic';

async function getData() {
  // 随机获取一篇文章，每次请求都不一样
  const id = Math.floor(Math.random() * 100) + 1;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'no-store', // 不缓存
  });
  return res.json();
}

export default async function NoStorePage() {
  const data = await getData();

  return (
    <div>
      <h1>no-store 演示</h1>
      <p style={{ color: '#888', fontSize: '13px' }}>
        每次刷新都重新请求，ID 和数据会变化
      </p>
      <div
        style={{
          padding: '16px',
          background: '#fff7ed',
          border: '1px solid #ffd8a8',
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
