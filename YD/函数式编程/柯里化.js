// 最简单的例子
function add(x, y) {
  return x + y
}

console.log(add(2, 3)) // 5

// 柯里化版本：每次接受一个参数
function curriedAdd(x) {
  return function (y) {
    return x + y
  }
}

console.log(curriedAdd(2)(3))

// es6箭头写法
const add2 = x => y => x + y
console.log(add2(2)(3))

// 复用性更高
const add10 = add2(10)
console.log(add10(5))
console.log(add10(20))

// 更容易函数组合
const arr = [1, 2, 3]
console.log(arr.map(add2(10))); // [ 11, 12, 13 ]
// 因为add2(10)返回的是一个单参数函数，正好符合.map()需要的形式