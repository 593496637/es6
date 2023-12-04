//Set天然去重，引用类型除外
const set: Set<number> = new Set([1, 2, 3, 4, 5, 5, 5]);
console.log(set);
console.log(set.has(1));

// Map：key可以是任意类型
const map: Map<string, number> = new Map();
map.set('a', 1);
console.log(map.get('a'));

//WeakMap WeakSet：弱引用，key只能是引用类型
const obj = { name: '小红' };
const obj2 = obj;
const weakMap: WeakMap<object, number> = new WeakMap();
weakMap.set(obj, 1);

export {};
