"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 函数声明
function sum(x, y) {
    return x + y;
}
// 函数表达式
let mySum = function (x, y) {
    return x + y;
};
// 如果需要我们手动给 mySum2 添加类型
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
let mySum2 = (x, y) => {
    return x + y;
};
mySum2(1, 2);
let mySearch = (source, subString) => {
    return source.search(subString) !== -1;
};
// 可选参数 
// 可选参数后面不允许再出现必需参数了
function buildName(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
// 默认参数
// TypeScript 会将添加了默认值的参数识别为可选参数
// 此时就不受「可选参数必须接在必需参数后面」的限制了
function buildName2(firstName = 'Tom', lastName) {
    return firstName + ' ' + lastName;
}
// 剩余参数
// es6  ...rest
function push(array, ...items) {
    items.forEach(function (item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);
// 重载
// 缺点：不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
function reverse2(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
console.log(reverse2('abc'));
exports.default = {};
