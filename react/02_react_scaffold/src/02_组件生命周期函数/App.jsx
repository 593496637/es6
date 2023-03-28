import React from "react";
import HelloWorld from "./HelloWorld";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "App",
      show: true,
    };
  }

  // 显示隐藏切换
  toggle() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  render() {
    const { message, show } = this.state;
    return (
      <div>
        <h1>{message}</h1>
        {/* 类组件实例 */}

        {/* 根据show是否为true判断是否显示组件 */}
        {show && <HelloWorld />}

        {/* 卸载HelloWorld组件 */}
        <button
          onClick={() => {
            this.toggle();
          }}
        >
          切换
        </button>
      </div>
    );
  }
}

export default App;
