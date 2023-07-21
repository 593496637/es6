interface IPerson {
  name: string;
  age: number;
  eating(): void;
  running: () => void;
}

interface IAnimal {
  height: number;
}

// 不使用类实现接口的方式
const person: IPerson = {
  name: 'jack',
  age: 18,
  eating() {},
  running() {},
};

// 使用类实现接口的方式
// 可以实现多个接口
class Person implements IPerson, IAnimal {
  constructor(public name: string, public age: number, public height: number) {}

  eating(): void {
    console.log('eating');
  }
  running(): void {
    console.log('running');
  }
}

const person1 = new Person('jack', 18, 1.88);
const person2 = new Person('rose', 20, 1.66);

console.log(person1.name, person1.age, person1.height);
person1.eating();
person1.running();

console.log(person2.name, person2.age, person2.height);
person2.eating();
person2.running();

export {};
