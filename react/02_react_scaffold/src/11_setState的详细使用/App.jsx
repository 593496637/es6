import React, { Component } from "react";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "Hello",
      count: 0,
    };
  }

  changeText() {
    // 1.基本使用
    this.setState({
      message: "Hello React",
    });

    // 2.setState可以接收一个函数作为参数
    // 好处一：可以在回调函数中编写最新的state逻辑
    // 好处二：当前的回调函数会将之前的state和props作为参数传入
    this.setState(
      (state, props) => {
        return {
          message: state.message + " React",
        };
      },
      () => {
        console.log(this.state.message);
      }
    );

    // 3.setState是异步的
    this.setState({ count: 33 }, () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <h2>{this.state.count}</h2>
      </div>
    );
  }
}

export default App;
