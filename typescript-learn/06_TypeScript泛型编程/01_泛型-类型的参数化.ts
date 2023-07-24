// 泛型：类型的参数化
function bar<Type>(arg: Type): Type {
  return arg;
}

// 完整写法
const result1 = bar<string>('hello');
const result2 = bar<number>(123);
const result3 = bar<{ name: string }>({ name: 'why' });

// 简化写法
const result4 = bar('hello');
const result5 = bar(123);
const result6 = bar({ name: 'why' });

// 备注：简化写法比完整写法更具体

// let接收的是string类型，const接收的是'hello'类型
let result7: string = bar('hello');


export {};