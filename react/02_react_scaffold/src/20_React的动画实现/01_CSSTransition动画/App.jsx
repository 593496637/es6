import React, { PureComponent, createRef } from "react";
import { CSSTransition } from "react-transition-group";

import "./style.css";

export class App extends PureComponent {
  state = {
    isShow: true,
  };

  // 创建ref：用于获取真实的DOM元素, 用于CSSTransition的nodeRef属性
  //开启严格模式后，如果不设置ref，会报错，因为CSSTransition需要获取真实的DOM元素, 用于CSSTransition的nodeRef属性, 但是在严格模式下，ref是不能直接获取真实的DOM元素的
  transitionRef = createRef();

  render() {
    const { isShow } = this.state;
    return (
      <div>
        <button onClick={() => this.setState({ isShow: !isShow })}>切换</button>
        {/* 动画 */}
        <CSSTransition
          nodeRef={this.transitionRef}
          in={isShow}
          timeout={1000}
          classNames="fade"
          appear
          unmountOnExit
          onEnter={() => {
            console.log("开始进入动画");
          }}
          onEntering={() => {
            console.log("正在进入动画");
          }}
          onEntered={() => {
            console.log("进入动画结束");
          }}
          onExit={() => {
            console.log("开始退出动画");
          }}
          onExiting={() => {
            console.log("正在退出动画");
          }}
          onExited={() => {
            console.log("退出动画结束");
          }}
        >
          <h2 ref={this.transitionRef}>CSSTransition动画</h2>
        </CSSTransition>
      </div>
    );
  }
}

export default App;
