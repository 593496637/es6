import React, { Component } from "react";
import "./App.css";
import TabBar from "./TabBar";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: ["标题1", "标题2", "标题3"],
      tabIndex: 1,
    };
  }

  // 切换tab-bar-item
  changeTab(index) {
    this.setState({
      tabIndex: index,
    });
  }

  render() {
    const { titles, tabIndex } = this.state;
    return (
      <div>
        <TabBar
          titles={titles}
          tabIndex={tabIndex}
          changeTab={(index) => this.changeTab(index)}
        />
        <div className="content">
          <h1>{titles[tabIndex]}</h1>
        </div>
      </div>
    );
  }
}

export default App;
