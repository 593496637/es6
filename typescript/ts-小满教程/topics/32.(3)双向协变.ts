// 鸭子类型：如果它走起路来像鸭子，叫起来也是鸭子，那么它就是鸭子
// 协变是什么？逆变是什么？双向协变是什么？
// 协变：支持子类对象赋值给父类对象的情况称之为协变
// 逆变：支持父类对象赋值给子类对象的情况称之为逆变

// 主类型
interface A {
  name: string;
  age: number;
}

// 子类型
interface B {
  name: string;
  age: number;
  sex: string;
}

let fn1 = (a: A) => {};
let fn2 = (b: B) => {};

// 双向协变:需要设置"strictFunctionTypes": false 或者 设置strict: false
fn2 = fn1;
fn1 = fn2;

export {};
