// ⚙️ 案例 1：检测内存泄漏的最小实验


// 启动方式：node --expose-gc leak-demo.js

const leaks = [];
function leakMemory() {
  leaks.push(new Array(1e6).fill('memory leak'))
}

setInterval(() => {
  leakMemory();
  if (global.gc) global.gc(); // 手动触发gc
  console.log(process.memoryUsage().heapUsed / 1024 / 1024, 'MB');
}, 1000)