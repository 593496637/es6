// 类型断言
// 两种写法: <类型>值 和 值 as 类型

// 例1
const fun = (a: number | string): number => {
  return (a as string).length;
};

const res = fun('123');
console.log(res); // 3

const res2 = fun(123);
console.log(res2); // undefined, 123没有length属性,所以不能滥用类型断言,他会欺骗编译器，无法避免运行时错误

// 例2
interface A {
  run: string;
}

interface B {
  eat: string;
}

let fn = (type: A | B): void => {
  console.log((<A>type).run);
};

fn({ eat: 'eat' }); // undefined, A上面没有eat属性

// 例3
// (window as any).abc = 123; // 报错 any访问上可以访问任何变量;any可以被断言为任何类型,任何类型也可以断言为any

// 例4
const fn2 = (type: any): boolean => {
  return type as boolean;
};

const res3 = fn2(123);
console.log(res3) // 123

export {};
