import React, { PureComponent } from 'react'

export class Profile extends PureComponent {
  // 生命周期
  // 开启严格模式后，生命周期函数会被调用两次，一次是正常的，一次是严格模式下的
  componentDidMount() {
    console.log('componentDidMount')
  }

  render() {
    console.log('render');
    return (
      <div>Profile</div>
    )
  }
}

export default Profile