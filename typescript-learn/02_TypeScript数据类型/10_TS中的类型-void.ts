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

export {};
