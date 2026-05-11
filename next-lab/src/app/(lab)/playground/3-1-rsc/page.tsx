// 这是一个 Server Component（没有 'use client'）
// 可以直接 async，直接在服务端拿数据

import { readFileSync } from 'fs';
import path from 'path';

// 模拟从服务端读取数据（在浏览器里做不到）
async function getServerInfo() {
  await new Promise((r) => setTimeout(r, 500));
  return {
    time: new Date().toISOString(),
    node: process.version,
    platform: process.platform,
  };
}

export default async function RscPage() {
  // 直接 await，不需要 useEffect
  const info = await getServerInfo();

  return (
    <div>
      <h1>3-1 RSC 是什么</h1>

      <section>
        <h2>这个组件在服务端运行</h2>
        <div
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '2',
          }}
        >
          <div>
            服务端时间：<code>{info.time}</code>
          </div>
          <div>
            Node 版本：<code>{info.node}</code>
          </div>
          <div>
            运行平台：<code>{info.platform}</code>
          </div>
        </div>
        <p style={{ color: '#888', fontSize: '13px', marginTop: '8px' }}>
          以上数据在服务端获取，客户端 JS 里看不到任何 fetch 请求
        </p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>RSC 做得到 vs 做不到</h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>能力</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>Server</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>Client</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                ability: 'async/await 直接获取数据',
                server: '✅',
                client: '❌',
              },
              {
                ability: '访问 process.env 服务端变量',
                server: '✅',
                client: '❌',
              },
              { ability: '读取文件系统 fs', server: '✅', client: '❌' },
              { ability: '直连数据库', server: '✅', client: '❌' },
              { ability: 'useState / useReducer', server: '❌', client: '✅' },
              { ability: 'useEffect / 生命周期', server: '❌', client: '✅' },
              { ability: '事件监听 onClick 等', server: '❌', client: '✅' },
              { ability: '访问 window / document', server: '❌', client: '✅' },
              {
                ability: '接收 props（包括非序列化数据）',
                server: '✅',
                client: '⚠️ 只能序列化数据',
              },
            ].map((row) => (
              <tr key={row.ability} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{row.ability}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {row.server}
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {row.client}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>RSC 的本质</h2>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '1.8',
          }}
        >
          {`// 传统 React（客户端）
useEffect(() => {
  fetch('/api/data')
    .then(r => r.json())
    .then(setData)
}, [])

// RSC（服务端）
const data = await fetch('https://api.example.com/data')
const json = await data.json()
// 直接用 json，不需要 state，不需要 useEffect`}
        </pre>
      </section>
    </div>
  );
}
