const name: 'why' = 'why';
let age: 18 = 18;

// 将多个字面量类型联合起来
type Direction = 'left' | 'right' | 'top' | 'bottom';
// 只能赋值这四个值
const dir: Direction = 'bottom';

// 例子：封装请求函数
type MethodType = 'get' | 'post';
function request(url: string, method: MethodType) {}
request('http://www.baidu.com', 'post');

// 细节
// const info = {
//   url: 'http://www.baidu.com',
//   method: 'get',
// };

// 错误的写法：因为info.method是string类型，而不是MethodType类型
// request(info.url, info.method);

// 正确的写法一
// request(info.url, info.method as MethodType);

// 正确的写法二
// as const: 将info中的所有属性都变成字面量类型
const info = {
  url: 'http://www.baidu.com',
  method: 'get',
} as const;
// 此时info.method的类型就是'get'，而不是string
request(info.url, info.method);

export {};
