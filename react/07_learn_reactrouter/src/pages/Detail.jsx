import React, { PureComponent } from 'react';
import withRouter from '../hoc/widthRouter';

export class Detail extends PureComponent {
  render() {
    const { id } = this.props.router.params;
    return (
      <div>
        <h2>详情</h2>
        <p>详情内容id:{id}</p>
      </div>
    );
  }
}

export default withRouter(Detail);
