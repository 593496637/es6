import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, fetchTodos, toggleTodo, type LocalTodo } from '../../mocks/todosApi';

export default function TodoPlayground() {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const addTodo = useMutation({
    mutationFn: createTodo,
    onMutate: async (inputTitle: string) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<LocalTodo[]>(['todos']);

      const optimisticTodo: LocalTodo = {
        id: `optimistic-${Date.now()}`,
        title: inputTitle,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<LocalTodo[]>(['todos'], (oldTodos = []) => [optimisticTodo, ...oldTodos]);
      setTitle('');

      return { previousTodos };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggle = useMutation({
    mutationFn: toggleTodo,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<LocalTodo[]>(['todos']);

      queryClient.setQueryData<LocalTodo[]>(['todos'], (oldTodos = []) =>
        oldTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
      );

      return { previousTodos };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }
    addTodo.mutate(title.trim());
  };

  const errorMessage =
    addTodo.error instanceof Error
      ? addTodo.error.message
      : toggle.error instanceof Error
        ? toggle.error.message
        : undefined;

  return (
    <div className="panel">
      <form className="todo-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="todo-input" className="muted">
            利用 mutation + onMutate 实现乐观更新
          </label>
          <input
            id="todo-input"
            type="text"
            placeholder="输入任务，例如「写一篇 React Query 笔记」"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <button type="submit" disabled={addTodo.isPending}>
          {addTodo.isPending ? '创建中...' : '创建 Todo'}
        </button>
      </form>

      {errorMessage && <p className="error-text">{errorMessage}</p>}

      {todosQuery.isPending && <p className="muted">正在加载 todo 列表...</p>}
      {todosQuery.data && (
        <ul className="todos">
          {todosQuery.data.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggle.mutate(todo.id)}
                  disabled={toggle.isPending}
                />
                <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
              </label>
              <p className="muted">{new Date(todo.createdAt).toLocaleString('zh-CN')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
