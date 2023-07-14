// 鸭子类型的核心思想是：如果它走起路来像鸭子，叫起来也是鸭子，那么它就是鸭子
// 当我们只关心对象的行为时，我们不关心对象是什么类型，只关心对象有没有实现我们的方法或者属性
// TypeScript中的类型监测就是鸭子类型的一种体现

class Person {
  constructor(public name: string) {}
  running() {}
}

class Student {
  constructor(public name: string) {}
  running() {}
}

// 定义一个函数，参数是Person类型
function getName(person: Person) {
  console.log(person.name);
}

getName(new Person('小明'));

// 传入的参数是Student类型，但是也可以正常执行,因为Student类中也有name属性
getName(new Student('小红'));

const person: Person = new Student('小红');
