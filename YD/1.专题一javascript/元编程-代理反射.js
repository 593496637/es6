// vue3源码核心代码
// 使用反射、代理实现双向绑定
// Proxy 是拦截默认行为，Reflect 是恢复默认行。
// 被 Proxy 拦截、过滤了一些默认行为之后，可以使用 Reflect 恢复未被拦截的默认行为。
// 通常它们两个会结合在一起使用。

function Tree() {
  return new Proxy({}, handler)
}
const handler = {
  // 目标、键、接受者
  get(target, key, receiver) {
    if (!(key in target)) {
      target[key] = Tree()
    }
    // 进入死循环，代理监听到被调用了
    // return target[key]
    // Reflect.get 只做取值操作，不做其他操作
    return Reflect.get(target, key, receiver)
  }
}

let tree = Tree()
tree.test.student.a = '🥔'
console.log(tree);

// 使用node运行上面代码后得到
// { test: { student: { a: '🥔' } } }


// vue2
// 1：递归遍历所有的对象的属性，这样如果我们数据层级比较深的话，是一件很耗费性能的事情
// 2：只能应用在对象上，不能用于数组
// 3：只能够监听定义时的属性，不能监听新加的属性，这也就是为什么在vue中要使用Vue.set的原因，删除也是同理
// vue2双向绑定原理
// Object.defineProperty(new Vue,{
//   ...data
// })
