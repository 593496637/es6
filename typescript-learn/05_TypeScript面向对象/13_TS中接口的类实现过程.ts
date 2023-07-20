interface IPerson {
  name: string;
  age: number;
  eating(): void;
  running: () => void;
}

// 类实现接口
class Person implements IPerson {
  name: string;
  age: number;
  eating(): void {
    console.log(11);
  }
  running: () => void;
}

export {};
