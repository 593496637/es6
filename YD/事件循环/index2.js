const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});

/**
 * 结果：immediate 先打印。

原因：

  当 I/O 回调执行时，事件循环已经进入了 Poll 阶段；
  执行完 I/O 回调后，接下来是 Check 阶段；
  setImmediate 的回调正好排在 Check 阶段；
  而 setTimeout 要等下一个循环的 Timers 阶段。
 * 
 */