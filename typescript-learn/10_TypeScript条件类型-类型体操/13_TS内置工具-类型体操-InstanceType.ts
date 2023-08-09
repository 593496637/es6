{
  // InstanceType: 获取构造函数类型的实例类型

  class Person {}
  class Dog {}

  const p1 = new Person();

  // 例子1
  type PersonType = InstanceType<typeof Person>;
  let p2: PersonType = new Person();

  // 例子2
  function fn1<T extends new (...args: any[]) => any>(
    ctor: T
  ): InstanceType<T> {
    return new ctor();
  }

  const p3 = fn1(Person);
  const d1 = fn1(Dog);

  // infer: 条件类型的推断
  // 实现一个InstanceType
  type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (
    ...args: any[]
  ) => infer R
    ? R
    : any;

  type PersonType2 = MyInstanceType<typeof Person>;
  type DogType2 = MyInstanceType<typeof Dog>;
}
