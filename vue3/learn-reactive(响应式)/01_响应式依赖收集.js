const obj = {
  name: 'zhangsan',
  age: 18
}

// 设置一个专门执行响应式函数的一个函数
const reactiveFns = []
function watchReactive(fn) {
  reactiveFns.push(fn)
  // 执行一次
  fn()
}

watchReactive(function foo() {
  console.log('foo', obj.name)
  console.log('foo', obj.age);
  console.log('--------');
})

watchReactive(function bar() {
  console.log('bar', obj.name + '111')
  console.log('bar', obj.age + 1);
  console.log('--------');
})

// 修改数据
console.log('########修改数据########');
obj.name = 'lisi'
reactiveFns.forEach(fn => fn())