// infer
// 定义一个类型，如果传入的类型是一个数组，那么返回数组的类型，如果传入的什么类型，那么返回什么类型

type GetArrayType<T> = T extends Array<any> ? T[number] : T;
type GetArray = GetArrayType<number[]>; // number
type GetArray2 = GetArrayType<string | number[]>; // string | number
type GetArray3 = GetArrayType<string>; // string

// 通过infer关键字
type GetArrayType2<T> = T extends (infer U)[] ? U : T;
type GetArray4 = GetArrayType2<string[]>; // string
type GetArray5 = GetArrayType2<Function>; // Function

// 传元组
type GetArrayType3<T> = T extends (infer U)[] ? U : never;
type T = [string, number];
type uni = GetArrayType3<T>;

export {};
