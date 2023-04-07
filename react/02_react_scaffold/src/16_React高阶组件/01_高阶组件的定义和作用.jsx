import React, { PureComponent } from "react";

// 高阶组件: 接收一个组件, 返回一个新的组件
function hoc(Cpn) {
  // 返回一个组件
  return class NewCpn extends PureComponent {
    render() {
      return <Cpn />;
    }
  };
}
class HelloWorld extends PureComponent {
  render() {
    return <div>hello world</div>;
  }
}

const HelloWorldHoc = hoc(HelloWorld);

export class App extends PureComponent {
  render() {
    return (
      <div>
        <HelloWorldHoc />
      </div>
    );
  }
}

export default App;
