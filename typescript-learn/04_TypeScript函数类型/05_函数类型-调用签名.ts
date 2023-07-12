// 1.函数类型表达式
type BarType = (arg: number) => number;

const bar: BarType = (arg: number): number => {
  return 123;
};

// 如果函数有自己的属性，那么需要用调用签名的方式来定义函数类型
interface IBar {
  name: string;
  age: number;
  // 调用签名
  (arg: number): number;
}

const foo: IBar = (arg: number): number => {
  return arg;
};

foo.name = 'why';
foo.age = 18;
foo(12);


// 函数类型表达式跟调用签名如何选择？
// 1.如果只是描述一个函数类型（函数可以被调用），那么使用函数类型表达式（Function Type Expressions）
// 2.如果除了描述一个函数类型，还要给这个函数类型添加一些属性，那么使用调用签名（Call Signatures）
export {};
