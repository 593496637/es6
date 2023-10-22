// 泛形约束

// 1.extends:意思是泛形必须是number类型
// 语法: <T extends number>, T必须是number类型，T可以是：number, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
function add<T extends number>(a: T, b: T) {
  return a + b;
}

const result = add(1, 2);
console.log(result);

// 2.extends:控制类型的范围
interface Len {
  length: number;
}
function fn<T extends Len>(a: T) {
  return a.length;
}

// 3.keyof
const obj = {
  name: 'hello',
  age: 20,
};
// 这是一个联合类型
// type Key = keyof typeof obj; // 'name' | 'age'

function getVal<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const res = getVal(obj, 'name');
console.log(res);

// 4.遍历interface，将其所有属性变为可选 in的用法 
interface Person {
  name: string;
  age: number;
}

// 类似于for in  for(let key in obj)
type Options<T extends object> = {
  readonly [K in keyof T]?: T[K];
};

type PartialPerson = Options<Person>;

export {};
