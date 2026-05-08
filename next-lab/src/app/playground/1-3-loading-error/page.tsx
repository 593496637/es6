// src/app/playground/1-3-loading-error/page.tsx
async function fetchData() {
  // 模拟慢请求
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { message: '数据加载完成' };
}

export default async function LoadingErrorPage() {
  const data = await fetchData();

  return (
    <div>
      <h1>1-3 Loading & Error</h1>
      <p>{data.message}</p>
    </div>
  );
}
