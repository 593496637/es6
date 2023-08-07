interface IPerson {
  name?: string;
  age?: number;
}

// IPerson变成必选的
type IPersonReadonly = Readonly<IPerson>;

// 类型体操：实现Required
type MYReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type IPersonRequired2 = MYReadonly<IPerson>;

export {};
