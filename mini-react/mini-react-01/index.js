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
// 2. 施工队 (render) - 递归版
// ==========================================

/**
 * 把虚拟 DOM 变成真实 DOM，挂载到容器上
 * @param {object} element 虚拟 DOM (蓝图)
 * @param {HTMLElement} container 真实的 DOM 容器 (地基)
 */
function render(element, container) {
  // 1. 创建真实的 DOM 节点
  // 如果是文本节点，创建文本节点；否则创建对应类型的元素节点
  const dom = element.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(element.type)

  // 2. 设置节点属性
  // 把属性都设置到真实 DOM 上
  const isProperty = key => key !== "children" // 过滤掉 children 属性
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })


  // 3. 递归处理子节点
  // 如果有子节点，就递归调用 render
  element.props.children.forEach(child => {
    render(child, dom)
  })

  // 4. 把创建好的节点挂载到容器上
  container.appendChild(dom)
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
  Didact.createElement('h2', { style: 'color: green;' }, 'World')
);

console.log(element);

// 找到html中的root容器
const container = document.getElementById('root');
// 把元素渲染到root容器中
Didact.render(element, container);