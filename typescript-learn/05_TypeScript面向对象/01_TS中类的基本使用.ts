class Person {
  // 成员属性：类中声明的变量
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name);
  }

  running() {
    console.log(this.age);
  }
}

const person = new Person('jack', 18);

console.log(person.name);

export {};
