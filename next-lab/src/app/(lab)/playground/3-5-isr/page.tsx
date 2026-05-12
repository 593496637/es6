import Link from 'next/link';

export default function IsrPage() {
  return (
    <div>
      <h1>3-5 ISR 增量静态再生成</h1>

      <section style={{ marginTop: '24px' }}>
        <h2>三种渲染模式对比</h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>模式</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>数据新鲜度</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>响应速度</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>适用场景</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                mode: '静态渲染',
                fresh: '构建时',
                speed: '极快',
                scene: '文档、落地页',
              },
              {
                mode: 'ISR',
                fresh: '定时/按需',
                speed: '快',
                scene: '博客、商品页',
              },
              {
                mode: '动态渲染',
                fresh: '实时',
                speed: '较慢',
                scene: '个人数据、实时行情',
              },
            ].map((row) => (
              <tr key={row.mode} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{row.mode}</td>
                <td style={{ padding: '8px' }}>{row.fresh}</td>
                <td style={{ padding: '8px' }}>{row.speed}</td>
                <td style={{ padding: '8px', color: '#888' }}>{row.scene}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>实际演示</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link href='/playground/3-5-isr/time-based'>
            → 时间驱动 ISR（每 10 秒重新生成）
          </Link>
          <Link href='/playground/3-5-isr/on-demand'>
            → 按需 ISR（手动触发重新生成）
          </Link>
        </div>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>revalidate 配置</h2>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '1.8',
          }}
        >
          {`// 页面级：整个页面 10 秒后可重新生成
export const revalidate = 10

// fetch 级：单个请求 10 秒后重新验证
fetch(url, { next: { revalidate: 10 } })

// 永不重新生成（等同于纯静态）
export const revalidate = false

// 每次请求都重新生成（等同于动态渲染）
export const revalidate = 0`}
        </pre>
      </section>
    </div>
  );
}
