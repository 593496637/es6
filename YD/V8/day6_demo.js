function createGarbage() {
  const junk = [];
  for (let i = 0; i < 1e6; i++) {
    junk.push({ index: i, data: new Array(100).fill(i) });
  }
  return '垃圾制造完毕';
}

function leakMemory() {
  const leaks = [];
}

createGarbage();
leakMemory();
