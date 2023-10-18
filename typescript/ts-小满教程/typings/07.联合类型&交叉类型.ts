// 1.联合类型
const phone: string | number = 123456789;

// 类型转换
const fn = function (type: number | string): boolean {
  return !!type;
};

const res = fn(phone);

// 2.交叉类型
interface IName {
  name: string;
}

interface IAge {
  age: number;
}

type INameAge = IName & IAge;

const obj: INameAge = {
  name: 'tom',
  age: 18,
};
console.log(obj)

export {};
