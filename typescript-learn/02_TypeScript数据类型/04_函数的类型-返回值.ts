// 定义函数时，都要定义函数的参数类型和返回值类型
// 返回值类型可以省略，TS可以自动推断出来
function sum(num1: number, num2: number): number {
  return num1 + num2;
}

const result = sum(10, 20);

export {};
