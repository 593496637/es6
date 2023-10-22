// 1.函数定义类型和返回值 | 箭头函数定义类型和返回值
// 2.函数默认参数 | 函数可选参数
// 3.参数是一个定义如何定义
// 4.函数this类型
// 5.函数重载

// 1.函数定义类型和返回值
const add = (a: number, b: number): number => {
  return a + b;
};

// 2.函数默认参数 | 函数可选参数
const add2 = (a: number, b: number = 10): number => {
  return a + b;
};
add2(1);

const add3 = (a: number, b?: number): number => {
  return a + (b || 10);
};
add3(1);

// 3.参数是一个定义如何定义
interface IUser {
  name: string;
  age: number;
}
const getUserInfo = (user: IUser): IUser => {
  return user;
};
console.log(getUserInfo({ name: 'tom', age: 18 }));

// 4.函数this类型
// 例1
interface IPoint {
  x: number;
  y: number;
}

interface IFunc {
  (this: IPoint, a: number, b: number): void;
}

const fn: IFunc = function (a, b) {
  console.log(this.x + a + b);
};
fn.call({ x: 1, y: 2 }, 2, 3);

// 例2
interface Obj {
  user: number[];
  add: (this: Obj, a: number) => void;
}

const obj: Obj = {
  user: [1, 2, 3],
  add(this: Obj, a: number) {
    this.user.push(a);
  },
};
obj.add(4);
console.log(obj);

// 5.函数重载
let user: number[] = [1, 2, 3];
function findNum(add: number[]): number[]; //如果传入的是number类型的数组就做添加
function findNum(id: number): number[]; //如果传入id就做单个查找
function findNum(): number[]; //如果不传入参数就返回所有的数据
function findNum(ids?: number | number[]): number[] {
  if (Array.isArray(ids)) {
    return [...user, ...ids];
  } else if (typeof ids === 'number') {
    return user.filter((item) => item === ids);
  } else {
    return user;
  }
}

console.log(findNum([4, 5, 6]));
console.log(findNum(1));
console.log(findNum());

export {};
