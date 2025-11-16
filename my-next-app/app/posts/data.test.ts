// app/posts/data.test.ts

import { getPostBySlug, posts } from './data';

describe('getPostBySlug', () => {
  it('能根据 slug 找到正确的文章', () => {
    // 先从现有 posts 里拿一条，避免写死 slug
    const firstPost = posts[0];

    // 防御：如果没有文章，就跳过这个测试（你现在肯定有的）
    if (!firstPost) {
      return;
    }

    const result = getPostBySlug(firstPost.slug);

    // 断言：找到的文章不为 undefined，并且 slug 一致
    expect(result).toBeDefined();
    expect(result?.slug).toBe(firstPost.slug);
  });

  it('找不到不存在的 slug 时返回 undefined', () => {
    const result = getPostBySlug('this-slug-should-not-exist-xyz');

    expect(result).toBeUndefined();
  });
});
