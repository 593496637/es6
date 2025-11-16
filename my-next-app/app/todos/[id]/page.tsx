// app/todos/[id]/page.tsx
import TodoClientActions from '../TodoClientActions';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// 在 Next.js 16 里，params 是 Promise，需要先 await
type PageProps = {
  params: Promise<{
    id: string; // 对应 /todos/1 里的 "1"
  }>;
};

// 这是一个 Server Component，可以 async
export default async function TodoPage({ params }: PageProps) {
  // ✅ 这里一定要先 await params，再取 id
  const { id } = await params;

  let todo: Todo | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        cache: 'no-store', // 每次请求都重新拉数据 → SSR
      }
    );

    if (!res.ok) {
      // 不直接抛错，先把错误信息展示在页面上，方便调试
      error = `请求失败，HTTP 状态码：${res.status}`;
    } else {
      todo = (await res.json()) as Todo;
    }
  } catch (e) {
    // 真正网络层面出错（比如断网、DNS 等）会走这里
    error = e instanceof Error ? e.message : 'Unknown error';
  }

  const serverTime = new Date().toISOString();

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black'>
      <h1 className='text-2xl font-bold text-black dark:text-zinc-50'>
        Todo 详情（SSR 动态路由）
      </h1>

      <p className='mt-2 text-xs text-zinc-500'>
        当前 ID：{id}（来自 URL 参数）
      </p>

      <p className='mt-1 text-xs text-zinc-500'>服务器渲染时间：{serverTime}</p>

      {error && (
        <div className='mt-6 w-full max-w-xl rounded bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-200'>
          <p className='font-semibold'>出错了：</p>
          <p className='mt-1 break-words'>{error}</p>
        </div>
      )}

      {todo && (
        <div className='mt-6 w-full max-w-xl rounded bg-white p-4 shadow dark:bg-zinc-900'>
          <p className='text-sm text-zinc-700 dark:text-zinc-200'>
            <span className='font-semibold'>标题：</span>
            {todo.title}
          </p>

          <p className='mt-2 text-sm'>
            <span className='font-semibold'>完成状态：</span>
            <span
              className={
                todo.completed
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-orange-600 dark:text-orange-400'
              }
            >
              {todo.completed ? '已完成' : '未完成'}
            </span>
          </p>
          {/* ✅ 在 SSR 数据下面，加一个客户端交互组件 */}
          <TodoClientActions initialCompleted={todo.completed} />
        </div>
      )}
    </main>
  );
}
