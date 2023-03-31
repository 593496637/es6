import React, { PureComponent, createRef } from "react";

// 通过ref获取组件实例
// 类组件
class HelloWorld extends PureComponent {
  render() {
    return <div>Hello World</div>;
  }
}


export class Dom01 extends PureComponent {
  constructor() {
    super();
    this.helloWorldEl = createRef();
  }
  render() {
    return (
      <div>
        <h2>Dom01</h2>
        <HelloWorld ref={this.helloWorldEl} />
      </div>
    );
  }

  componentDidMount() {
    console.log(this.helloWorldEl.current);
  }
}

export default Dom01;
