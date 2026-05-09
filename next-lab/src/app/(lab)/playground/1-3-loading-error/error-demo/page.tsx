// 强制动态渲染，跳过 build 时预渲染
export const dynamic = 'force-dynamic';
async function fetchWithError() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw new Error('模拟服务端报错：API 超时');
}

export default async function ErrorDemoPage() {
  await fetchWithError();

  // 不会执行到这里
  return <div>不会显示</div>;
}
