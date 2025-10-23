const o = {};
for (let i = 0; i < 25; i++) {
  o['k' + i] = i;
}
console.log('属性数量：', Object.keys(o).length);
