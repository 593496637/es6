import React, { PureComponent } from "react";
import Profile from "./Profile";
// PureComponent只做了浅层比较，如果是对象，就不会做比较
export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: "啊离开房间啊是否",
      counter: 0,
    };
  }
  // 修改值
  setCounter = () => {
    this.setState({
      counter: 0,
    });
  };

  setCounter2 = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  setMessage = () => {
    this.setState({
      message: "修改值",
    });
  };

  render() {
    console.log("值没变，就不会重新渲染");
    return (
      <div>
        App
        <h2>{this.state.counter}</h2>
        <Profile message={this.state.message} />
        <button onClick={this.setCounter}>值不变</button>
        <button onClick={this.setCounter2}>counter+1</button>
        <button onClick={this.setMessage}>修改message</button>
      </div>
    );
  }
}

export default App;
