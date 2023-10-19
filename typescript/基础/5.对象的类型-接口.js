"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let tom = {
    name: 'Tom',
    age: 19
};
let tom2 = {
    name: 'Tom'
};
let tom3 = {
    name: 'Tom',
    gender: 'male'
};
let tom4 = {
    name: 'Tom',
    gender: 'male'
};
let tom5 = {
    id: 1,
    name: 'Tom',
    age: 19,
    gender: 'male'
};
// tom5.id = 3; 报错
// 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
exports.default = {};
