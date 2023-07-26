import { sum } from './utils/math';

const message: string = 'Hello World';

console.log(message.length, message);
console.log(sum(1, 2));

// lib.dom.d.ts
const El = document.createElement('h1');
El.innerText = message;

document.body.appendChild(El);

// lib.es2015.promise.d.ts
const promise = new Promise((resolve, reject) => {
  resolve(123);
});

promise.then((res) => {
  console.log(res);
})

export {};
