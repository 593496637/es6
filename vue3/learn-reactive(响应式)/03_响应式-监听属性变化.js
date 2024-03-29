class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addReactiveFn(fn) {
    this.reactiveFns.push(fn)
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}


const obj = {
  name: 'zhangsan',
  age: 18
}


// 设置一个专门执行响应式函数的一个函数
const dep = new Depend()
// 依赖收集
function watchReactive(fn) {
  dep.addReactiveFn(fn)
  // 执行一次
  fn()
}

// 使用Object.defineProperty()监听属性变量
Object.keys(obj).forEach(key => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    set(newValue) {
      value = newValue
      dep.notify()
    },
    get() {
      return value
    }
  })
})




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
obj.age = 20