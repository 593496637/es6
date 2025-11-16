// app/posts/page.tsx

import Link from 'next/link';
import { posts } from './data';
import { filterPostsByQuery } from './filterPosts';
import PostsSearchBox from '@/components/PostsSearchBox';

type PageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

async function fetchPostsSlowly() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return posts;
}

export default async function PostsListPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? '';

  // 这里我们不用 fetch，直接用本地假数据
  // 如果你想模拟 SSR，可以在这里加个 serverTime
  const serverTime = new Date().toISOString();

  // ⬇️ 这里真正 await 了一个异步
  const allPosts = await fetchPostsSlowly();

  // 根据 query 过滤 posts（这里先只按标题匹配）
  const filteredPosts = filterPostsByQuery(allPosts, query);

  return (
    <main className='min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-black'>
      <div className='w-full max-w-3xl px-4 py-8'>
        <h1 className='text-2xl font-bold text-black dark:text-zinc-50'>
          博客文章列表
        </h1>

        <p className='mt-1 text-xs text-zinc-500'>
          服务器渲染时间：{serverTime}
        </p>

        {/* ✅ 用客户端组件做搜索框 */}
        <PostsSearchBox initialQuery={query} />

        {/* 搜索表单 */}
        <form className='mt-4 flex gap-2' method='GET'>
          <input
            type='text'
            name='q'
            defaultValue={query}
            placeholder='输入关键字搜索标题…'
            className='flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm
                     outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700'
          />
          <button
            type='submit'
            className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white
                     hover:bg-blue-700'
          >
            搜索
          </button>
        </form>

        {/* 如果有 query，提示当前筛选条件 */}
        {query && (
          <p className='mt-2 text-xs text-zinc-500'>
            当前搜索关键字：<span className='font-mono'>{query}</span>
          </p>
        )}

        {/* 列表 */}
        <div className='mt-6 space-y-4'>
          {filteredPosts.length === 0 ? (
            <p className='text-sm text-zinc-500'>
              没有找到匹配的文章，可以换个关键词试试～
            </p>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.slug}
                className='rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:bg-zinc-900 dark:border-zinc-800'
              >
                <h2 className='text-xl font-semibold text-black dark:text-white'>
                  <Link
                    href={`/posts/${post.slug}`}
                    className='hover:underline'
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className='mt-1 text-xs text-zinc-500'>
                  发布于：{new Date(post.createdAt).toLocaleString()}
                </p>
                {/* 如果有 summary 字段，可以渲染摘要 */}
                <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
                  {post.summary}
                </p>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
