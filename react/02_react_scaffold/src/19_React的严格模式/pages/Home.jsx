import React, { PureComponent } from 'react'

export class Home extends PureComponent {

  // UNSAFE_componentWillMount是一个不安全的生命周期函数，它会在组件挂载之前被调用
  // 但是在React 17中，它会被弃用，所以在React 17中，它会被调用两次
  // 一次是正常的，一次是严格模式下的，所以在React 17中，我们不要使用UNSAFE_componentWillMount
  // 在严格模式下，控制台会打印出警告信息
  UNSAFE_componentWillMount() {
    console.log('componentWillMount')
  }
  render() {
    return (
      <div>Home</div>
    )
  }
}

export default Home