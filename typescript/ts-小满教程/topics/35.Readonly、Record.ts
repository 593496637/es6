// readonly: 只读属性
// Record: 构造一个类型，其属性名的类型为 K，属性值的类型为 T

type Person = {
  name: string;
  age: number;
  sex: string;
};

// Readonly
type ReadonlyPerson = Readonly<Person>;

/**
 * Readonly的实现
 */
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
type MyReadonlyPerson = MyReadonly<Person>;

// Record
type Key = 'a' | 'b';
const obj1: Record<Key, Person> = {
  a: {
    name: 'why',
    age: 18,
    sex: '男',
  },
  b: {
    name: 'kobe',
    age: 20,
    sex: '男',
  },
};

/**
 * Record的实现
 */

// keyof any: 获取any的所有属性名组成的联合类型 => string | number | symbol
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};
type MyRecordPerson = MyRecord<Key, Person>;
const obj2: MyRecordPerson = {
  a: {
    name: 'why',
    age: 18,
    sex: '男',
  },
  b: {
    name: 'kobe',
    age: 20,
    sex: '男',
  },
};

export {};
