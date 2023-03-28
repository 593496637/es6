import React from "react";

class HelloWorld extends React.Component {
  // 1.构造方法
  constructor() {
    console.log("constructor");
    super();
    this.state = {
      message: "Hello World",
    };
  }

  // 修改文本
  changeText() {
    this.setState({
      message: "Hello React",
    });
  }

  // 2.执行render方法
  render() {
    console.log("render");
    const { message } = this.state;
    return (
      <div>
        <h1>{message}</h1>
        <button
          onClick={() => {
            this.changeText();
          }}
        >
          修改文本
        </button>
      </div>
    );
  }

  // 3.组件挂载完成
  componentDidMount() {
    console.log("componentDidMount");
    setTimeout(() => {
      this.setState({
        message: "Hello React",
      });
    }, 2000);
  }

  // 4.组件更新完成
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  // 5.组件卸载完成
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // 6.组件发生错误
  componentDidCatch() {
    console.log("componentDidCatch");
  }

  // 7.组件是否需要更新
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    // 返回true表示需要更新，返回false表示不需要更新
    return false;
  }

  // 8.组件更新前，返回一个对象，这个对象会作为第三个参数传递给componentDidUpdate
  getSnapshotBeforeUpdate() {
    console.log("getSnapshotBeforeUpdate");
    return null;
  }
}

export default HelloWorld;