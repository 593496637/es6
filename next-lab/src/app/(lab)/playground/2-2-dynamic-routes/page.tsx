import Link from 'next/link';

const demos = [
  { slug: 'user-123', label: '用户主页 /user-123' },
  { slug: 'product-abc', label: '商品详情 /product-abc' },
  { slug: 'chat-xyz', label: 'AI 对话 /chat-xyz' },
  { slug: 'not-exist', label: '不存在的页面（触发 notFound）' },
];

export default function DynamicRoutesPage() {
  return (
    <div>
      <h1>2-2 动态路由 [slug]</h1>

      <section>
        <h2>点击查看动态页面</h2>
        <ul style={{ lineHeight: '2.5', listStyle: 'none', padding: 0 }}>
          {demos.map((d) => (
            <li key={d.slug}>
              <Link href={`/playground/2-2-dynamic-routes/${d.slug}`}>
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>语法对比</h2>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '1.8',
          }}
        >
          {`[slug]         → 匹配单段    /blog/hello
[...slug]      → 匹配多段    /blog/2024/01/hello
[[...slug]]    → 可选多段    / 或 /blog/hello`}
        </pre>
      </section>
    </div>
  );
}
