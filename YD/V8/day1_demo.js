function add(a, b) { return a + b; }

for (let i = 0; i < 1e5; i++) add(1, 2);      // 稳定输入：数字
for (let i = 0; i < 1e5; i++) add('1', '2');  // 反转输入：字符串

console.log('done');