// src/app/playground/layout.tsx
export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
        <a href='/playground'>← 练习导航</a>
      </nav>
      <main style={{ padding: '24px' }}>{children}</main>
    </div>
  );
}
