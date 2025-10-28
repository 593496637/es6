// Map 版本（会造成内存泄漏）

let map = new Map();

function create() {
  let obj = { name: "test" };
  map.set(obj, new Array(5 * 1024 * 1024).fill("💾")); // 模拟占用内存的数据
  obj = null; // 释放变量引用
}

function testMap() {
  for (let i = 0; i < 100; i++) {
    create();
    if (global.gc) global.gc(); // 手动触发垃圾回收
    console.log(`Iteration ${i}, heapUsed: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }
}

testMap();


// node --expose-gc Map.js