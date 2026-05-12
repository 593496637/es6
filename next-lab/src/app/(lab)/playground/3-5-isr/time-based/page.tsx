import Link from 'next/link';

// 核心：告诉 Next.js 这个页面最多缓存 10 秒
export const revalidate = 10;

async function getData() {
  // 模拟外部 API 请求
  await new Promise((r) => setTimeout(r, 300));
  return {
    content: '来自外部 API 的数据',
    generatedAt: new Date().toUTCString(),
  };
}

export default async function TimeBasedIsrPage() {
  const data = await getData();

  return (
    <div>
      <h1>时间驱动 ISR</h1>

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
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>页面生成时间</p>
        <code style={{ fontSize: '15px' }}>{data.generatedAt}</code>
      </div>

      <div
        style={{
          marginTop: '16px',
          padding: '16px',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '13px',
          lineHeight: '1.8',
          color: '#888',
        }}
      >
        <p style={{ margin: '0 0 4px' }}>
          验证步骤（需要 next build && next start）：
        </p>
        <ol style={{ margin: 0, paddingLeft: '20px' }}>
          <li>记录当前页面显示的时间</li>
          <li>刷新页面 → 时间不变（返回缓存）</li>
          <li>等待 10 秒后再刷新 → 时间可能还不变（旧缓存）</li>
          <li>再刷新一次 → 时间更新（后台已重新生成）</li>
        </ol>
      </div>

      <p style={{ color: '#888', fontSize: '13px', marginTop: '12px' }}>
        当前配置：<code>export const revalidate = 10</code>
      </p>

      <Link href='/playground/3-5-isr' style={{ fontSize: '13px' }}>
        ← 返回
      </Link>
    </div>
  );
}
