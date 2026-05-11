'use client';

import { useState } from 'react';

export default function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        background: '#fff7ed',
        border: '1px solid #ffd8a8',
        borderRadius: '8px',
        padding: '16px',
        fontSize: '13px',
      }}
    >
      <p style={{ margin: '0 0 12px', fontWeight: 600 }}>⚡ Client Component</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => setCount((c) => c - 1)}
          style={{ width: '32px', height: '32px', cursor: 'pointer' }}
        >
          -
        </button>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            minWidth: '32px',
            textAlign: 'center',
          }}
        >
          {count}
        </span>
        <button
          onClick={() => setCount((c) => c + 1)}
          style={{ width: '32px', height: '32px', cursor: 'pointer' }}
        >
          +
        </button>
      </div>
      <div style={{ color: '#888', marginTop: '8px', fontSize: '12px' }}>
        useState 只能在 Client Component 里用
      </div>
    </div>
  );
}
