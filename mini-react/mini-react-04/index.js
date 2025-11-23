// ==========================================
// 1. 创造蓝图 (createElement)
// ==========================================

/**
 * 这个函数的目标是把标签变成对象
 * @param {string} type 标签类型，比如 "div", "h1"
 * @param {object} props 属性，比如 { id: "app" }
 * @param {...any} children 子元素，比如 "Hello" 或其他标签
 */

function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,  // 把id="app"这种属性放进去
      // 这一步是为了处理children
      // 如果孩子是字符串，就把它变成一个文本节点对象
      // 如果孩子本身就是一个对象（标签对象），就直接放进去
      children: children.map(child => {
        return typeof child === "object" ? child : createTextElement(child)
      })
    }
  }
}

// 专门处理文本节点的函数
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',  // 我们自己定义的文本节点类型，代表这是一个文本节点
    props: {
      nodeValue: text,
      children: [] // 文本节点没有子节点
    }
  }
}

// ==========================================
// 2. 施工队 (render)
// ==========================================

// 下一个工作单元（Fiber 节点）
// 以前是系统自动递归，现在我们要自己记在一个小本本上
let nextUnitOfWork = null;
let wipRoot = null // 新增：正在构建的根节点 (Work In Progress Root)
let currentRoot = null // 新增：记录上一次提交的“旧根节点”
let deletions = null   // 新增：记录需要被删除的节点（因为新树里没有它们，所以要单独记下来）

function render(element, container) {
  // 设置第一个任务：Root Fiber（根任务节点）
  wipRoot = {
    dom: container, // 这个任务对应的真实DOM节点
    props: {
      children: [element] // 它的孩子是谁（还没变成Fiber，现在还是虚拟DOM）
    },
    alternate: currentRoot, // 🔗 关联上一次的根节点
  }
  deletions = [] // 每次重新渲染，清空删除清单
  nextUnitOfWork = wipRoot // 下一个任务就是这个根节点
}

// 3.监工循环（The Loop）
// 这是一个会一直运行的循环
function workLoop(deadline) {
  // shouldYield表示我们是否该暂停工作，让浏览器去做它自己的事(比如浏览器要处理用户点击了)
  let shouldYield = false
  // 当我们还有任务要做(nextUnitOfWork)，并且浏览器没有要求我们暂停(shouldYield), 我们就继续工作
  while (nextUnitOfWork && !shouldYield) {
    // 干活！并找出下一个任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 看看现在的时间是否已经超出浏览器给我们的时间片了
    shouldYield = deadline.timeRemaining() < 1
  }

  // 新增：如果活儿干完了，并且有一棵待提交的树，我们就提交它！
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  // 如果还有任务没做完，我们就请求浏览器在下一次空闲时继续调用workLoop
  requestIdleCallback(workLoop)
}

// 启动监工循环
requestIdleCallback(workLoop)


// 4. Fiber链表
// 以前我们是递归创建DOM节点，现在我们要用链表的方式来创建
// （1）给当前Fiber创建DOM节点
// （2）为当前Fiber创建子Fiber，并连接成链表
// （3）返回下一个要处理的Fiber
function performUnitOfWork(fiber) {
  // --- 第一步：创建真实 DOM ---
  // 如果这个 Fiber 还没有对应的真实 DOM，我们就创建一个
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  // --- 第二步：为孩子建立 Fiber 关系 (把数组变成链表) ---
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null

  // 遍历所有的孩子（虚拟 DOM）
  // 原来的 while 循环被抽离成了下面这个函数：
  reconcileChildren(fiber, elements)

  // --- 第三步：找下一个干活的人 (遍历顺序) ---
  // 1. 如果有孩子，先干孩子的活
  if (fiber.child) {
    return fiber.child
  }

  // 2. 如果没孩子，找兄弟
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    // 3. 如果没兄弟，找叔叔（回到爸爸那，找爸爸的兄弟）
    nextFiber = nextFiber.parent
  }

  // 这里的逻辑就是：深度优先遍历 (Depth First Traversal)
  return null
}


// 最核心的 Diff 算法
function reconcileChildren(wipFiber, elements) {
  let index = 0
  // 拿到旧的 Fiber 孩子（如果存在的话）
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  let prevSibling = null

  // 同时遍历新的孩子数组 (elements) 和 旧的 Fiber 链表 (oldFiber)
  while (index < elements.length || oldFiber != null) {
    const element = elements[index]
    let newFiber = null

    // 1. 对比新旧类型是否相同
    const sameType =
      oldFiber &&
      element &&
      element.type == oldFiber.type

    // 情况 1: 类型一样 -> 更新 (Update)
    // 复用旧的 DOM，只更新 props
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom, // 复用 DOM！
        parent: wipFiber,
        alternate: oldFiber, // 记录旧的自己
        effectTag: "UPDATE", // 打个标签：这是一个“更新”任务
      }
    }

    // 情况 2: 类型不一样，但是有新元素 -> 新建 (Placement)
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT", // 打个标签：这是一个“新建”任务
      }
    }

    // 情况 3: 类型不一样，且有旧 Fiber -> 删除 (Deletion)
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber) // 加入删除名单
    }

    // 指针移动：旧 Fiber 往后走
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    // 建立新 Fiber 的兄弟关系
    if (index === 0) {
      wipFiber.child = newFiber
    } else if (element) {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}

// 辅助函数：创建 DOM 节点（把之前 render 里创建 DOM 的逻辑抽离出来）
function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)

  const isProperty = key => key !== "children"
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })

  return dom
}


// 统一提交修改
function commitRoot() {
  // A. 先把要删除的节点都干掉
  deletions.forEach(commitWork)
  // B. 提交新的更改
  commitWork(wipRoot.child)
  // C. 保存这次提交的树，变成下一次的“旧树”
  currentRoot = wipRoot
  wipRoot = null
}

// 递归地把节点挂到 DOM 上
function commitWork(fiber) {
  if (!fiber) {
    return
  }

  // 1. 找到父亲的 DOM 节点
  const domParent = fiber.parent.dom

  // 2. 根据标签干活
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    // 新增
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    // 更新
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  } else if (fiber.effectTag === "DELETION") {
    // 删除
    domParent.removeChild(fiber.dom)
    // 删完就不用处理它的子节点了，直接返回
    return
  }

  // 3. 递归处理孩子和兄弟
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

// 🔨 执行操作 (Update DOM)
const isEvent = key => key.startsWith("on")
const isProperty = key => key !== "children" && !isEvent(key)
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)

function updateDom(dom, prevProps, nextProps) {
  // 1. 删除旧的属性（新 props 里没有的，或者变了的）
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })

  // 2. 添加/更新新的属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })

  // 3. (下一关再处理事件监听器，比如 onClick，这一关先不管)
}



// ==========================================
// 3. 测试
// ==========================================
// 我们的mini React对象
const Didact = {
  createElement,
  render
}

// 找到html中的root容器
const container = document.getElementById('root');

// 模拟更新：每秒钟重新 render 一次
const updateValue = e => {
  rerender(e.target.value)
}

const rerender = value => {
  const element = Didact.createElement(
    "div",
    null,
    Didact.createElement("input", {
      oninput: updateValue, // 注意：虽然我们没实现事件绑定，但可以手动改代码触发
      value: value
    }),
    Didact.createElement("h2", null, `Hello ${value}`)
  )
  Didact.render(element, container)
}

// 第一次渲染
rerender("World")

// 自动测试：2秒后把 World 变成 React
setTimeout(() => {
  rerender("React")
}, 2000)
