// 语法糖
// 参数属性：参数属性可以方便的让我们在一个地方定义并初始化一个成员
// 可以免去我们定义一个成员变量，然后在构造函数中给这个成员变量赋值的步骤

class Person {
  constructor(
    public _name: string,
    private _age: number,
    readonly _height: number
  ) {}

  running() {
    console.log(this._age + '岁的' + this._name + '在跑步');
  }
}

const person = new Person('jack', 18, 100);
console.log(person._height);


export {};