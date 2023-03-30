import React, { Component } from "react";
import Home from "./Home";
import eventBus from "./utils/event-bus";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "app",
      age: 18,
    };
  }

  componentDidMount() {
    eventBus.on("changePrev", (name, age) => {
      this.handlePrev(name, age);
    });
    eventBus.on("changeNext", this.handleNext);
  }

  // 监听函数
  handlePrev(name, age) {
    this.setState({ name, age });
  }

  handleNext = (name, age) => {
    this.setState({ name, age });
  };

  componentWillUnmount() {
    eventBus.off("changePrev", this.handlePrev);
    eventBus.off("changeNext", this.handleNext);
  }

  render() {
    const { name, age } = this.state;
    return (
      <div>
        <h2>
          App-{name}-{age}
        </h2>
        <Home />
      </div>
    );
  }
}

export default App;
