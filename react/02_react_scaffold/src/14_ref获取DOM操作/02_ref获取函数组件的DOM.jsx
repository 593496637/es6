import React, { PureComponent, createRef, forwardRef } from 'react';

// 通过ref获取组件实例

// 函数组件 + forwardRef
const HelloWorld = forwardRef((props, ref) => {
  return <div ref={ref}>Hello World2</div>;
});

export class Dom01 extends PureComponent {
  constructor() {
    super();
    this.helloWorldEl = createRef();
  }

  getChildren = () => {
    console.log(this.helloWorldEl.current);
  };

  render() {
    return (
      <div>
        <h2>Dom01</h2>
        <HelloWorld ref={this.helloWorldEl} />
        <button onClick={this.getChildren}>获取HelloWorld组件实例</button>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.helloWorldEl.current);
  }
}

export default Dom01;
