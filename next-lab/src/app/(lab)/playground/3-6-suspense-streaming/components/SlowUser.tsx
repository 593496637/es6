import { getUser } from '@/lib/mock-api';

export default async function SlowUser() {
  // 模拟慢请求，等 1.5 秒
  const user = await getUser(1500);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        background: '#f5f5f5',
        borderRadius: '8px',
        fontSize: '13px',
      }}
    >
      <span style={{ fontSize: '28px' }}>{user.avatar}</span>
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{user.name}</p>
        <p style={{ margin: 0, color: '#888' }}>{user.bio}</p>
      </div>
    </div>
  );
}
