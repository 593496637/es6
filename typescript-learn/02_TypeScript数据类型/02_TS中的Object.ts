// 基本不用，因为没有什么用，没有什么限制，不如直接用any
let person: object = {
  name: 'Tom',
  age: 18,
};
// console.log(person.name); // 报错，因为person是object类型，object类型没有name属性


// 1. object类型表示一个对象，但是对象中有哪些属性，属性的类型是什么，TS中并没有做限制
// 2. 如果我们希望对象中的属性是固定的，属性的类型也是固定的，那么我们可以使用对象类型注解

// 对象类型注解
let info={
  name:'Tom',
  age:18,
}

console.log(info.name);

export {};
