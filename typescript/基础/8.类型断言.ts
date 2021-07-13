interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
// 值 as 类型
// 此时可以使用类型断言，将 animal 断言成 Fish
// 类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false
}


interface Animal {
  aa: number
}