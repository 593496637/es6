// 函数类型表达式
// 格式：(参数: 类型, 参数: 类型...) => 返回值类型
type BarType = (arg: number) => number;

const bar: BarType = (arg: number): number => {
  return 123;
};

export {};
