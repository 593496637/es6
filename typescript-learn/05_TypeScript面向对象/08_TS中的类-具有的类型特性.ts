class Person {}

/**
 * 类的作用：
 * 1.可以创建类对应的示例对象
 * 2.类本身可以作为这个类实例对象的类型
 * 3.类也可以当作一个有构造签名的函数
 */

const person: Person = new Person();

function factory(ctor: new () => void) {}

factory(Person);

export {};
