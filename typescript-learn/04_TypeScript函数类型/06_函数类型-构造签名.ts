// 构造签名
class Person {}

interface PersonConstructor {
  new (): Person;
}

function factory(fn: PersonConstructor) {
  return new fn();
}

factory(Person);

export {};
