class Person {
  readonly name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const person = new Person('jack', 18);
// 无法为“name”赋值，因为它是只读属性
// person.name = 'rose';

person.age = 20;

export {};
