// 模拟网络延迟
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author: string;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
};

export type Stats = {
  posts: number;
  views: number;
  likes: number;
};

const mockPosts: Post[] = [
  {
    slug: 'hello-nextjs',
    title: 'Hello Next.js',
    date: '2024-01-01',
    summary: 'Next.js 入门介绍',
    author: '张三',
  },
  {
    slug: 'app-router-guide',
    title: 'App Router 指南',
    date: '2024-01-02',
    summary: 'App Router 核心概念',
    author: '李四',
  },
  {
    slug: 'rsc-explained',
    title: 'RSC 详解',
    date: '2024-01-03',
    summary: 'React Server Components 深度解析',
    author: '王五',
  },
];

export async function getPosts(ms = 800): Promise<Post[]> {
  await delay(ms);
  return mockPosts;
}

export async function getPost(slug: string, ms = 600): Promise<Post | null> {
  await delay(ms);
  return mockPosts.find((p) => p.slug === slug) ?? null;
}

export async function getUser(ms = 500): Promise<User> {
  await delay(ms);
  return { id: '1', name: '张三', avatar: '👤', bio: 'Next.js 学习者' };
}

export async function getStats(ms = 400): Promise<Stats> {
  await delay(ms);
  return { posts: 12, views: 3840, likes: 256 };
}
