/*
curry(fn) 的本质就是：
如果参数不够，就返回一个函数继续收集；够了就执行原函数。
**/

function curry(fn) {
  return function curried(...args) {
    // 如果传入的参数数量>=原函数需要的参数数量
    if (args.length >= fn.length) {
      // 参数够了，直接调用原函数
      return fn(...args)
    } else {
      // 参数还不够，返回一个新函数，继续收集参数
      return (...rest) => curried(...args, ...rest)
    }
  }
}

// 例子
function add(a, b, c) {
  return a + b + c
}
const curriedAdd = curry(add)
const result1 = curriedAdd(1)(2)(3)
const result2 = curriedAdd(1)(2, 3)
const result3 = curriedAdd(1, 2)(3)
const result4 = curriedAdd(1, 2, 3)

// 6 6 6 6
console.log(result1, result2, result3, result4)