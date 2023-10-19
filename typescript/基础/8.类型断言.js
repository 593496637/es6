"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 值 as 类型
// 此时可以使用类型断言，将 animal 断言成 Fish
// 类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误
function isFish(animal) {
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}
// 将一个父类断言为一个更加具体的子类
class ApiError extends Error {
    constructor() {
        super(...arguments);
        this.code = 0;
    }
}
class HttpError extends Error {
    constructor() {
        super(...arguments);
        this.statusCode = 20;
    }
}
function isApiError(error) {
    if (typeof error.code === 'number') {
        return true;
    }
    return false;
}
console.log(isApiError(new ApiError()));
// 在这个例子中有一个更合适的方式来判断是不是 ApiError，那就是使用 instanceof
class ApiError2 extends Error {
    constructor() {
        super(...arguments);
        this.code = 0;
    }
}
class HttpError2 extends Error {
    constructor() {
        super(...arguments);
        this.statusCode = 20;
    }
}
function isApiError2(error) {
    console.log(error instanceof Error);
    if (error instanceof ApiError2) {
        return true;
    }
    return false;
}
// 这里结果为false，原因不明
console.log(isApiError2(new ApiError2()));
function isApiError3(error) {
    if (typeof error.code === 'number') {
        return true;
    }
    return false;
}
// 通过类型断言将any断言为精确的类型
function getCacheData(key) {
    return window.cache[key];
}
const tom = getCacheData('tom');
// tom.run();
exports.default = {};
