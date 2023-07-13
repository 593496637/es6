// 1.普通实现
// function getLength(arg) {
//   return arg.length;
// }

// 2.函数的重载
// function getLength(arg: any[]): number;
// function getLength(arg: string): number;
// function getLength(arg: any) {
//   return arg.length;
// }

// 3.联合类型
// function getLength(arg: any[] | string);
// function getLength(arg: any) {
//   return arg.length;
// }

// 4.对象类型
function getLength(arg: { length: number }) {
  return arg.length;
}

const s1 = getLength('abc');
const s2 = getLength([1, 2, 3]);
console.log(s1, s2);

export {};
