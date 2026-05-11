import { cookies, headers } from 'next/headers';
import Link from 'next/link';

// 使用了 cookies()，自动触发动态渲染
export default async function DynamicDemoPage() {
  const cookieStore = await cookies();
  const headersList = await headers();

  const theme = cookieStore.get('theme')?.value ?? '未设置';
  const userAgent = headersList.get('user-agent')?.slice(0, 50) ?? '未知';

  // 动态渲染里可以安全读取请求时信息
  const requestTime = new Date().toUTCString();

  return (
    <div>
      <h1>动态渲染演示</h1>
      <div
        style={{
          padding: '16px',
          background: '#fff7ed',
          border: '1px solid #ffd8a8',
          borderRadius: '8px',
          fontSize: '13px',
          lineHeight: '2',
        }}
      >
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>
          ⚡ 每次请求实时生成
        </p>
        <div>
          请求时间：<code>{requestTime}</code>
        </div>
        <div>
          theme cookie：<code>{theme}</code>
        </div>
        <div>
          User-Agent：<code>{userAgent}...</code>
        </div>
      </div>
      <p style={{ color: '#888', fontSize: '13px', marginTop: '12px' }}>
        刷新页面，请求时间会实时更新。 使用了 <code>cookies()</code> 和{' '}
        <code>headers()</code>，自动触发动态渲染。
      </p>
      <Link href='/playground/3-4-static-dynamic' style={{ fontSize: '13px' }}>
        ← 返回
      </Link>
    </div>
  );
}
