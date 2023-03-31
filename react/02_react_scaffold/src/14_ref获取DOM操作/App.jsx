import React, { PureComponent, createRef } from "react";

export class App extends PureComponent {
  constructor() {
    super();
    this.myInput = createRef();

    this.inputEl = null;
  }

  // 获取input的值
  show = () => {
    // 方式一(废弃)：refs已经被废弃了：在React16.3之后，官方不建议使用refs了，因为它会导致组件的性能问题，所以官方推荐使用回调函数的方式来获取dom
    // console.log(this.refs.myInput.value)

    // 方式二(掌握)：通过ref获取dom：在React16.3之后，官方推荐使用回调函数的方式来获取dom
    // 提前在constructor中创建一个ref，然后在render中通过ref属性来绑定dom，最后在show方法中通过this.myInput.current来获取dom
    console.log(this.myInput.current.value);

    // 方式三(了解)：通过在ref中传入一个回调函数，来获取dom，这种方式在React16.3之前是官方推荐的方式
    console.log(this.inputEl.value);
  };

  render() {
    return (
      <div>
        <h2>Hello World</h2>
        {/* 获取dom */}
        {/* <input type="text" ref="myInput" /> */}
        <input type="text" ref={this.myInput} />
        <input type="text" ref={(el) => (this.inputEl = el)} />

        <button onClick={(e) => this.show()}>获取input的值</button>
      </div>
    );
  }
}

export default App;
