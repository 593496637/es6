// infer递归翻转
type Arr = [1, 2, 3];

type Reverse<T extends any[], R extends any[] = []> = T extends [
  infer U,
  ...infer Rest
]
  ? Reverse<Rest, [U, ...R]>
  : R;
type R = Reverse<Arr>; // [3, 2, 1]

// 课程方法
type Reverse2<T extends any[]> = T extends [infer U, ...infer Rest]
  ? [...Reverse2<Rest>, U]
  : [];

type R2 = Reverse2<Arr>; // [3, 2, 1]

export {};
