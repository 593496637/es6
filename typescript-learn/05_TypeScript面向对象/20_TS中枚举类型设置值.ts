enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
}

// 位运算符，1 << 0 = 1，1 << 1 = 2，1 << 2 = 4
// 1 << 0 = 0001
// 为了方便计算
enum Operation {
  Read = 1 << 0,
  Write = 1 << 1,
  Execute = 1 << 2,
}

export {};