function testArrayKinds() {
  console.time('###packed');
  const arr1 = [];
  for (let i = 0; i < 1_000_000; i++) arr1.push(i); // 全整数
  console.timeEnd('###packed');

  console.time('###double');
  const arr2 = [];
  for (let i = 0; i < 1_000_000; i++) arr2.push(i + 0.5); // 浮点数
  console.timeEnd('###double');

  console.time('###holey');
  const arr3 = new Array(1_000_000); // 稀疏数组
  arr3[0] = 1;
  arr3[999_999] = 999999;
  console.timeEnd('###holey');
}

testArrayKinds();
