import Link from 'next/link';

// 服务端 fetch 必须用绝对路径
// 优先用自定义环境变量，其次使用 Vercel 提供的域名
function getBaseUrl() {
  if (process.env.APP_BASE_URL) return process.env.APP_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

async function getData() {
  const res = await fetch(`${getBaseUrl()}/api/time`, {
    next: { revalidate: 10 }, // 10 秒后重新验证
  });
  return res.json();
}

export default async function RevalidatePage() {
  const data = await getData();

  return (
    <div>
      <h1>revalidate 演示</h1>
      <p style={{ color: '#888', fontSize: '13px' }}>
        10 秒内刷新数据不变，超过 10 秒后台重新请求，再次刷新才能看到新数据
      </p>

      <div
        style={{
          padding: '16px',
          background: '#f0fff4',
          border: '1px solid #b7ebc8',
          borderRadius: '8px',
          fontSize: '13px',
          lineHeight: '2',
          marginTop: '16px',
        }}
      >
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>
          页面生成时间（来自服务端缓存）
        </p>
        <div>
          时间：<code>{data.time}</code>
        </div>
        <div>
          随机数：<code>{data.random}</code>
        </div>
      </div>

      <div
        style={{
          marginTop: '16px',
          padding: '16px',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#888',
          lineHeight: '1.8',
        }}
      >
        <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#666' }}>
          验证步骤（需要 next build && next start）
        </p>
        <ol style={{ margin: 0, paddingLeft: '20px' }}>
          <li>记录当前时间和随机数</li>
          <li>10 秒内刷新 → 数据不变（命中缓存）</li>
          <li>等待超过 10 秒后刷新 → 数据还不变（触发后台重新请求）</li>
          <li>再刷新一次 → 时间和随机数更新 ✅</li>
        </ol>
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
