// public: 公共的，类的内部和外部都可以访问
// private: 私有的，类的内部可以访问，外部无法访问，子类中也无法访问
// protected: 受保护的，类的内部可以访问，外部无法访问，但是在子类中可以访问

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


// 子类中是否可以访问protected修饰的属性
class Student extends Person{
  constructor(name: string, age: number) {
    super(name, age);
  }

  public sayHello() {
    // 属性“name”为私有属性，只能在类“Person”中访问
    // console.log(this.name);
    // 属性“age”受保护，只能在类“Person”及其子类中访问
    console.log(this.age);
  }
}

const student = new Student('rose', 20);

// name属性是私有的，外部无法访问
// student.name
// age属性是受保护的，外部无法访问
// student.age


export {};
