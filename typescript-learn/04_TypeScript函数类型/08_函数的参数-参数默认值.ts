
// 默认值：可以省略问号
function foo2(x: number, y: number = 0) {
  return x + y;
}
foo2(1, 2);
foo2(1);

export {};
