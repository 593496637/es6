type IDType = number | string;

// 条件类型
type ResType = boolean extends IDType ? true : false;

// 函数的重载
// function sum(num1: number, num2: number): number;
// function sum(num1: string, num2: string): string;
// function sum(num1, num2) {
//   return num1 + num2;
// }

// 使用泛型实现对函数重载
function sum<T extends number | string>(
  num1: T,
  num2: T
): T extends number ? number : string;
function sum(num1: any, num2: any) {
  return num1 + num2;
}

const res = sum(1, 2);
const str = sum("a", "b");

export {};
