// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('首页可以打开并看到导航标题', async ({ page }) => {
  // 这里用的是 playwright.config.ts 里配置的 baseURL: http://localhost:3000
  await page.goto('/');

  // 断言：页面中包含导航栏上的标题文案（来自 RootLayout）
  await expect(page.getByText('My Next Blog')).toBeVisible();
});