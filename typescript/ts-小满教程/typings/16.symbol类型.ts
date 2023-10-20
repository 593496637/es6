// 内存地址不一样
const a1: symbol = Symbol(1); //唯一的
const a2: symbol = Symbol(1); //唯一的

console.log(a1, a2);
console.log(a1 === a2);

// 如何让两个symbol相等
// 1.使用Symbol.for: 如果已经有了，就返回，没有就创建
console.log(Symbol.for('a') === Symbol.for('a'));

// 2.使用keyFor: 获取symbol的key
console.log(Symbol.keyFor(a1) === Symbol.keyFor(a2));

// symbol的应用场景
// obj中防止属性名冲突
let obj = {
  name: 'tom',
  [a1]: 'hello',
  [a2]: 'world',
};

console.log(obj);

// 获取obj中所有的键:
// 只能获取symbol类型的键
console.log(Object.getOwnPropertySymbols(obj));
// 使用 for in
// 只能获取到普通的键
for (let key in obj) {
  console.log(key);
}

// 使用getOwnPropertyNames :只能获取到普通的键
console.log(Object.getOwnPropertyNames(obj));

// 使用Object.keys: 只能获取到普通的键
console.log(Object.keys(obj));

// 使用Reflect.ownKeys: 可以获取到所有的键
console.log(Reflect.ownKeys(obj));

export {};
