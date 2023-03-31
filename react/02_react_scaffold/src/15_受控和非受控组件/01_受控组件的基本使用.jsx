import React, { PureComponent } from "react";

export class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      inputValue: "abc",
    };
  }

  inputChange(e) {
    console.log(e.target.value);
    this.setState({
      inputValue: e.target.value,
    });
  }

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        {/* 受控组件 */}
        {/* 1. value值由state控制 */}
        {/* 2. onChange事件中，通过setState修改state中的值 */}
        {/* 3. 通过value={inputValue}将state中的值赋值给value */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => this.inputChange(e)}
        />
        
        {/* 非受控组件 */}
        <input type="text" />
        <h1>{inputValue}</h1>
      </div>
    );
  }
}

export default App;
