function foo<T, E>(arg1: T, arg2: E): [T, E] {
  return [arg1, arg2];
}

// 使用
const [t1, e1] = foo(1, '2'); // [1, '2']
const [t2, e2] = foo<number, string>(1, '2'); // [1, '2']

export {};
