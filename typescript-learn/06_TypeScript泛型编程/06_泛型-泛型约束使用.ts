// 有一个函数，我需要传入参数，参数必须有length属性，
// 而且返回值不能丢失类型，这个时候就可以使用泛型约束

// 1.这个情况下，没有必要使用泛型
interface ILength {
  length: number;
}

function getLength(arg: ILength) {
  return arg.length;
}

const result1 = getLength('hello');
const result2 = getLength([1, 2, 3]);
const result3 = getLength({ length: 10 });

// 2.获取传入的内容，并且要求传入的内容有length属性
function getInfo<Type extends ILength>(arg: Type): Type {
  return arg;
}

const result4 = getInfo('hello');
const result5 = getInfo([1, 2, 3]);
const result6 = getInfo({ length: 10 });

// number类型没有length属性，所以报错
// const result7 = getInfo(10); // 报错

export {};
