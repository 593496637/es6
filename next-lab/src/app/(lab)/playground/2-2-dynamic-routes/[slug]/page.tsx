import Link from 'next/link';
import { notFound } from 'next/navigation';

const demos: Record<string, { label: string; desc: string }> = {
  'user-123': { label: '用户主页', desc: '模拟 /user/[id] 场景' },
  'product-abc': { label: '商品详情', desc: '模拟 /product/[id] 场景' },
  'chat-xyz': { label: 'AI 对话', desc: '模拟 /chat/[id] 场景' },
};

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = demos[slug];

  if (!demo) notFound();

  return (
    <div>
      <Link href='/playground/2-2-dynamic-routes'>← 返回</Link>
      <h1 style={{ marginTop: '16px' }}>{demo.label}</h1>
      <p style={{ color: '#888' }}>{demo.desc}</p>
      <p>
        当前 slug：
        <code
          style={{
            background: '#f0f0f0',
            padding: '2px 6px',
            borderRadius: '4px',
          }}
        >
          {slug}
        </code>
      </p>
    </div>
  );
}
