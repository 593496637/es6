{
  type IPerson = "zhagnsan" | "lisi" | "wangwu" | null | undefined;

  // NonNullable: 从 T 中剔除 null 和 undefined

  type IPerson1 = NonNullable<IPerson>;

  // 实现一个自己的NonNullable
  type MyNonNullable<T> = T extends null | undefined ? never : T;
}
