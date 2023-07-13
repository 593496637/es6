function foo(x: number, y?: number) {
  return x + (y || 0);
}

const result1 = foo(1, 2);
console.log(result1);

const result2 = foo(1);
console.log(result2);


export {};
