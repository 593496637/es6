import { A } from './20.namespace命名空间1';

namespace B {
  export const a = 1;
}

// 简化命名空间的使用
import AA = A.C;

console.log(AA.a);
