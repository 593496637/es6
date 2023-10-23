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

// 两个基类
class Mammal {
  breathe(): string {
    return 'I am alive!';
  }
}

class WingedAnimal {
  fly(): string {
    return 'I can fly!';
  }
}

// 混入类 子类
class Bat implements Mammal, WingedAnimal {
  breathe: () => string;
  fly: () => string;
}

// 使用以下函数，将基类的方法混入到子类中
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    // 将父类的原型对象中的属性和方法复制到子类的原型对象中
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

applyMixins(Bat, [Mammal, WingedAnimal]);

// 示例
let bat = new Bat();
const res1 = bat.breathe();
const res2 = bat.fly();
console.log(res1);
console.log(res2)
