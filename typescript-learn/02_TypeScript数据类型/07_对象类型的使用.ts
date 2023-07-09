// 1.对象类型的回顾
// const person: {
//   name: string;
//   age: number;
// } = {
//   name: 'Tom',
//   age: 18,
// };

// 2.对象类型和函数类型结合使用
// ObjType是一个对象类型的别名，这个对象类型有两个属性，name属性是string类型，age属性是number类型
type ObjType = {
  name: string;
  age: number;
  height?: number; // 可选属性
};

function fn1(obj: ObjType) {
  console.log(obj.name);
  console.log(obj.age);
}

fn1({ name: 'Tom', age: 18 });

export {};
