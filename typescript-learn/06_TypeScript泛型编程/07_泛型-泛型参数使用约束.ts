// key必须为obj里的key，使用keyof

interface IObj {
  name: string;
  age: number;
}

// 这里的key必须为obj里的key
// type IKey = 'name' | 'age';
type IKey = keyof IObj;

// 泛型参数使用约束
function getObjectProperty<O, K extends keyof O>(obj: O, key: K) {
  return obj[key];
}

const obj = {
  name: 'why',
  age: 18,
};

const name = getObjectProperty(obj, 'name');

export {};
