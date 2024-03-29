
// 一：dep对象的数据解构的管理
// 1. 一个对象对应一个dep对象
// 2. 同一个对象的不同属性对应不同的dep对象
// 3. 同一个对象的同一个属性对应同一个dep对象
// 4. 一个dep对象对应多个watcher对象
// 5. 一个watcher对象对应一个dep对象
// 6. 多个对象的map对象，会被存储在一个WeakMap中

// 二：依赖收集：当执行get函数时，自动将当前函数添加到依赖收集器中


class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addReactiveFn(fn) {
    fn && this.reactiveFns.push(fn)
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}


const obj = {
  name: 'zhangsan',
  age: 18
}


// 依赖收集
// 定义一个全局变量，用来存储当前正在执行的函数
let activeReactiveFn = null
function watchReactive(fn) {
  // 将当前执行的函数存储到全局变量中
  activeReactiveFn = fn
  // 执行一次
  fn()
  // 执行完毕后，清空全局变量
  activeReactiveFn = null
}

// 定义一个WeakMap，用来存储每个对象的依赖收集器
const depMap = new WeakMap() //WeakMap的key只能是对象，而且是弱引用，不会阻止垃圾回收机制
function getDepend(obj, key) {
  // 获取对象的依赖收集器
  let map = depMap.get(obj)
  if (!map) {
    map = new Map()  //Map的key可以是任意值,包括对象
    depMap.set(obj, map)
  }

  // 根据key，找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }
  return dep
}


// 使用Object.defineProperty()监听属性变量
Object.keys(obj).forEach(key => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    set(newValue) {
      value = newValue
      // 设置新值时，通知依赖收集器
      const dep = getDepend(obj, key)
      dep.notify()
    },
    get() {
      // 获取当前属性的依赖收集器
      const dep = getDepend(obj, key)
      // 将当前函数添加到依赖收集器中
      dep.addReactiveFn(activeReactiveFn)
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
  console.log('bar', obj.name)
  console.log('bar', obj.age);
  console.log('----------------');
})

// 修改数据
console.log('########修改数据########');
obj.name = 'lisi'
obj.age = 20
obj.age = 23