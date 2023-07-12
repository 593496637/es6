function foo(arg: number): number {
  return 123;
}

// foo本身也是一个标识符，也应该有自己的类型
// 这里不能是any, 因为any可以赋值给任意类型
const bar: any = (arg: number): number => {
  return 123;
};

export {};
