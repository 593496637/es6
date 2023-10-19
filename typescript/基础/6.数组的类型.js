// 「类型 + 方括号」表示法
let arr = [1, 2, 3, 4];
// 数组泛型表示数组
let arr2 = [1, 2, 3, 4];
let arr3 = [1, 2, 3, 4];
// 类数组
// arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口
// function sum() {
//   let args: number[] = arguments;
// }
// 在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性
function sum() {
    let args = arguments;
}
// 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection
function sum2() {
    let args = arguments;
}
// any在数组中的应用
let list = ['abc', 12, { a: 232 }];
