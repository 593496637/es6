// 联合类型
type Id = number | string;
let id: Id = 123;
id = '123';

// 交叉类型
// type Type = 'string' & 'number';   没有意义

interface IName {
  name: string;
}

interface IAage {
  age: number;
}

type IPerson = IName & IAage;
const person: IPerson = {
  name: 'jack',
  age: 18,
};

export {};
