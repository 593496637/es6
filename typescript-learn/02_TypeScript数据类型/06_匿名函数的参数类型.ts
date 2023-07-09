const names = ['Tom', 'Jerry', 'Spike'];

// 匿名函数是否需要添加参数类型注解？最好不要添加，因为TS会自动推导出参数类型
names.forEach((item, index, arr) => {
  console.log(item);
  console.log(index);
  console.log(arr);
});

export {};
