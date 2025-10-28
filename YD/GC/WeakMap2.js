const wm = new WeakMap();
let key = new Array(5 * 1024 * 1024); // 分配约 40MB
wm.set(key, 1);
key = null;

function format(bytes) {
    const mb = bytes / 1024 / 1024;
    return mb.toFixed(2) + ' MB';
}

global.gc();
const mem3 = process.memoryUsage();
console.log('使用 WeakMap 后内存：', format(mem3.heapUsed));

// node --expose-gc WeakMap2.js
// WeakMap 的 key 释放后，内存立即下降至 3MB 左右