// app/posts/[slug]/page.tsx
import type { Metadata } from 'next';
import type { Post } from '../data';
import { posts, getPostBySlug } from '../data';
import CommentsBox from '@/components/CommentsBox';

// 重新验证时间（秒）
export const revalidate = 10;

// ✅ 告诉 Next：构建时要为哪些 slug 生成静态页面
export async function generateStaticParams() {
  console.log('generateStaticParams 被调用了一次！');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type PageProps = {
  // ❗ Next 16 里 params 是 Promise，需要再 await 一次
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '文章不存在',
      description: `找不到 slug 为 ${slug} 的文章`,
    };
  }

  const createdAt = new Date(post.createdAt).toLocaleDateString('zh-CN');

  return {
    title: `${post.title}`,
    description: `发表于 ${createdAt} 的文章：${post.title}`,
    openGraph: {
      title: post.title,
      description: `发表于 ${createdAt} 的文章：${post.title}`,
      type: 'article',
    },
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const post: Post | undefined = getPostBySlug(slug);

  if (!post) {
    // 简单处理：找不到就显示一段文案（以后可以做 not-found.tsx）
    return (
      <main className='min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-black'>
        <div className='w-full max-w-3xl px-4 py-8'>
          <h1 className='text-2xl font-bold text-black dark:text-zinc-50'>
            文章不存在
          </h1>
          <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
            根据 slug 找不到对应的文章：{slug}
          </p>
        </div>
      </main>
    );
  }

  const serverTime = new Date().toISOString();
  const initialComments = [
    { id: 1, content: '这是第一条初始评论（假数据）' },
    { id: 2, content: '可以在这里练习评论功能～' },
  ];

  // ✅ 模拟一个严重错误（练习用）
  if (slug === 'nextjs-routing-basics') {
    throw new Error('这是一个故意抛出的错误，用来测试 PostsError');
  }

  return (
    <main className='min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-black'>
      <div className='w-full max-w-3xl px-4 py-8'>
        <p className='text-xs text-zinc-500'>服务器渲染时间：{serverTime}</p>

        <h1 className='mt-2 text-3xl font-bold text-black dark:text-zinc-50'>
          {post.title}
        </h1>

        <p className='mt-2 text-sm text-zinc-500'>
          发布于：{new Date(post.createdAt).toLocaleString()}
        </p>

        <article className='mt-6 whitespace-pre-wrap text-base leading-relaxed text-zinc-800 dark:text-zinc-100'>
          {post.content}
        </article>

        {/* 评论区 */}
        <div className='mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800'>
          <CommentsBox initialComments={initialComments} />
        </div>
      </div>
    </main>
  );
}
