// 1.区别一：type类型使用范围更广，接口类型只能声明对象类型

type Number = number;
type Name = string;

// 2.区别二：在声明对象时，interface可以声明多个同名的类型，type不可以
// 2.1 type不可以声明多个同名的类型

interface IPoint {
  x: number;
  y: number;
}

interface IPoint {
  z?: number;
}

const point: IPoint = { x: 1, y: 2 };

console.log(point);

// 3.interface可以继承，type不可以

interface IName {
  name: string;
}

interface IAge {
  age: number;
}

interface IPerson extends IName, IAge {
  height: number;
}

const person: IPerson = { name: 'jack', age: 18, height: 1.88 };

console.log(person);


// 4.interface可以被类实现，type不可以
// class Person implements IPerson {
//   name: string;
//   age: number;
//   height: number;
// }

// 总结：如果需要声明对象类型，优先使用interface，如果需要声明其他类型，优先使用type

export {};
