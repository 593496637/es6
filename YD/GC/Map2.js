const format = (bytes) => (bytes / 1024 / 1024).toFixed(2) + 'MB';

global.gc(); // 手动触发 GC
const mem1 = process.memoryUsage();
console.log('初始内存：', format(mem1.heapUsed));

let map = new Map();
let key = new Array(5 * 1024 * 1024); // 分配约 40MB
map.set(key, 1);
key = null;
global.gc();

const mem2 = process.memoryUsage();
console.log('Map 释放后内存：', format(mem2.heapUsed));

// node --expose-gc Map2.js
// Map 的 key 被置为 null 后，内存并未回收，仍占用约 43MB。