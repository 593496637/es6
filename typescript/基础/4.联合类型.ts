// 取值可以为多种类型中的一种

let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven'
myFavoriteNumber = 7


// 共有属性
function getString(something: number | string): string {
  return something.toString()
}

// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
let myFavoriteNumber2: string | number
myFavoriteNumber2 = 'seven'
console.log(myFavoriteNumber2.length);
myFavoriteNumber2 = 7
// console.log(myFavoriteNumber2.length);  //编译时报错


export default {}