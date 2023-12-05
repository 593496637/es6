type Arr = [string, number, boolean];

// first
type First<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
type F = First<Arr>; // string

// last
type Last<T extends any[]> = T extends [...any[], infer U] ? U : never;
type L = Last<Arr>; // boolean

// 剔除第一个元素
type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;
type T = Tail<Arr>; // [number, boolean]

// 剔除最后一个元素
type Init<T extends any[]> = T extends [...infer U, any] ? U : never;
type I = Init<Arr>; // [string, number]

// 获取元组长度
type Length<T extends any[]> = T['length'];
type Len = Length<Arr>; // 3

export {};
