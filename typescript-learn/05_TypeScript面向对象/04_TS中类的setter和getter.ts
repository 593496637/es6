class Person {
  // 私有属性：属性前面添加下划线
  private _name: string;
  private _age: number = 18;

  constructor(name: string) {
    this._name = name;
  }

  running() {
    console.log(this._name + '在跑步');
  }

  // getter方法
  get getName() {
    return this._name;
  }

  // setter方法
  set setName(name: string) {
    this._name = name;
  }

  get getAge() {
    return this._age;
  }

  set setAge(age: number) {
    // 符合年龄的条件
    if (age > 0 && age < 120) {
      this._age = age;
    }
  }
}

// 使用getter和setter方法
const person = new Person('jack');
console.log(person.getName);
person.setName = 'rose';
console.log(person.getName);

console.log(person.getAge);
// 赋值不成功，因为年龄不符合条件
person.setAge = 200;
console.log(person.getAge);


// getter和setter的意义： 1.可以加一些逻辑判断 2.可以对属性进行加密

export {};
