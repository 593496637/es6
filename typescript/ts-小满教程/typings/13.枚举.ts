// 普通枚举
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// 数字枚举
enum Color {
  red = 1,
  green = 4,
  blue = 7,
}

console.log(Color.red);
console.log(Color.green);
console.log(Color.blue);

// 字符串枚举
enum Color2 {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

// 异构枚举
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES',
}

// 接口枚举
interface Enum {
  red: Color2.red;
}

const obj: Enum = {
  red: Color2.red, // 或者 'red'
};

// const 枚举
// 与普通枚举的区别是，const 枚举在编译阶段会被删除，只留下一个对象
const enum Types {
  success,
  error,
}
const code: number = 0;
if (code === Types.success) {
  console.log('success');
}

// 反向映射: 只有数字枚举可以反向映射，字符串枚举不可以
enum Enum2 {
  A = 123,
}
const a = Enum2.A;
const nameOfA = Enum2[a]; // "A"

console.log(a, nameOfA);

export {};
