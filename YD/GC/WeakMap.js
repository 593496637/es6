// WeakMap 版本（不会内存泄漏）

let weakMap = new WeakMap();

function create() {
  let obj = { name: "test" };
  weakMap.set(obj, new Array(5 * 1024 * 1024).fill("💾")); // 模拟内存占用
  obj = null; // 释放变量引用
}

function testWeakMap() {
  for (let i = 0; i < 100; i++) {
    create();
    if (global.gc) global.gc(); // 手动触发垃圾回收
    console.log(`Iteration ${i}, heapUsed: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }
}

testWeakMap();


// node --expose-gc WeakMap.js