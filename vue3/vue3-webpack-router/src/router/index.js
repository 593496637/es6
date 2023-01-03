import { createRouter, createWebHistory } from 'vue-router';

// 同步
// import Home from '../views/home.vue'
// import About from '../views/about.vue'
// import User from '../views/user.vue'


// 路由懒加载
// 魔法注释
const Home = () => import(/* webpackChunkName:'home' */'../views/home.vue')
const About = () => import(/* webpackChunkName:'about' */'../views/about.vue')
const User = () => import(/* webpackChunkName:'user' */'../views/user.vue')


const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      icon: 'home'
    },
    children: [

      // 或者 /home 也可以
      // '' 的时候，得指定name
      {
        path: '',
        name: 'Home',
        redirect: '/home/recommend'
      },
      {
        path: 'recommend',
        component: () => import('../views/homeRecommend.vue')
      },
      {
        path: 'ranking',
        component: () => import('../views/homeRanking.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user/:id',
    component: User
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order.vue')
  },

  // /:pathMatch(.*)*  后面添加个星，会把路径放进一个数组里
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// 1.动态管理路由
const isAdmin = true
if (isAdmin) {
  router.addRoute({
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin.vue')
  })

  router.addRoute('Home', {
    path: 'vip',
    component: () => import('../views/HomeVip.vue')
  })
}

// 2.路由导航守卫
// 进行任何的路由跳转之前，传入的beforeEach函数都会被调用
router.beforeEach((to, from) => {
  console.log('回调');

  const isLogin = localStorage.getItem('token')
  if (!isLogin && to.path === '/order') {
    console.log(12222);
    return '/login'
  }
})



// 获取所有路由
console.log(router.getRoutes());




export default router

