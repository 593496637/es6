//Set天然去重，引用类型除外
const set: Set<number> = new Set([1, 2, 3, 4, 5, 5, 5]);
console.log(set);
console.log(set.has(1));

// Map：key可以是任意类型
const map: Map<string, number> = new Map();
map.set('a', 1);
console.log(map.get('a'));

//WeakMap WeakSet：弱引用，key只能是引用类型。不会被垃圾回收机制回收

let obj: any = { name: '小红' }; //obj第一次引用
let obj2: any = obj; //obj第二次引用
const weakMap: WeakMap<object, number> = new WeakMap();
// obj如果被回收，weakMap也会被回收
weakMap.set(obj, 1); //obj还是被引用了两次


obj = null; //obj第一次被解除引用
obj2 = null; //obj第二次被解除引用
console.log(weakMap.get(obj)); //undefined

export {};
 