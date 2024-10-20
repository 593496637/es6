function fn0() {
  console.log('fn0', new Date().toLocaleTimeString());
  fn0();
}

fn0();


function fn1() {
  console.log('fn1', new Date().toLocaleTimeString());
  return new Promise().resolve().then(fn1)
}

fn1();

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