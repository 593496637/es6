import React, { PureComponent } from 'react';
import { Link, Outlet } from 'react-router-dom';

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(path) {
    console.log(path);
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to='/home/recommend'>推荐</Link>
        <Link to='/home/ranking'>排行榜</Link>
        <button onClick={() => this.navigateTo('/home/songList')}>歌单</button>
        {/* 子路由的占位符 */}
        <Outlet />
      </div>
    );
  }
}

export default Home;
