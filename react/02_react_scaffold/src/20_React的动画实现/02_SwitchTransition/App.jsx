import React, { Fragment, PureComponent, createRef } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./style.css";

export class App extends PureComponent {
  // 是否登录
  state = {
    isLogin: false,
  };

  switchRef = createRef();

  render() {
    const { isLogin } = this.state;
    return (
      <Fragment>
        <SwitchTransition mode="out-in">
          <CSSTransition
            nodeRef={this.switchRef}
            key={isLogin ? "exit" : "login"}
            timeout={500}
            classNames="switch"
          >
            <button
              ref={this.switchRef}
              onClick={() => this.setState({ isLogin: !isLogin })}
            >
              {isLogin ? "退出" : "登录"}
            </button>
          </CSSTransition>
        </SwitchTransition>
      </Fragment>
    );
  }
}

export default App;
