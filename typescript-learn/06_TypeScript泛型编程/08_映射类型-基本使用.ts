// 映射类型

interface IPerson {
  name: string;
  age: number;
}

// 使用映射类型拷贝IPerson的所有属性
// 映射类型使用type关键字定义
// 映射类型的语法：{ [Property in keyof Type]: Type[Property] }
type IPartialPerson<Type> = {
  [Property in keyof Type]: Type[Property];
};

type NewPerson = IPartialPerson<IPerson>;

const person: NewPerson = {
  name: 'why',
  age: 18,
};

console.log(person);

export {};
