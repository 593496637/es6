// 测试 delete
console.time('❀delete❀😫');
for (let i = 0; i < 1_000_000; i++) {
  const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  delete obj.c; // 每次破坏 Hidden Class
  const x = obj.a + obj.d;
}
console.timeEnd('❀delete❀😫'); // 一般 ~100–200ms

// 测试 undefined 赋值
console.time('❀undefined❀😫');
for (let i = 0; i < 1_000_000; i++) {
  const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  obj.c = undefined; // 不改变 Hidden Class
  const x = obj.a + obj.d;
}
console.timeEnd('❀undefined❀😫'); // 一般 ~50–80ms