// 定义接口

interface IPerson {
  name: string;
  age?: number;
  friend?: {
    name: string;
  };
}

const info: IPerson = {
  name: 'why',
  age: 18,
};

// 可选链
console.log(info?.friend?.name);
// 属性赋值
// 解决方式1：类型缩小
if (info.friend) {
  info.friend.name = 'kobe';
}

// 解决方式2：非空类型断言(有点危险，只有确保friend一定有值的时候才可以使用)
// ts不检测，直接赋值
info.friend!.name = 'kobe';


export {};
