// any类型 unknown不知道的类型  包含下面所有的类型(1-6)
// 1.top type 顶级类型，any unknown  包含下面所有的类型(2-6)
// 2.Object
// 3.Number String Boolean
// 4.number string boolean
// 5.数字1  字符串'哈哈' 布尔值true
// 6.never

// 1. any:可以赋值给任意类型，也可以接收任意类型的值
let a: any = 123;
let aa: number = a;
a = 'hello';
a = true;

// 2. unknown:只能赋值给unknown和any类型，不能赋值给其他类型
let b: unknown = 123;
// let bb: number = b;  // 报错

let obj: unknown = { a: 1 };
// console.log(obj.a); // 报错:unknown类型的值不能直接访问其属性

// unknown 比 any 更加严格
// 当定义一个变量，不知道是什么类型的时候，可以使用unknown

export {};
