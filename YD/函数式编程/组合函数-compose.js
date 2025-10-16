// 组合两个函数：先执行outerFunc,再执行innerFunc
const compose = (outerFunc, innerFunc) => {
  return function (value) {
    return outerFunc(innerFunc(value))
  }
}

// 加倍
const doubleValue = (num) => {
  return num * 2;
}

// 平方
const squareValue = (num) => {
  return num ** 2
}


// 组合：先加倍再平方
const doubleThenSquare = compose(squareValue, doubleValue)

// 测试
const input = 3;
const result = doubleThenSquare(input)
console.log(`输入: ${input}, 结果: ${result}`); // 输入: 3, 结果: 36

