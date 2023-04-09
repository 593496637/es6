import React, { Fragment, PureComponent } from 'react'

// Fragment: 用于包裹组件, 但不会渲染到DOM中

export class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      // 列表
      list: [
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        }
      ]

    }
  }
  render() {
    return (
      // <Fragment>拉卡随机发</Fragment>
      <>
        Fragment语法糖写法
        <ul>
          {
            this.state.list.map(item => (
              // 如果这里是循环渲染的列表，则不能使用Fragment的语法糖写法，因为列表的每一项都需要一个key值, 但是语法糖写法不支持key值
              <Fragment key={item.id}>
                <li>{item.name}</li>
                <li>😄</li>
              </Fragment>
            ))
          }
        </ul>

      </>
    )
  }
}

export default App