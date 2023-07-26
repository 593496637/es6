// 可以将类型导入
// 使用 ES Module 语法导入
import { sum } from './utils/math';
// 如果导入的是类型，那么可以使用 type 关键字
// 作用：这些可以让非ts编译器，比如babel、swc、esbuild等知道什么样的导入可以被安全移除
// 第一种方式
// import { type IPerson, type Name } from './utils/type';
// 第二种方式
import type { IPerson, Name } from './utils/type';

// 导入命名空间
import { A, B } from './utils/format';

const person: IPerson = {
  name: 'jack',
  age: 18,
};

// 使用类型
const name: Name = 'jack';
sum(1, 2);

// 使用命名空间
A.sum(1, 2);
B.sum(1, 2);

export {};
