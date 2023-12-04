// Partial: 将传入的属性变为可选
// Pick: 从传入的属性中挑选出一部分属性

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial: 将传入的属性变为可选
type PartialTodo = Partial<Todo>;

// Pick: 从传入的属性中挑选出一部分属性
type PickTodo = Pick<Todo, 'title' | 'completed'>;

/**
 *  keyof T: 获取T的所有属性名组成的联合类型 => 'title' | 'description' | 'completed'
 */

/**
 * Partial的实现
 */
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
type MyPartialTodo = MyPartial<Todo>;

/**
 * Pick的实现
 */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyPickTodo = MyPick<Todo, 'title' | 'completed'>;
