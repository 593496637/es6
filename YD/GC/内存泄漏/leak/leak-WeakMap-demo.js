
// 🔍 案例 2：解决泄漏（WeakMap 改进）

// 启动方式：node --expose-gc leak-WeakMap-demo.js

const weakCache = new WeakMap()

function safeTask(user) {
  if (!weakCache.has(user)) {
    weakCache.set(user, new Array(1e6).fill("data"))
  }

  return weakCache.get(user)
}

function run() {
  const u = { name: 'kai' };
  safeTask(u)
}

setInterval(() => {
  run()
  if (global.gc) global.gc;
  console.log(process.memoryUsage().heapUsed / 1024 / 1024, 'MB');
}, 100)