import Link from 'next/link';

export default function CachePage() {
  return (
    <div>
      <h1>3-7 缓存机制</h1>

      <section style={{ marginTop: '24px' }}>
        <h2>四层缓存总览</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '12px',
          }}
        >
          {[
            {
              layer: '① Router Cache',
              where: '浏览器内存',
              what: '页面切换时的 RSC Payload',
              color: '#f0f7ff',
              border: '#cce0ff',
              tip: '前进/后退瞬间响应就是它的功劳',
            },
            {
              layer: '② Full Route Cache',
              where: '服务端磁盘',
              what: '静态页面的 HTML',
              color: '#f0fff4',
              border: '#b7ebc8',
              tip: 'next build 时生成，对应静态渲染',
            },
            {
              layer: '③ Data Cache',
              where: '服务端磁盘',
              what: 'fetch 请求的响应结果',
              color: '#fff7ed',
              border: '#ffd8a8',
              tip: '最常需要手动控制的一层',
            },
            {
              layer: '④ Request Memoization',
              where: '服务端内存',
              what: '单次请求内的重复 fetch',
              color: '#fdf4ff',
              border: '#e9d5ff',
              tip: '自动去重，不需要手动控制',
            },
          ].map((item) => (
            <div
              key={item.layer}
              style={{
                padding: '16px',
                background: item.color,
                border: `1px solid ${item.border}`,
                borderRadius: '8px',
                fontSize: '13px',
              }}
            >
              <p style={{ margin: '0 0 4px', fontWeight: 600 }}>{item.layer}</p>
              <p style={{ margin: '0 0 4px', color: '#888' }}>
                存在：{item.where} · 缓存内容：{item.what}
              </p>
              <p style={{ margin: 0, color: '#666' }}>💡 {item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>Data Cache 控制方式</h2>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '1.8',
          }}
        >
          {`// 永久缓存（默认）
fetch(url)
fetch(url, { cache: 'force-cache' })

// 不缓存，每次都请求
fetch(url, { cache: 'no-store' })

// 定时重新验证（秒）
fetch(url, { next: { revalidate: 60 } })

// 按 tag 管理，可以批量清除
fetch(url, { next: { tags: ['posts'] } })
revalidateTag('posts')  // 清除所有 posts tag 的缓存`}
        </pre>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>实际演示</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link href='/playground/3-7-cache/force-cache'>
            → force-cache：永久缓存，数据不会变
          </Link>
          <Link href='/playground/3-7-cache/no-store'>
            → no-store：不缓存，每次刷新数据都变
          </Link>
          <Link href='/playground/3-7-cache/revalidate'>
            → revalidate：10 秒后重新验证
          </Link>
        </div>
      </section>
    </div>
  );
}
