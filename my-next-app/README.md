This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

1）纯 SSR：每次请求都拉最新（你现在就是）
2）改成 SSG：构建时拉一次，后面都用静态页面
3）ISR：静态为主，偶尔刷新一下（折衷方案）



•	对于 SSR（cache: 'no-store'）：

这个 now 每次请求都会变 → 每刷新一次，服务器渲染时间 就变。
• 对于 SSG（force-cache / 默认）：
在 生产 build 后，now 会被“写死”，刷新多少次都一样。
• 对于 ISR（revalidate: 60）：
会在一段时间后“重新 build 一次这个页面”，now 会跳到新的，但不是每刷一次都变。

开发模式（npm run dev）下，Next 会偏向 SSR 的行为，多为开发体验服务，所以这些缓存差异在 dev 模式不明显。
真正的差异最好在 npm run build + npm start 下观察。


一个非常实用的“拍脑袋规则”： 1. admin 后台 / 频繁变化的数据：
• 用 cache: 'no-store' → SSR 2. 基本不变的内容（文档、博客、营销页）：
• 用默认（force-cache） → SSG 3. 有一点点变化，但不要求秒级（比如“新闻列表每几分钟更新一下”）：
• 用 next: { revalidate: N } → ISR
