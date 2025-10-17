setTimeout(() => console.log('timeout'), 0);
setTimeout(() => console.log('timeout20'), 20);
setImmediate(() => console.log('immediate'));


/* 
  结果：多数情况下是 timeout 先打印。

    原因：

    脚本刚执行完后，进入事件循环的第一阶段是 Timers；

    setTimeout(..., 0) 立刻排进 Timers 队列；

    所以它会先被执行。

    
    在你的脚本执行完后，Poll 阶段可能还没“空转”完。
      如果 Poll 阶段在进入下一个循环前发现：

      没有到期的定时器（setTimeout 还没满足延时条件）；

      但有 setImmediate 任务；

      那么它会 立刻跳到 Check 阶段执行 setImmediate，
      而 setTimeout 要等到下一个循环的 Timers 阶段才触发。

      于是输出变成：

      immediate
      timeout

*/