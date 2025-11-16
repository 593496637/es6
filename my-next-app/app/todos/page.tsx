// app/todos/page.tsx

import Link from 'next/link';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// 这个页面是 Server Component，可以 async
export default async function TodosListPage() {
  let todos: Todo[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=10',
      {

        // 开发模式（npm run dev）下，Next 会偏向 SSR 的行为，多为开发体验服务，所以这些缓存差异在 dev 模式不明显。
        // 真正的差异最好在 npm run build + npm start 下观察。

        // SSR:每次请求都拉最新
        // cache: 'no-store', // 每次请求都拉最新（典型 SSR）

        // SSG:构建时拉一次，后面都用静态页面
        // cache: 'force-cache', // 或者干脆不写 options，默认也是静态 SSG

        // ISR:增量静态再生成,静态为主，偶尔刷新一下（折衷方案）
        next: {
          revalidate: 60, // 单位秒：最多 60 秒刷新一次 ISR
        },
      }
    );

    if (!res.ok) {
      error = `请求失败，HTTP 状态码：${res.status}`;
    } else {
      todos = (await res.json()) as Todo[];
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
  }

  const serverTime = new Date().toISOString();

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
        Todos 列表（SSR）
      </h2>

      <p className="mt-1 text-xs text-zinc-500">
        服务器渲染时间：{serverTime}
      </p>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        下面是从接口返回的前 10 条 todo，点击标题可以进入详情页。
      </p>

      {error && (
        <div className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-200">
          <p className="font-semibold">出错了：</p>
          <p className="mt-1 break-words">{error}</p>
        </div>
      )}

      {!error && (
        <ul className="mt-4 space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="rounded border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Link
                href={`/todos/${todo.id}`}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                {todo.title}
              </Link>

              <span
                className={
                  'ml-2 inline-flex items-center rounded px-1.5 py-0.5 text-xs ' +
                  (todo.completed
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300')
                }
              >
                {todo.completed ? '已完成' : '未完成'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}