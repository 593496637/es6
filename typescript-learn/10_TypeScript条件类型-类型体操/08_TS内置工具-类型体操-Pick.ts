interface IPerson {
  name?: string;
  age?: number;
  address: string;
}

// Pick: 从 T 中取出一系列 K 的属性
type IPerson1 = Pick<IPerson, "age" | "address">;

// 实现一个自己的Pick
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type IPerson2 = MyPick<IPerson, "age" | "address">;

export {};
