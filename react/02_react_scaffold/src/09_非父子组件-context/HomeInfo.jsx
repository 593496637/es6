import React, { Component } from 'react'
import ThemeContext from './context/theme-context'
import UserContext from './context/user-context';

export class HomeInfo extends Component {
  render() {

    // 第四步：通过this.context获取到ThemeContext中的数据
    console.log(this.context);

    return (
      <div>
        <h2>HomeInfo</h2>
        <UserContext.Consumer>
          {
            value => {
              console.log(value);
              return <div>{value.background}</div>
            }
          }
        </UserContext.Consumer>
      </div>
    )
  }
}

// 第三步：通过HomeInfo.contextType = ThemeContext，将ThemeContext中的数据传递给HomeInfo
HomeInfo.contextType = ThemeContext

export default HomeInfo