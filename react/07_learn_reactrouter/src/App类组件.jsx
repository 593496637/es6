import React, { PureComponent } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import HomeRecommend from './pages/HomeRecommend';
import HomeRanking from './pages/HomeRanking';
import NotFound from './pages/NotFound';
import './style.css';

export class App extends PureComponent {

  render() {
    return (
      <>
        <div>
          <h2>导航区域</h2>
        </div>
        <div className='nav-link'>
          {/* 默认情况下，NavLink会自动添加active类名 */}
          {/* <NavLink to='/home'>Home</NavLink>
          <NavLink  to='/about'>About</NavLink> */}

          {/* 添加activeClassName属性，可以自定义active类名 */}
          {/* <NavLink to='/home' activeClassName={this.getClassName}>Home</NavLink>
          <NavLink to='/about' activeClassName={this.getClassName}>About</NavLink> */}

          {/* 可以传入style属性 */}
          {/* <NavLink to='/home' style={{ fontSize: '30px' }}>Home</NavLink>
          <NavLink to='/about' style={{ fontSize: '30px' }}>About</NavLink> */}

          <Link to='/home'>首页</Link>
          <Link to='/about'>关于</Link>
          <Link to='/login'>登录</Link>
        </div>
        <div>
          <h2>内容区域</h2>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />}>
              <Route path='/home' element={<Navigate to='/home/recommend' />} />
              <Route path='recommend' element={<HomeRecommend />} />
              <Route path='ranking' element={<HomeRanking />} />
            </Route>
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
