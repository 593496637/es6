// 没有泛形时
const fn1 = (x: number, y: number): number[] => [x, y];
const fn2 = (x: string, y: string): string[] => [x + y];

// 使用泛形
const fn3 = <T>(x: T, y: T): T[] => [x, y]; // T[]表示返回值是一个数组，数组中的元素是T类型的，也可以写成Array<T>
const rs3 = fn3(1, 2); // 不指定泛形的类型，ts会自动推断
const rs4 = fn3<string>('a', 'b'); // 指定泛形的类型
console.log(rs3, rs4);

// 1.type定义泛形
type A<T> = string | number | T;
// boolean是T的实际类型，所以A<boolean>就是string | number | boolean
const a1: A<boolean> = 'a';
const a2: A<boolean> = 1;
const a3: A<boolean> = true;
console.log(a1, a2, a3);

// 定义为undefined时
let a4: A<undefined>;
// 定义为null时
let a5: A<null> = null;

// 2.interface定义泛形
interface B<T> {
  msg: T;
}
const b1: B<string> = {
  msg: 'hello',
};
const b2: B<number> = {
  msg: 1,
};

// 3.函数参数写泛形
const fn4 = <T, K>(a: T, b: K): Array<T | K> => {
  return [a, b];
};
fn4(1, 'a');
fn4<string, string>('a', 'b');

export {};
