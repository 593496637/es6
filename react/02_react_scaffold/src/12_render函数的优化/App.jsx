import React, { Component } from "react";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  // 修改值
  setCounter = () => {
    this.setState({
      counter: 0,
    });
  };

  render() {
    console.log("值没变，但是重新渲染");
    return (
      <div>
        App
        <h2>{this.state.counter}</h2>
        <button onClick={this.setCounter}>修改值</button>
      </div>
    );
  }
}

export default App;
