const names = ['a', 'b', 'c'];


//了解即可： 基于上下文类型推导的函数中的返回值是void类型，并且不强制要求不能返回任何东西
names.forEach((item, index, arr) => {
  console.log(item);
  // 没有意义，但是可以返回任意值
  return 1111;
});

export {};
