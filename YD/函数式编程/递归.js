// 递归计算阶乘
const factorial = (num) => {
  if (num === 0) return 1

  const subResult = factorial(num - 1)
  const result = num * subResult
  return result
}


// 测试
const inputNumber = 5;
const output = factorial(inputNumber);

console.log(`输入值: ${inputNumber}`);
console.log(`阶乘结果: ${output}`); // 输出：120