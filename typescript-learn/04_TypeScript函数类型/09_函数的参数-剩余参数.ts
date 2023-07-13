function foo(...arg: (number | string)[]) {
  console.log(arg);
}

foo(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
foo('a', 'b', 12);
export {};
