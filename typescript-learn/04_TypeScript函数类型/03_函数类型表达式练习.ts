// 函数类型表达式
type Fn = (x: number, y: number) => number;
function calc(fn: Fn) {
  const x = 100;
  const y = 200;
  const result = fn(x, y);
  console.log(result);
  return result;
}

// 相加
function add(x: number, y: number): number {
  return x + y;
}

calc(add);

// 返回x
function foo(x: number) {
  return x;
}

calc(foo);

// 相乘
function multiply(x: number, y: number): number {
  return x * y;
}

calc(multiply);

// 使用匿名函数：匿名函数参数类型不需要写, ts会自动推导出类型
calc(function (x, y) {
  return x - y;
});

export {};
