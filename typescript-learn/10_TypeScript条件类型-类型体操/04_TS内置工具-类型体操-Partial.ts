interface IPerson {
  name: string;
  age: number;
}

// IPerson变成可选的
type IPersonOptional = Partial<IPerson>;

// 类型体操：实现Partial
type MYPartial<T> = {
  [P in keyof T]?: T[P];
};

type IPersonOptional2 = MYPartial<IPerson>;

export {};
