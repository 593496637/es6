// 函数声明
function sum(x: number, y: number): number {
  return x + y;
}


// 函数表达式
let mySum = function (x: number, y: number): number {
  return x + y
}

// 如果需要我们手动给 mySum2 添加类型
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
let mySum2: (x: number, y: number) => number = (x: number, y: number) => {
  return x + y;
}

mySum2(1, 2)


// 用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = (source: string, subString: string) => {
  return source.search(subString) !== -1
}


// 可选参数 
// 可选参数后面不允许再出现必需参数了
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}

// 默认参数
// TypeScript 会将添加了默认值的参数识别为可选参数
// 此时就不受「可选参数必须接在必需参数后面」的限制了
function buildName2(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName
}

// 剩余参数
// es6  ...rest
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a: any[] = [];
push(a, 1, 2, 3);


// 重载
// 缺点：不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}

// 这时，我们可以使用重载定义多个 reverse 的函数类型
function reverse2(x: number): number
function reverse2(x: string): string
function reverse2(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}

console.log(reverse2('abc'));



export default {}