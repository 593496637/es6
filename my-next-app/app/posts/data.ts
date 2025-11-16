// app/posts/data.ts

export type Post = {
  id: number;
  slug: string; // 用在 URL 里的字符串，比如 "learn-nextjs-ssr"
  title: string;
  summary: string; // 列表页里显示的简介
  content: string; // 详情页里的正文
  createdAt: string; // ISO 时间字符串，简单用 string 就行
};

export const posts: Post[] = [
  {
    id: 1,
    slug: 'learn-nextjs-ssr',
    title: '从 0 学会 Next.js SSR 思维',
    summary: '对比 CSR/SSR/SSG，理解 Next.js 为什么要搞一堆渲染模式。',
    content: `这里是第一篇文章的正文内容。
你可以在这里写多行文字，假装是一个真正的技术文章。

我们已经学过：
- 什么是 Server Component
- 什么是 Client Component
- 动态路由 /todos/[id] 的写法

接下来会把这些思路迁移到 /posts 上。`,
    createdAt: '2025-01-01T10:00:00.000Z',
  },
  {
    id: 2,
    slug: 'nextjs-routing-basics',
    title: 'Next.js 路由和目录结构快速上手',
    summary: '搞懂 app 目录、page.tsx、layout.tsx、动态路由 [slug]。',
    content: `第二篇文章主要讲路由：

- app/page.tsx 映射到 /
- app/posts/page.tsx 映射到 /posts
- app/posts/[slug]/page.tsx 映射到 /posts/:slug

你已经在 todos 模块里体验过一遍。`,
    createdAt: '2025-01-05T12:00:00.000Z',
  },
  {
    id: 3,
    slug: 'nextjs-data-fetching',
    title: 'Next.js 数据获取与缓存思路',
    summary: '用 fetch 的 cache / revalidate 来控制 SSR / SSG / ISR。',
    content: `第三篇文章会回顾：

- cache: 'no-store' -> 纯 SSR
- 默认 / force-cache -> 静态生成
- next: { revalidate: 60 } -> ISR

并且会在实际项目里给出使用建议。`,
    createdAt: '2025-01-10T09:30:00.000Z',
  },
];

// 工具函数：根据 slug 找文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
