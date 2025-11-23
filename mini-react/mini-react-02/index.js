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

function render(element, container) {
  // 设置第一个任务：Root Fiber（根任务节点）
  nextUnitOfWork = {
    dom: container, // 这个任务对应的真实DOM节点
    props: {
      children: [element] // 它的孩子是谁（还没变成Fiber，现在还是虚拟DOM）
    }
  }
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

  // 如果还有任务没做完，我们就请求浏览器在下一次空闲时继续调用workLoop
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop)
  }
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
    // 注意：我们这里先偷懒，直接挂载到父节点上。
    // (这其实有 Bug，因为 UI 会渲染不完全，我们下一章再修这个 Bug)
    if (fiber.parent) {
      fiber.parent.dom.appendChild(fiber.dom)
    }
  }

  // --- 第二步：为孩子建立 Fiber 关系 (把数组变成链表) ---
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null

  // 遍历所有的孩子（虚拟 DOM）
  while (index < elements.length) {
    const element = elements[index]

    // 创建一个新的 Fiber 对象
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber, // 记住爸爸是谁
      dom: null,     // 还没创建真实 DOM，等下次轮到它的时候再创建
    }

    // 建立关系：
    // 如果是长子 (index === 0)，就把它设为爸爸的 child
    if (index === 0) {
      fiber.child = newFiber
    } else {
      // 如果不是长子，就把它设为上一个兄弟的 sibling
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }

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



// ==========================================
// 3. 测试
// ==========================================
// 我们的mini React对象
const Didact = {
  createElement,
  render
}

// 我们不用JSX语法糖，直接用Didact.createElement来创建元素
// 这段代码描述了这样一个DOM结构：
// <div id="app">
//   <h1 title="foo">Hello</h1>
//   <h2 style="color: green;">World</h2>
// </div>
const element = Didact.createElement(
  'div',
  { id: 'app' },
  Didact.createElement('h1', { title: 'foo' }, 'Hello'),
  Didact.createElement('h2', { style: 'color: green;' }, 'World 😄')
);

console.log(element);

// 找到html中的root容器
const container = document.getElementById('root');
// 把元素渲染到root容器中
Didact.render(element, container);