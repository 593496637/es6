import React, { Component } from "react";
import Children from "./Children";
export class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  handleCountChange(num) {
    const { count } = this.state;
    this.setState({
      count: count + num,
    });
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>{count}</h1>
        <Children onChangeCount={(count) => this.handleCountChange(count)} />
      </div>
    );
  }
}

export default App;
