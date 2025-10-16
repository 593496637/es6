// pipe:从左到右组合两个函数（先执行第一个，再执行第二个）
function pipe(firstFunc, secondFunc) {
  return function (value) {
    return secondFunc(firstFunc(value))
  }
}

function doubleValue(num) {
  return num * 2;
}

function squareValue(num) {
  return num ** 2
}

// 组合：先平方再加倍
const squareThenDouble = pipe(squareValue, doubleValue)

// 测试
const input = 3;
const result = squareThenDouble(input);
console.log(`输入: ${input}, 结果: ${result}`); // 输入: 3, 结果: 18



/**
 * 简写版：const pipe=x=>(first,second)=>first(second(x))
 * 
 */