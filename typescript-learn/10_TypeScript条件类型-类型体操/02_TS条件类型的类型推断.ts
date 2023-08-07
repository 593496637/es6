type CalcFnType = (num1: number, num2: string) => number;

function foo() {
  return "abc";
}

// 获取一个函数的返回值类型：内置工具
type CalcReturnType = ReturnType<CalcFnType>;
type FooReturnType = ReturnType<typeof foo>;

// 总结类型体操题目
// 自己实现ReturnType
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

// 自己实现ParameterType
type MyParameterType<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;

type MyCalcReturnType = MyReturnType<CalcFnType>;
type MyCalcParameterType = MyParameterType<CalcFnType>;

export {};
