interface IPerson {
  name?: string;
  age?: number;
}

// IPerson变成必选的
type IPersonRequired = Required<IPerson>;

// 类型体操：实现Required
type MYRequired<T> = {
  [P in keyof T]-?: T[P];
};

type IPersonRequired2 = MYRequired<IPerson>;

export {};
