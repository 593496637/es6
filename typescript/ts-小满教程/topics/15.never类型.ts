// never 类型 :永远不会有值的类型

// 既是string类型，又是number类型，推断出来的类型是never
type A = string & number;

// 可以定义为void类型，因为函数没有返回值
// 但是这个函数一执行，就会报错，所以这个函数永远不会执行完，所以是never类型
function xm(): never {
  throw new Error('error');
}

xm();

// 死循环，永远不会结束，所以是never类型

// never在联合类型中会被排除掉
type B = string | number | never;

// never类型的应用场景
// 假如work不存在，那么就会报错,never就会起作用,起到提示作用
type hobbies = 'sleep' | 'eat' | 'play' | 'work';
function kun(value: hobbies) {
  switch (value) {
    case 'sleep':
      break;
    case 'eat':
      break;
    case 'play':
      break;
    case 'work':
      break;
    default:
      const foo: never = value;
      break;
  }
}

export {};
