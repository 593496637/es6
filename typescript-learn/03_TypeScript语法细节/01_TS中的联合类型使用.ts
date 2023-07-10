//1. 联合类型的基本使用
// let foo: number | string = 'abc';
// foo = 123;

// // 使用的时候药特别小心
// if(typeof foo === 'string'){
//   // 这里foo的类型是string
//   console.log(foo.length);
// }

// 2.举例,缩小范围
function printId(id: number | string) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

printId(123);

export {};
