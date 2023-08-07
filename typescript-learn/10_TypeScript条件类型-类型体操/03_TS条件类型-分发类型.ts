type toArray<T> = T extends any ? T[] : never;

type NumArray = toArray<number>;

// number[] | string[]  而不是 (number|string)[]
type NumAndStrArray = toArray<number | string>;

export {};
