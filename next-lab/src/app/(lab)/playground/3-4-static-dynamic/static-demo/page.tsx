import Link from 'next/link';

// 没有任何动态函数，Next.js 会在构建时静态生成
// 开发模式下每次都重新渲染，build 后才能看到静态效果

async function getStaticData() {
  // 模拟数据获取
  await new Promise((r) => setTimeout(r, 300));
  return {
    message: '这是构建时生成的内容',
    // 构建时的时间戳，部署后不会变化
    builtAt: new Date().toUTCString(),
  };
}

export default async function StaticDemoPage() {
  const data = await getStaticData();

  return (
    <div>
      <h1>静态渲染演示</h1>
      <div
        style={{
          padding: '16px',
          background: '#f0f7ff',
          border: '1px solid #cce0ff',
          borderRadius: '8px',
          fontSize: '13px',
          lineHeight: '2',
        }}
      >
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>🏗 构建时生成</p>
        <div>
          内容：<code>{data.message}</code>
        </div>
        <div>
          构建时间：<code>{data.builtAt}</code>
        </div>
      </div>
      <p style={{ color: '#888', fontSize: '13px', marginTop: '12px' }}>
        执行 <code>next build</code> 后部署，无论刷新多少次，时间戳都不会变。
        开发模式下每次请求都重新执行，需要 build 才能看到静态效果。
      </p>
      <Link href='/playground/3-4-static-dynamic' style={{ fontSize: '13px' }}>
        ← 返回
      </Link>
    </div>
  );
}
