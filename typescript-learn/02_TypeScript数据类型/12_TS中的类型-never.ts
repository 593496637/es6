// 实际开发中，函数可能永远执行不完，这时候可以使用never类型
// never类型是任何类型的子类型，也可以赋值给任何类型，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
// 即使any也不可以赋值给never
// 返回never的函数必须存在无法达到的终点
// function fn(): never {
//   throw new Error('报错了');
// }
// fn();

function parseLyric() {
  return [];
}

parseLyric();

// never应用场景
// 1.死循环
// function foo(): never {
//   while (true) {}
// }

// 2.代码中存在无法到达的终点
// function foo2(): never {
//   throw new Error('报错了');
// }

// 3.类型保护
// function isString(str: string | number): str is string {
//   return typeof str === 'string';
// }

// 封装框架/工具库的时候可以使用never类型
// 其他时候在扩展工具的时候，对于一些没有处理的case，可以直接报错
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case 'string':
      console.log('string');
      break;
    case 'number':
      console.log('number');
      break;
    case 'boolean':
      console.log('boolean');
      break;
    // 假如有一天，我们需要处理symbol类型，但是我们忘记了，这时候就可以使用never类型
    default:
      const check: never = message;
      break;
  }
}
handleMessage('hello world');
handleMessage(123);
handleMessage(true);

export {};
