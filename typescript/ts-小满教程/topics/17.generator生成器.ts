// 1.生成器：generator

function* gen() {
  yield Promise.resolve(1);
  yield 2;
  yield 3;
}

const g = gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

// 2.set map
const set: Set<number> = new Set([1, 1, 2, 3, 4]); // 天生去重 1 2 3 4
console.log(set);

const map: Map<string, number> = new Map([
  ['a', 1],
  ['b', 2],
]);
console.log(map);

// 3.迭代器
// (1)实现迭代器
const each = (value: any) => {
  const It: any = value[Symbol.iterator]();
  let next: any = { value: undefined, done: false };
  while (!next.done) {
    next = It.next();
    if (!next.done) {
      console.log(next.value);
    }
  }
};

each(map);
each(set);
each(['a', 'b', 'c']);

// (2)迭代器语法糖，可迭代对象(数组或类数组)：数组，set，map，字符串，arguments，nodeList
for (let v of set) {
  console.log(v);
}

// (3)object对象不是可迭代对象

// 4.解构 原理：迭代器（底层调用iterator迭代器）
// ()实现对象调用迭代器 支持for of
let obj = {
  max: 5,
  current: 0,
  [Symbol.iterator]() {
    return {
      max: this.max,
      current: this.current,
      next() {
        if (this.current === this.max) {
            return {
                done: true,
                value: undefined,
            };
        }else{
            return {
                done: false,
                value: this.current++,
            };
        }
      },
    };
  },
};

// 可以使用for of
for (const value of obj) {
  console.log(value);
}

// 也可以使用解构
// 数组结构
const x = [...obj];
console.log(x);

// 对象结构
const xx={...obj};
console.log(xx);

export {};
