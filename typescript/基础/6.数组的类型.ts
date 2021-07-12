// 「类型 + 方括号」表示法
let arr: number[] = [1, 2, 3, 4]

// 数组泛型表示数组
let arr2: Array<number> = [1, 2, 3, 4]

// 接口表示数组 （一般不用）
// NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
interface NumberArray {
  [index: number]: number;
}
let arr3: NumberArray = [1, 2, 3, 4]


// 类数组
function sum() {
  let args: number[] = arguments;
}