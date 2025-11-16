// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // 放 E2E 测试文件的目录
  testDir: './e2e',

  // 一些通用设置
  use: {
    // 大部分时候无头跑就行（不弹浏览器窗口）
    headless: true,
    // 以后我们会用 baseURL，直接写相对路径就能访问页面
    baseURL: 'http://localhost:3000',
  },

  // ci 里可以改成 'line'，现在先用比较友好的报告样式
  reporter: 'list',
});
