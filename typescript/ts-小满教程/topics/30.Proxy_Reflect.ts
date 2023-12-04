// proxy 代理13个方法
// Reflect 13个方法 参数和返回值和proxy一致
// Reflect 用于操作对象的方法
// Reflect 用于替换掉Object上的方法

/**
 * proxy
 * @param target 目标对象
 * @param handler 代理对象
 * @returns 代理对象
 */

/**
let person = { name: '小红', age: 18 };
// proxy 支持对象、数组、函数、set、map
person.name; // 读取属性
person.name = '小明'; // 修改属性

let personProxy = new Proxy(person, {
  // 取值
  get() {},

  // 修改值:目标对象、属性、值、代理对象
  set(target, key, value, receiver) {
    return true;
  },

  // 拦截函数调用
  apply() {},

  // 拦截in操作符:name in person
  has(target, key) {
    return true;
  },

  // 拦截for...in循环
  ownKeys(target) {
    return Object.keys(target);
  },

  // 拦截new
  construct() {
    return {};
  },

  // 拦截delete
  deleteProperty() {
    return true;
  },
});
*/

let person = { name: '小红', age: 12 };
let personProxy = new Proxy(person, {
  get(target, key, receiver) {
    if (target.age < 18) {
      return '未成年';
    } else {
      return Reflect.get(target, key, receiver);
    }
  },
});

console.log(personProxy.age); // 未成年

// 取值方式
console.log(person.name); // 小红
console.log(Reflect.get(person, 'name', person)); // 小红

// 修改值方式
person.name = '小明';
console.log(person); // 小明
Reflect.set(person, 'name', '小西', person);
console.log(person); // 小红
