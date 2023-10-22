// number[]
// Array<number>

const arr1: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3];

interface X {
  name: string;
  age?: number;
}

// 定义对象数组使用interface
const arr3: X[] = [{ name: 'tom' }, { name: 'jack' }];

// number[][]
// Array<Array<number>>
// 二维数组
const arr4: number[][] = [
  [1, 2],
  [3, 4],
];
const arr5: Array<Array<number>> = [
  [1, 2],
  [3, 4],
];

// 函数剩余参数
function sum(...args: number[]) {
  // let a: any[] = arguments;  //arguments是一个类数组，不能直接使用数组的方法
  // 可以使用IArguments类型
  let a: IArguments = arguments;
  let b: Arguments = arguments;
}
sum(1, 2, 3);

// arguments的原理
interface Arguments {
  [index: number]: any;
  length: number;
  callee: Function;
}

export {};
