interface Person {
  name: string;
  age: number;
  address?: string; // 可选属性
  readonly id: number | string; // 联合类型 | 只读属性
  readonly cb: (a: number, b: number) => number; // 函数类型 只读属性
  [propName: string]: any; // 索引签名， 任意属性
}

const tom: Person = {
  name: 'tom',
  age: 18,
  id: 1,
  cb: (a, b) => a + b,
  a: 1,
  b: 2,
  c: 3,
};

// 继承
interface Teacher extends Person {
  teach(): void;
}

const jack: Teacher = {
  name: 'jack',
  age: 20,
  id: 2,
  cb: (a, b) => a + b,
  teach() {
    console.log('teach');
  },
};

// 定义函数类型
interface SayHi {
  (word: string): string;
}

const sayHi: SayHi = (word) => {
  return word;
};

export {};
