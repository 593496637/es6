import React, { PureComponent } from 'react';
import { Link, Outlet } from 'react-router-dom';

export class Home extends PureComponent {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to='/home/recommend'>推荐</Link>
        <Link to='/home/ranking'>排行榜</Link>
        {/* 子路由的占位符 */}
        <Outlet />
      </div>
    );
  }
}

export default Home;
