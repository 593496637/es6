//1. 对象的混入
interface A {
  a: string;
}

interface B {
  b: string;
}

let obj: A = {
  a: 'a',
};

let obj2: B = {
  b: 'b',
};

let obj3 = Object.assign(obj, obj2);

// 2. 类的混入
class Class1 {
  a: string;
  changeA(value: string): void {
    this.a = value;
  }
}

class Class2<T> {
  b: T;
  changeB(): T {
    return this.b;
  }
}
