interface IPerson {
  name: string;
  age: number;
}

// Record: 构造一个类型，其属性名的类型为 K，属性值的类型为 T
// Record的内部定义，接收两个泛型参数；Record后面的泛型就是对象键和值的类型
// 作用 :义一个对象的 key 和 value 类型

const obj1: Record<string, IPerson> = {
  a: {
    name: 'why',
    age: 18,
  },
  b: {
    name: 'kobe',
    age: 40,
  },
};

type PersonKeys = 'name' | 'age';

const obj2: Record<string, PersonKeys> = {
  a: 'name',
  b: 'age',
};

const obj3: Record<PersonKeys, string> = {
  name: 'why',
  age: '18',
};

// 自己实现Record
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

const obj4: MyRecord<string | number, IPerson> = {
  1: {
    name: 'why',
    age: 18,
  },
  2: {
    name: 'kobe',
    age: 40,
  },
};

export {};
