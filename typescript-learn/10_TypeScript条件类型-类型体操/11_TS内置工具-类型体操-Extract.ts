{
  type IPerson = "zhagnsan" | "lisi" | "wangwu";

  // Extract: 从 T 中提取一系列 U

  type IPerson1 = Extract<IPerson, "zhagnsan" | "lisi">;

  // 实现一个自己的Extract
  type MyExtract<T, U> = T extends U ? T : never;

  type IPerson2 = MyExtract<IPerson, "zhagnsan" | "lisi">;
}
