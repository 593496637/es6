import Link from 'next/link';

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { message: '数据加载完成 ✅' };
}

export default async function LoadingErrorPage() {
  const data = await fetchData();

  return (
    <div>
      <h1>1-3 Loading & Error</h1>
      <p>{data.message}</p>

      <hr style={{ margin: '24px 0' }} />
      <p>单独测试错误场景：</p>
      <Link href='/playground/1-3-loading-error/error-demo'>
        👉 触发错误演示
      </Link>
    </div>
  );
}
