import React, { PureComponent } from "react";
import Cart from "./pages/Cart";

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  handleLogin = () => {
    localStorage.setItem("token", "123456");
    // 强制刷新：重新渲染组件，不建议使用
    this.forceUpdate()
  };

  render() {
    return (
      <div>
        App
        {/* 登录按钮 */}
        <button onClick={this.handleLogin}>登录</button>
        <Cart />
      </div>
    );
  }
}

export default App;
