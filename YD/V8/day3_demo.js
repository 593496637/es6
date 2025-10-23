function Point(x, y) {
  this.x = x;
  this.y = y;
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);

function readX(p) { return p.x + 1; }


// 计时
console.time('phase1');
for (let i = 0; i < 1e6; i++) readX(p1);
console.timeEnd('phase1');

console.time('phase2');
for (let i = 0; i < 1e6; i++) readX(p2);
console.timeEnd('phase2');

p1.z = 99;

console.time('phase3');
for (let i = 0; i < 1e6; i++) readX(p1);
console.timeEnd('phase3');
