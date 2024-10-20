/**
 * 执行这个函数会发生什么？
 * 答：栈溢出
 */
function fn0() {
  console.log('fn0', new Date().toLocaleTimeString());
  fn0();
}

fn0();


/**
 * 执行这个函数会发生什么？
 * 答：不会栈溢出，因为Promise是微任务，但是会阻塞主线程，会很卡
 */
function fn1() {
  console.log('fn1', new Date().toLocaleTimeString());
  return new Promise().resolve().then(fn1)
}

fn1();

/**
 * 执行这个函数会发生什么？
 * 答：会一直打印fn2，因为setTimeout是宏任务，会不断执行fn2，不会导致栈溢出
 */
function fn2() {
  console.log('fn2', new Date().toLocaleTimeString());
  setTimeout(() => {
    fn2();
  }, 0);
}

fn2();


// 实现一个setTimeout
async function mySetTimeout(fn, delay) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  fn();
}

mySetTimeout(() => {
  console.log('mySetTimeout', new Date().toLocaleTimeString());
}, 1000);