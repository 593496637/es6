import React, { Component } from 'react';
import ThemeContext from './context/theme-context';
import UserContext from './context/user-context';

// 类组件：通过this.context获取到ThemeContext中的数据
export class HomeInfo extends Component {
  render() {
    // 第四步：通过this.context获取到ThemeContext中的数据
    console.log(this.context);

    return (
      <div>
        {/* 第一种方式：通过this.context获取到ThemeContext中的数据 */}
        <h2>HomeInfo</h2>
        {/* 第二种方式：通过ThemeContext.Consumer获取到ThemeContext中的数据 */}
        <ThemeContext.Consumer>
          {(value) => {
            console.log(value);
            return <div>ThemeContext: {value.color}</div>;
          }}
        </ThemeContext.Consumer>

        {/* 但是HomeInfo.contextType = ThemeContext，只能获取到ThemeContext中的数据，不能获取到UserContext中的数据，所以需要使用UserContext.Consumer获取到UserContext中的数据 */}
        <UserContext.Consumer>
          {(value) => {
            console.log(value);
            return <div>UserContext: {value.background}</div>;
          }}
        </UserContext.Consumer>
      </div>
    );
  }
}

// 第三步：通过HomeInfo.contextType = ThemeContext，将ThemeContext中的数据传递给HomeInfo
HomeInfo.contextType = ThemeContext;

export default HomeInfo;
