import { getPosts } from '@/lib/mock-api';

export default async function SlowPosts() {
  // 模拟慢请求，等 2 秒
  const posts = await getPosts(2000);

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {posts.map((post) => (
        <li
          key={post.slug}
          style={{
            padding: '12px 0',
            borderBottom: '1px solid #eee',
            fontSize: '13px',
          }}
        >
          <p style={{ margin: '0 0 4px', fontWeight: 600 }}>{post.title}</p>
          <p style={{ margin: 0, color: '#888' }}>{post.summary}</p>
        </li>
      ))}
    </ul>
  );
}
