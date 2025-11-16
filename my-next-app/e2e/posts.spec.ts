// e2e/posts.spec.ts
import { test, expect } from '@playwright/test';

test('可以从文章列表点进详情页', async ({ page }) => {
  // 进入文章列表页
  await page.goto('/posts');

  // 这里不再用 /文章/ 这种模糊匹配，直接用具体标题
  const postTitle = '从 0 学会 Next.js SSR 思维';

  // 点击这篇文章的链接（列表页里 title 应该就是这个文本）
  await page.getByRole('link', { name: postTitle }).click();

  // 断言：详情页的 h1 标题是这篇文章
  await expect(page.getByRole('heading', { name: postTitle })).toBeVisible();

  // 断言：URL 里是对应的 slug
  await expect(page).toHaveURL(/\/posts\/learn-nextjs-ssr$/);
});
