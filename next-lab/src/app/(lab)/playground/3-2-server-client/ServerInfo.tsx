// 没有 'use client'，默认 Server Component
import { headers } from 'next/headers';

export default async function ServerInfo() {
  // headers() 只能在服务端调用
  const headersList = await headers();
  console.log([...headersList.entries()]);
  const userAgent = headersList.get('user-agent') ?? '未知';

  return (
    <div
      style={{
        background: '#f0f7ff',
        border: '1px solid #cce0ff',
        borderRadius: '8px',
        padding: '16px',
        fontSize: '13px',
        lineHeight: '2',
      }}
    >
      <p style={{ margin: '0 0 8px', fontWeight: 600 }}>🖥 Server Component</p>
      <div>
        渲染时间：<code>{new Date().toISOString()}</code>
      </div>
      <div>
        User-Agent：
        <code style={{ wordBreak: 'break-all' }}>
          {userAgent.slice(0, 60)}...
        </code>
      </div>
      <div style={{ color: '#888', marginTop: '8px', fontSize: '12px' }}>
        以上内容在服务端生成，客户端 JS bundle 里没有这段逻辑
      </div>
    </div>
  );
}
