/**
 * 你现在学的内容是：
  你正在学习**函数式编程（Functional Programming）**中的第一个核心概念——Functor（函子）模型。
  它的定义是：一种可以被映射（map）的容器。容器负责包裹一个值，而 .map() 方法让你能把一个函数安全地应用在容器内部的值上，并返回一个新的容器。

  换句话说，Functor 让“函数操作值”这件事变得可控、安全、可组合。你写的 Container 就是一个最简单的 Functor：
  •	它用 Container.of(value) 把值放进容器；
  •	用 .map(fn) 在容器内部执行函数；
  •	并且不会修改原数据，而是返回新容器。
 * 
 */


// 定义容器构造函数，用来包裹一个值
function Container(x) {
  this.__value = x; // 把传进来的值存在容器的内部属性里
}


// 提供一个静态方法 of ，用来把任意值放进容器
// 这样写是为了统一创建方式，避免直接用new
Container.of = function (x) {
  return new Container(x);
};

// 给容器添加 map 方法，让它变成一个 Functor （函子）
// map接受一个函数f，并把这个函数应用到容器内部的值上
// 然后返回一个装有新值的“新容器”
Container.prototype.map = function (f) {
  return Container.of(f(this.__value));
};

// ---------------------- 使用示例 ----------------------
// 1.先创建一个容器，里面装着数字3
// 2.用.map(x=>x+1)把内部值加1，得到新容器Container(4)
// 3.在用.map(x=>'Result is'+ x)转成字符串 Container('Result is 4')
// 每次map都返回一个新的容器，不会改变原来的

const result = Container.of(3).map(x => x + 1).map(x => 'Result is ' + x);
console.log(result.__value)






// 用class定义一个容器（Container）类
// 作用：用来“包裹”一个值，避免直接操作这个类
class Container2 {
  constructor(x) {
    this.__value = x
  }

  static of(x) {
    return new Container2(x)
  }

  map(f) {
    return Container2.of(f(this.__value))
  }
}

const result2 = Container2.of(3).map(x => x + 1).map(x => 'Result is ' + x)
console.log(result2.__value)