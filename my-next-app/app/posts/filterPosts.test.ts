// app/posts/filterPosts.test.ts

import type { Post } from './data';
import { filterPostsByQuery } from './filterPosts';

const mockPosts: Post[] = [
  {
    id: 1,
    slug: 'nextjs-routing-basics',
    title: 'Next.js Routing Basics',
    createdAt: '2024-01-01T00:00:00.000Z',
    content: '...',
    summary: 'Routing in Next.js',
  },
  {
    id: 2,
    slug: 'learn-nextjs-ssr',
    title: 'Learn Next.js SSR',
    createdAt: '2024-01-02T00:00:00.000Z',
    content: '...',
    summary: 'SSR in Next.js',
  },
  {
    id: 3,
    slug: 'other-post',
    title: 'Some Other Post',
    createdAt: '2024-01-03T00:00:00.000Z',
    content: '...',
    summary: 'Other stuff',
  },
];

describe('filterPostsByQuery', () => {
  it('query 为空时，返回所有文章', () => {
    const result = filterPostsByQuery(mockPosts, '');
    expect(result).toHaveLength(mockPosts.length);
  });

  it('只包含空格时，视为没有关键字，也返回所有文章', () => {
    const result = filterPostsByQuery(mockPosts, '   ');
    expect(result).toHaveLength(mockPosts.length);
  });

  it('可以按标题包含关键字进行过滤（不区分大小写）', () => {
    const result = filterPostsByQuery(mockPosts, 'next');
    expect(result.map((p) => p.slug)).toEqual([
      'nextjs-routing-basics',
      'learn-nextjs-ssr',
    ]);
  });

  it('找不到匹配时，返回空数组', () => {
    const result = filterPostsByQuery(mockPosts, 'no-match-keyword');
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
