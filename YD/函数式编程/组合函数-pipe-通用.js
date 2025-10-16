// 通用的支持多个函数的pipe
const pipe = (...fns) => {
  // 返回一个新函数，接受初始输入值
  return function (initialValue) {
    // 使用reduce依次执行每个函数
    return fns.reduce((acc, currentFn) => {

      // 执行当前函数
      const nextValue = currentFn(acc)

      // 打印每一步结果（可选，方便理解）
      console.log(`执行 ${currentFn.name || '匿名函数'}(${acc}) => ${nextValue}`);

      // 把结果传递给下一个函数
      return nextValue
    }, initialValue)
  }
}

// 定义两个示例函数
function doubleValue(num) {
  return num * 2;
}

function squareValue(num) {
  return num ** 2;
}


// 通过pipe组合函数：先加倍，再平方
const doubleThenSquare = pipe(doubleValue, squareValue)

// 测试
const input = 3;
const result = doubleThenSquare(input);

console.log(`\n输入值: ${input}`);
console.log(`最终结果: ${result}`);


// 输出：
// 执行 doubleValue(3) => 6
// 执行 squareValue(6) => 36
// 最终结果: 36