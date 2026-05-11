// Server Component 包含 Client Component 子组件
import ClientCounter from './ClientCounter';

export default async function ServerWithClientChild() {
  // 服务端获取数据
  await new Promise((r) => setTimeout(r, 300));
  const serverData = { message: '这段文字来自服务端' };

  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#888' }}>
        Server Component 可以直接渲染 Client Component 作为子组件：
      </p>
      {/* 服务端渲染的静态内容 */}
      <p style={{ fontSize: '13px', marginBottom: '12px' }}>
        📦 服务端数据：<code>{serverData.message}</code>
      </p>
      {/* 客户端交互组件 */}
      <ClientCounter />
    </div>
  );
}
