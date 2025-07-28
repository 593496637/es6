import { lazy } from 'react';

const icons = {
  'arrow-left': lazy(() => import('./svgs/arrow-left.svg').then(m => ({ default: m.ReactComponent }))),
  'arrow-right': lazy(() => import('./svgs/arrow-right.svg').then(m => ({ default: m.ReactComponent }))),
  avatar: lazy(() => import('./svgs/avatar.svg').then(m => ({ default: m.ReactComponent }))),
  global: lazy(() => import('./svgs/global.svg').then(m => ({ default: m.ReactComponent }))),
  logo: lazy(() => import('./svgs/logo.svg').then(m => ({ default: m.ReactComponent }))),
  menu: lazy(() => import('./svgs/menu.svg').then(m => ({ default: m.ReactComponent }))),
  search: lazy(() => import('./svgs/search.svg').then(m => ({ default: m.ReactComponent }))),
};

export default icons;