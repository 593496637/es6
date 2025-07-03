import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';

export class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <div>
        <h2>登录页面</h2>
        {this.state.isLogin ? (
          <Navigate to='/home'></Navigate>
        ) : (
          <button onClick={() => this.setState({ isLogin: true })}>登录</button>
        )}
      </div>
    );
  }
}

export default Login;
