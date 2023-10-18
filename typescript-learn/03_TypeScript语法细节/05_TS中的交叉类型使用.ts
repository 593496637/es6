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

// 写一个工具函数，用来转换true和false
const toBoolean = (value: number | boolean): boolean => {
  return !!value;
};
const result = toBoolean(1);
const result2 = toBoolean(true);
console.log(result, result2);

export {};
