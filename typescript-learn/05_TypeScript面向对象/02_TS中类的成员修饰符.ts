class Person {
  private name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public eating() {
    console.log(this.name, this.age);
  }
}

const person = new Person('jack', 18);
person.eating();

// name属性是私有的，外部无法访问
// console.log(person.name);

export {};
