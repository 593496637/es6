{
  type IPerson = "zhagnsan" | "lisi" | "wangwu";

  // Exclude: 从 T 中剔除一系列 U
  type IPerson1 = Exclude<IPerson, "zhagnsan" | "lisi">;

  // 实现一个自己的Exclude
  type MyExclude<T, U> = T extends U ? never : T;

  type IPerson2 = MyExclude<IPerson, "zhagnsan" | "lisi">;
}
