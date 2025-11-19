import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { atomWithStorage } from "jotai/utils";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const todosStorageAtom = atomWithStorage<Todo[]>(
  'loadable-demo-todos',
  [
    { id: '1', text: '学习 atomFamily', done: false },
    { id: '2', text: '学习 atomWithStorage', done: true },
  ]
);

export const todosAtom = atom(
  (get) => get(todosStorageAtom),
  (_get, set, update: Todo[]) => set(todosStorageAtom, update)
);

export const todoItemFamily = atomFamily((id: string) =>
  atom(
    (get) => get(todosAtom).find((item) => item.id === id)!,
    (get, set, partial: Partial<Todo>) => {
      const next = get(todosAtom).map((item) =>
        item.id === id ? { ...item, ...partial } : item
      );
      set(todosAtom, next);
    }
  )
);
