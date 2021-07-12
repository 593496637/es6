// 我们就约束了 tom 的形状必须和接口 Person 一致
interface Person {
  name: string;
  age: number;
}
let tom: Person = {
  name: 'Tom',
  age: 19
}


// 有时我们希望不要完全匹配一个形状，那么可以用可选属性
interface Person2 {
  name: string;
  age?: number;
}
let tom2: Person2 = {
  name: 'Tom'
}

// 任意属性
interface Person3 {
  name: string;
  age?: number;
  [propName: string]: any;
}
let tom3: Person3 = {
  name: 'Tom',
  gender: 'male'
}

// 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
interface Person4 {
  name: string;
  age?: number;
  [propName: string]: string | number;
}
let tom4: Person4 = {
  name: 'Tom',
  gender: 'male'
}


// 只读属性
interface Person5 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: string | number;
}
let tom5: Person5 = {
  id: 1,
  name: 'Tom',
  age: 19,
  gender: 'male'
}
// tom5.id = 3; 报错
// 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候



export default {}