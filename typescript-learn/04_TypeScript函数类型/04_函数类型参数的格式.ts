// TypeScript对传入函数的参数个数不做监测
type CalcType = (num1: number, num2: number) => number;

function calc(fn: CalcType) {
  fn(1, 2);
}

calc(function () {
  return 123;
});


// foreach例子
const arr = [1, 2, 3];
//forEach有三个参数 item, index, array，可以传入一个或者多个参数
arr.forEach(function (item) {
  console.log(item);
});


export {};
