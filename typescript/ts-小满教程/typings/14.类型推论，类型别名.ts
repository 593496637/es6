// 类型推论
// 鼠标移入变量，可以看到类型

let str = 'str';
let arr: number[] = [1, 2, 3];

// 没有赋值，但是有类型，那么就是 any 类型
let str2;
str2 = 134;

// 如果嫌类型太长，可以使用 type 关键字
type Str = string;
let str3: Str = 'str';

// type可以写联合类型
type s = number[] | string;

// interface 可以继承 interface
interface A extends B {}
interface B {
  name: string;
}
interface B {
  age: number;
}

// 写相同的interface，会自动合并
const obj: B = {
  name: 'tom',
  age: 18,
};

// extends 包含的意思
// 左边的值会作为右边类型的子类型
// 1.any unknown
// 2.Object
// 3.Number String Boolean
// 4.number string boolean
// 5.1 'test' true
// 6.never
// 上面包含下面的类型 从上到下
type num = 1 extends number ? true : false;

export {};
