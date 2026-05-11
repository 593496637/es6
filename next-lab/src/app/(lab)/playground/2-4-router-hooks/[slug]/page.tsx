'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DynamicHookPage() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div>
      <h1>useParams 演示</h1>

      <div style={{
        background: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '13px',
        lineHeight: '2',
      }}>
        <div>pathname：<code>{pathname}</code></div>
        <div>params：<code>{JSON.stringify(params)}</code></div>
        <div>slug：<code>{params.slug as string}</code></div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <Link href="/playground/2-4-router-hooks/foo">换成 /foo</Link>
        <Link href="/playground/2-4-router-hooks/bar">换成 /bar</Link>
        <button onClick={() => router.back()}>← 返回</button>
      </div>

      <p style={{ color: '#888', fontSize: '13px', marginTop: '16px' }}>
        点击链接切换 slug，上方 params 会实时更新
      </p>
    </div>
  )
}