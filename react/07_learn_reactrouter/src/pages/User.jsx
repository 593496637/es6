import React, { PureComponent } from 'react';
import withRouter from '../hoc/widthRouter';

export class User extends PureComponent {
  render() {
    const { query } = this.props.router;
    const { id, name } = query;
    return (
      <div>
        <h2>用户ID：{id}</h2>
        <p>用户名:{name}</p>
      </div>
    );
  }
}

export default withRouter(User);
