function sayHello(person: string) {
  if (typeof person === 'string') {
    return 'Hello, ' + person;
  } else {
    throw new Error('person is not a string');
  }
}
const enum a {
  b = 1
};
const user = 'Tom';
console.log(sayHello(user));