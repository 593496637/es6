import React, { PureComponent } from 'react';

export class Category extends PureComponent {
  render() {
    return (
      <div>
        <h2>分类</h2>
        <ul>
          <li>手机</li>
          <li>电脑</li>
          <li>电视</li>
          <li>相机</li>
          <li>耳机</li>
          <li>音箱</li>
          <li>游戏机</li>
        </ul>
      </div>
    );
  }
}

export default Category;
