// boolean
let isDone = false;
// number
let decLiteral = 6;
// 十六进制
let hexLiteral = 0xf00d;
// 其中 0b1010 和 0o744 是 ES6 中的二进制和八进制表示法，它们会被编译为十进制数字。
// 二进制
let binaryLiteral = 0b1010;
// 八进制
let octalLiteral = 0o744;
let notANumber = NaN;
let infinityNumber = Infinity;
// 字符串
let myName = 'Tom';
let myAge = 25;
// 模板字符串
let sentence = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
// 空值
function alertName() {
    alert('My name is Tom');
}
let unusable = undefined;
// Null和undefined
let u = undefined;
let n = null;
// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
let num = undefined;
let un;
let num2 = un;
