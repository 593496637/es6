import React, { PureComponent } from "react";

export class App extends PureComponent {
  state = {
    fontSize: "30px",
  };
  render() {
    const { fontSize } = this.state;
    return (
      <div>
        <h2 style={{ color: "red", fontSize: fontSize }}>标题</h2>
      </div>
    );
  }
}

export default App;
