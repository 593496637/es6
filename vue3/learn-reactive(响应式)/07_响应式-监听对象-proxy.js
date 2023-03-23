
class Depend {
  constructor() {
    this.reactiveFns = new Set() //Set的成员是唯一的，没有重复的值
  }

  addReactiveFn(fn) {
    fn && this.reactiveFns.add(fn)
  }

  depend() {
    // activeReactiveFn是自由变量，指的是在函数内部使用的，但是没有在函数内部定义的变量
    if (activeReactiveFn) {
      this.addReactiveFn(activeReactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
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


function reactive(obj) {
  // 使用Proxy监听属性变量
  return new Proxy(obj, {
    set(target, key, value, receiver) {
      // 设置值
      // target[key] = value
      Reflect.set(target, key, value, receiver)
      // 通知依赖收集器
      const dep = getDepend(target, key)
      dep.notify()
    },
    get(target, key, receiver) {
      const dep = getDepend(target, key)
      dep.depend()
      // return target[key]
      return Reflect.get(target, key, receiver)
    }
  })
}


// 测试============================

const obj = reactive({
  name: 'zhangsan',
  age: 18,
  height: 180,
})


const user = reactive({
  name: 'zhangsan',
  age: 18,
})




watchReactive(function foo() {
  console.log('foo', obj.name)
  console.log('foo', obj.age);
  console.log('--------');
})

watchReactive(function bar() {
  console.log('bar', obj.age);
  console.log('----------------');
})

watchReactive(function baz() {
  console.log('baz', obj.height)
  console.log('baz', obj.height)
  console.log('--------');
})


watchReactive(function foo() {
  console.log('user', user.name)
  console.log('user', user.age);
  console.log('--------');
})


// 修改数据
console.log('########修改数据########');
obj.name = 'lisi'
// obj.age = 20
obj.height = 190
// obj.height = 200

user.name = 'lisi'