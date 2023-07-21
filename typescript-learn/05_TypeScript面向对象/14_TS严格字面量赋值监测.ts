interface IPerson {
  name: string;
  age: number;
}

// 1.奇怪的现象一
const obj = {
  name: 'jack',
  age: 18,
  // 多了个height属性
  // 为什么不报错？
  height: 1.88,
};

const person: IPerson = obj;

// 2.奇怪的现象二
function printPerson(person: IPerson) {}

// 这个时候，height属性就会报错
// printPerson({ name: 'jack', age: 18, height: 1.88 });

// 这样就不会报错
printPerson(obj);



// 现象解释：
// 第一次创建的对象字面量，称之为fresh（新鲜的）
// 对于新鲜的字面量，会进行严格的类型检测，必须完全满足类型的要求（不能有多余的属性）
// 当第一次声明obj时，obj是fresh的，当把obj赋值给person时，obj就不是fresh的了


export {};
