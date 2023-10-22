// object类型
// const s: object = '123'; // 报错，原始类型不能赋值给object类型
// const n: object = 123; // 报错，原始类型不能赋值给object类型
const a: object = {};
const b: object = [];
const c: object = function () {};

// 字面量类型:可以复制给任意类型
const d: {} = 123;
const e: {} = '123';
const f: {} = true;
const g: {} = [];

// {}和object的区别
// d.aa = 123; // 报错，因为d是字面量类型，不能添加属性

export {};
