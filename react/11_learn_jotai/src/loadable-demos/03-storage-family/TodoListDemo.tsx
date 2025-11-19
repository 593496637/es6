import { useAtomValue, useAtom } from "jotai";
import { todosAtom, todoItemFamily } from "./atoms";

export default function TodoListDemo() {
  const todos = useAtomValue(todosAtom);

  return (
    <section>
      <h2>步骤三 · atomWithStorage + atomFamily</h2>
      <p>下面的待办事项持久化在 localStorage，并通过 atomFamily 独立管理每一项。</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: 12 }}>
            <TodoItem id={todo.id} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function TodoItem({ id }: { id: string }) {
  const todoAtom = todoItemFamily(id);
  const [todo, setTodo] = useAtom(todoAtom);

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => setTodo({ done: e.target.checked })}
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
    </label>
  );
}
