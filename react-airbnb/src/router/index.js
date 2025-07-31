import { lazy } from 'react';
import { Navigate } from 'react-router';

const Home = lazy(() => import('@views/home'));
const Entire = lazy(() => import('@views/entire'));
const Detail = lazy(() => import('@views/detail'));
const Footer = lazy(() => import('@views/footer'));
const Demo = lazy(() => import('@views/demo'));

const routes = [
  {
    path: '/',
    element: <Navigate to='/home' replace />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/entire',
    element: <Entire />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
  {
    path: '/footer',
    element: <Footer />,
  },
  {
    path: '/demo',
    element: <Demo />,
  },
  {
    path: '*',
    element: <Navigate to='/home' replace />,
  },
];

export default routes;
