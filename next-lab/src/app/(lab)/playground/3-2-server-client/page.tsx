import ServerInfo from './ServerInfo';
import ClientCounter from './ClientCounter';
import ServerWithClientChild from './ServerWithClientChild';

// 这个页面本身是 Server Component
export default async function ServerClientPage() {
  return (
    <div>
      <h1>3-2 Server vs Client 边界</h1>

      {/* 边界规则说明 */}
      <section style={{ marginTop: '24px' }}>
        <h2>组件树边界</h2>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '1.8',
          }}
        >
          {`page.tsx (Server)
├── ServerInfo.tsx    (Server) ✅ 能用 headers()、fs、db
├── ClientCounter.tsx (Client) ✅ 能用 useState、onClick
│     └── 任何子组件             ⚠️  都是 Client，回不去了
└── ServerWithClientChild.tsx (Server)
      └── ClientCounter.tsx    (Client) ✅ Server 可以包含 Client`}
        </pre>
      </section>

      {/* 实际演示 */}
      <section style={{ marginTop: '32px' }}>
        <h2>Server Component 演示</h2>
        <ServerInfo />
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>Client Component 演示</h2>
        <ClientCounter />
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>Server 包含 Client（最常见模式）</h2>
        <ServerWithClientChild />
      </section>

      {/* 决策指南 */}
      <section style={{ marginTop: '32px' }}>
        <h2>怎么决定用哪个</h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>如果需要…</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>用</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                need: 'useState / useReducer',
                use: "Client — 加 'use client'",
              },
              { need: 'useEffect / 生命周期', use: "Client — 加 'use client'" },
              {
                need: 'onClick / onChange 等事件',
                use: "Client — 加 'use client'",
              },
              {
                need: 'window / document / localStorage',
                use: "Client — 加 'use client'",
              },
              {
                need: '直接 fetch 数据库 / 调接口',
                use: 'Server — 默认，直接 async/await',
              },
              { need: '读取 headers / cookies', use: 'Server — 默认' },
              { need: '访问 process.env 私密变量', use: 'Server — 默认' },
              {
                need: '纯展示 UI，无交互',
                use: 'Server — 默认，减少 bundle 体积',
              },
            ].map((row) => (
              <tr key={row.need} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{row.need}</td>
                <td
                  style={{
                    padding: '8px',
                    color: row.use.startsWith('Client') ? '#d97706' : '#0070f3',
                  }}
                >
                  {row.use}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
