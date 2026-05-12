import Link from 'next/link';
import RevalidateButton from './RevalidateButton';

// 不设置 revalidate，依靠手动触发
export const revalidate = false;

async function getData() {
  await new Promise((r) => setTimeout(r, 300));
  return {
    content: '按需更新的数据',
    generatedAt: new Date().toUTCString(),
  };
}

export default async function OnDemandIsrPage() {
  const data = await getData();

  return (
    <div>
      <h1>按需 ISR</h1>

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
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>页面生成时间</p>
        <code style={{ fontSize: '15px' }}>{data.generatedAt}</code>
      </div>

      {/* 触发按钮（Client Component） */}
      <RevalidateButton />

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
          <li>多次刷新 → 时间不变（没有超时，一直用缓存）</li>
          <li>点击「触发重新生成」按钮</li>
          <li>刷新页面 → 时间更新</li>
        </ol>
      </div>

      <Link
        href='/playground/3-5-isr'
        style={{ fontSize: '13px', marginTop: '12px', display: 'block' }}
      >
        ← 返回
      </Link>
    </div>
  );
}
