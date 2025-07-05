import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import HomeRecommend from './pages/HomeRecommend';
import HomeRanking from './pages/HomeRanking';
import Category from './pages/Category';
import Order from './pages/Order';
import HomeSongList from './pages/HomeSongList';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import User from './pages/User';
import './style.css';

export function App() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
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
        <Link to='/user?id=123&name=张三'>用户</Link>
        <button onClick={() => navigateTo('/user?id=3&name=李四')}>
          用户
        </button>
        <button onClick={() => navigateTo('/category')}>分类</button>
        <button onClick={() => navigateTo('/order')}>订单</button>
      </div>
      <div>
        <h2>内容区域</h2>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />}>
            <Route path='/home' element={<Navigate to='/home/recommend' />} />
            <Route path='/home/recommend' element={<HomeRecommend />} />
            <Route path='/home/ranking' element={<HomeRanking />} />
            <Route path='/home/songList' element={<HomeSongList />} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/category' element={<Category />} />
          <Route path='/order' element={<Order />} />
          {/* 动态路由 */}
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/user' element={<User />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
