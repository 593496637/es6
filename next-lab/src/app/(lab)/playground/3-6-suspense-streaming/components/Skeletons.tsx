// 通用骨架块
function SkeletonBlock({
  width = '100%',
  height = '16px',
}: {
  width?: string;
  height?: string;
}) {
  return (
    <div
      style={{
        width,
        height,
        background:
          'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        borderRadius: '4px',
        marginBottom: '8px',
      }}
    />
  );
}

export function UserSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        background: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: '#e0e0e0',
        }}
      />
      <div style={{ flex: 1 }}>
        <SkeletonBlock width='120px' height='14px' />
        <SkeletonBlock width='200px' height='12px' />
      </div>
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {[1, 2, 3].map((i) => (
        <li
          key={i}
          style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}
        >
          <SkeletonBlock width='60%' height='14px' />
          <SkeletonBlock width='80%' height='12px' />
        </li>
      ))}
    </ul>
  );
}
