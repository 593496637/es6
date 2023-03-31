import React, { PureComponent } from "react";

export class App2 extends PureComponent {
  constructor() {
    super();
    this.state = {
      inputValue: "abc",
    };
  }

  // 提交表单
  submitForm(e) {
    e.preventDefault();
    console.log(e.target.username.value);
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
      <form onSubmit={(e) => this.submitForm(e)}>
        <label htmlFor="username">
          用户名：
          <input
            type="text"
            id="username"
            value={inputValue}
            onChange={(e)=>this.inputChange(e)}
          />
          <button type="submit">提交</button>
        </label>
      </form>
    );
  }
}

export default App2;
