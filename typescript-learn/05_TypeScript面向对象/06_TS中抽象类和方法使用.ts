// abstract抽象类和抽象方法
/**
 * 解释：
  多个子类中可能会有共同的行为，我们希望把共同的行为放到父类里面，但是父类里又不想对这个行为进行具体的实现，
  我们就可以把这个行为定义成抽象的方法，当做抽象类来使用，抽象类是不能被实例化的，只能被继承，
  抽象类中的抽象方法必须在子类中被实现，抽象类和抽象方法用来定义标准。
  这样就可以写出来一些通用的函数，通用函数要求接受参数的话，可以写上抽象类作为参数的类型，这样就可以限制传入的参数类型了。
  语法：abstract class 类名 { abstract 方法名():void }
 */

// 1.抽象类和抽象方法的定义
abstract class Animal {
  // 抽象类可以包含构造函数
  constructor(public name: string) {}

  // 抽象类中的抽象方法不能有具体的实现，只能定义在抽象类中
  abstract eat(): void;

  // 普通方法
  sleep() {
    console.log(this.name + '正在睡觉');
  }
}


// 2.抽象类的子类必须实现抽象类中的抽象方法
// 定义猫类继承Animal抽象类
class Cat extends Animal {
  // 实现抽象方法eat
  eat() {
    console.log(this.name + '吃鱼');
  }
}


// 定义狗类继承Animal抽象类
class Dog extends Animal {
  // 实现抽象方法eat
  eat() {
    console.log(this.name + '吃肉');
  }
}

function showEat(animal:Animal) {
  animal.eat();
}

const cat=new Cat('aaa')
console.log(cat.name);

showEat(new Cat('小猫'))
showEat(new Dog('小狗'))



export {};
