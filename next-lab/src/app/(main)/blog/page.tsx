import Link from 'next/link';

const posts = [
  { slug: 'hello-nextjs', title: 'Hello Next.js', date: '2024-01-01' },
  { slug: 'app-router-guide', title: 'App Router 指南', date: '2024-01-02' },
  { slug: 'rsc-explained', title: 'RSC 详解', date: '2024-01-03' },
];

export default function BlogPage() {
  return (
    <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 24px' }}>
      <h1>博客</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.slug}
            style={{ borderBottom: '1px solid #eee', padding: '16px 0' }}
          >
            <Link href={`/blog/${post.slug}`} style={{ fontSize: '18px' }}>
              {post.title}
            </Link>
            <p style={{ color: '#888', fontSize: '13px', margin: '4px 0 0' }}>
              {post.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
