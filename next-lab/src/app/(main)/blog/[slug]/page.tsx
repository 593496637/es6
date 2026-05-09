// src/app/blog/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 模拟数据（阶段三接入真实数据源）
const posts: Record<string, { title: string; date: string; content: string }> =
  {
    'hello-nextjs': {
      title: 'Hello Next.js',
      date: '2024-01-01',
      content:
        'Next.js 是一个基于 React 的全栈框架，支持 SSR、SSG、ISR 等多种渲染模式。',
    },
    'app-router-guide': {
      title: 'App Router 指南',
      date: '2024-01-02',
      content:
        'App Router 是 Next.js 13+ 引入的新路由系统，基于 React Server Components。',
    },
    'rsc-explained': {
      title: 'RSC 详解',
      date: '2024-01-03',
      content:
        'React Server Components 让组件直接在服务端运行，减少客户端 JS 体积。',
    },
  };

// Next.js 15 中 params 是 Promise，需要 await
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  // slug 不存在时渲染 404
  if (!post) notFound();

  return (
    <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 24px' }}>
      <Link href='/blog' style={{ color: '#888', fontSize: '14px' }}>
        ← 返回博客列表
      </Link>
      <h1 style={{ marginTop: '16px' }}>{post.title}</h1>
      <p style={{ color: '#888', fontSize: '13px' }}>{post.date}</p>
      <hr style={{ margin: '24px 0' }} />
      <p>{post.content}</p>
    </div>
  );
}

// 告诉 Next.js 有哪些静态路径（SSG 用，动态渲染时可省略）
export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}
