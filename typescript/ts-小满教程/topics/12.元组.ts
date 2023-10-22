const arr: readonly [number, boolean] = [1, false];

// arr[0] = 2;  // 加上readonly后，arr就变成了只读数组，不能使用索引赋值

// 可选参数
const arr2: readonly [x: number, y?: number] = [1];

const excel: [string, string, number][] = [
  ['A1', '张三', 18],
  ['A2', '李四', 19],
  ['A3', '王五', 20],
  ['A4', '赵六', 21],
  ['A5', '田七', 22],
];

type first = (typeof arr)[0]; // number

// 读取元组的长度
type length = (typeof arr)['length']; // 2

export {};
