let a = 0
let test = async () => {
  // 锁变量 a还是0
  a = a + (await 10)
  // 0+10
  console.log(a);
}

test()
// 同步代码先执行
console.log('~~', ++a);

// 输入： 1  10

// async原理
// co模块包含了一个generator


// 1.async是什么? 
//    1.1 Promise + 生成器 (async+await)
//    1.2 最新的es里，await可以单独存在，不需要async包裹了 await是microtask
// 2.生成器是什么?
//    2.2 协程，generator可以暂停，协程可以跑在线程上，
//    多个协程协作，A启动B协程需要A把权限叫出来给B
//    不是被操作系统内核管理，由程序控制


// async优点
// 1.内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。
// 2.更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
// 3.更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。


// co 模块的思路就是利用 generator 的这个特性，将异步操作跟在 yield 后面，
// 当异步操作完成并返回结果后，再触发下一次 next() 。
// 当然，跟在 yield 后面的异步操作需要遵循一定的规范 thunks 和 promises。
function co(gen) {
  var it = gen();
  var ret = it.next();
  ret.value.then(function (res) {
    it.next(res);
  });
}
function sayHello() {
  return Promise.resolve('hello').then(function (hello) {
    console.log(hello);
  });
}
co(function* helloworld() {
  yield sayHello();
  console.log('world');
})