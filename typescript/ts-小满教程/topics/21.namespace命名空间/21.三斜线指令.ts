// 三斜线指令: 用来声明文件之间的依赖关系
// 三斜线指令必须放在文件的最顶端

/// <reference path="index.ts" />
/// <reference path="index2.ts" />

// 引入声明文件
// 自动寻找node_modules/@types目录下的声明文件
/// <reference types="jquery" />

namespace A {
  export const c = 'c';
}

console.log(A.a);
console.log(A.b);
console.log(A.c);


