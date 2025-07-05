import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../pages/Home';

// 同步引入：打包后会直接打包到bundle.js中，导致bundle.js体积过大
// import About from '../pages/About';
// import Login from '../pages/Login';

import HomeRecommend from '../pages/HomeRecommend';
import HomeRanking from '../pages/HomeRanking';
import Category from '../pages/Category';
import Order from '../pages/Order';
import HomeSongList from '../pages/HomeSongList';
import Detail from '../pages/Detail';
import NotFound from '../pages/NotFound';
import User from '../pages/User';

// 懒加载：会按需加载，不会打包到bundle.js中，会单独打包成一个文件
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Login'));

const routes = [
  {
    path: '/',
    element: <Navigate to='/home' />,
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Navigate to='recommend' />,
      },
      {
        path: 'recommend',
        element: <HomeRecommend />,
      },
      {
        path: 'ranking',
        element: <HomeRanking />,
      },
      {
        path: 'songList',
        element: <HomeSongList />,
      },
    ],
  },

  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/category',
    element: <Category />,
  },
  {
    path: '/order',
    element: <Order />,
  },
  {
    path: '/detail/:id',
    element: <Detail />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
export default routes;