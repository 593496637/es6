{
  interface IPerson {
    name?: string;
    age?: number;
    address: string;
  }

  // Omit: 从 T 中剔除一系列 K 的属性
  type IPerson1 = Omit<IPerson, "age" | "address">;

  // 实现一个自己的Omit
  type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
  };

  type MyOmit2<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P];
  };

  type IPerson2 = MyOmit<IPerson, "age" | "address">;
  type IPerson3 = MyOmit2<IPerson, "age" | "address">;
}
