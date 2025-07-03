import React, { PureComponent } from 'react';

export class Order extends PureComponent {
  render() {
    return (
      <div>
        <h2>订单</h2>
        <ul>
          <li>订单1</li>
          <li>订单2</li>
          <li>订单3</li>
        </ul>
      </div>
    );
  }
}

export default Order;
