// 可以从一个接口中继承另外一个接口，从而获得接口中的属性和方法
// 语法：interface 子接口名 extends 父接口名 {}

interface IAnimal {
  name: string;
}

interface IPerson extends IAnimal {
  age: number;
  height: number;
}

const person: IPerson = {
  name: 'jack',
  age: 18,
  height: 1.88,
};

export {};
