// void类型：typescript中的void表示没有任何类型，一般用于定义方法的时候方法没有返回值。
// 如果返回值是void，那么可以省略不写。
// 如果返回值是void, 我们也可以返回null或者undefined类型。
// 如果返回值不是void，那么必须返回对应的类型。
// 注意：定义变量时不能将变量定义为void类型，因为没有意义。

function sayHello(): void {
  console.log('Hello World');
}

// 应用场景
type LyricInfo = {
  time: string;
  lyric: string;
};
function parseLyric(lyric: string): LyricInfo[] {
  const lyricArr: LyricInfo[] = [];

  return lyricArr;
}

// 函数类型
type FnType = () => void;
const foo: FnType = () => {
  console.log('foo');
};

// 举例：涉及到函数的类型问题，后面还会细讲
// 1.定义要求传入的函数的类型
type FnType2 = (...args: any[]) => void;

// 2.定义一个函数，要求传入的参数是一个函数
function foo2(fn: FnType2) {
  setTimeout(() => {
    fn('he', 20);
  }, 1000);
}

// 3.调用foo2函数，传入一个函数
foo2((name, age) => {
  console.log(name, age);
});

export {};
