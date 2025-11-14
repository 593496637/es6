export interface LocalTodo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

let todos: LocalTodo[] = [
  {
    id: 'todo-1',
    title: '学习 QueryClient 以及 Query 缓存',
    completed: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'todo-2',
    title: '体验 mutation onMutate / onError',
    completed: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'todo-3',
    title: '使用 invalidateQueries 刷新数据',
    completed: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
];

const wait = (min = 320, max = 780) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * (max - min) + min));

const buildId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export async function fetchTodos() {
  await wait();
  return todos.map((todo) => ({ ...todo }));
}

export async function createTodo(title: string) {
  await wait();

  if (!title.trim()) {
    throw new Error('todo 标题不能为空');
  }

  // 模拟 20% 的失败，以便观察 onError 回滚
  if (Math.random() < 0.2) {
    throw new Error('服务器偶发故障，请稍后重试');
  }

  const newTodo: LocalTodo = {
    id: buildId(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos = [newTodo, ...todos];
  return { ...newTodo };
}

export async function toggleTodo(id: string) {
  await wait();
  let updated: LocalTodo | undefined;
  todos = todos.map((todo) => {
    if (todo.id === id) {
      updated = { ...todo, completed: !todo.completed };
      return updated;
    }
    return todo;
  });

  if (!updated) {
    throw new Error('Todo 不存在');
  }

  return { ...updated };
}
