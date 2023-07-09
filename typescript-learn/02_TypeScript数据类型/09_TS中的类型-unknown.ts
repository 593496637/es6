// unknown类型：表示未知类型，比any类型更加严格，因为unknown类型变量不能直接赋值给其他变量
let name: unknown = 'Tom';

name = 11;

console.log(name);
// console.log(name.toUpperCase()); // 报错，因为unknown类型不能调用toUpperCase方法

// 但是可以使用类型断言，告诉解析器name是string类型
// 要求必须进行类型的校验(缩小),才能调用toUpperCase方法
if (typeof name === 'string') {
  console.log(name.toUpperCase());
}

export {};
