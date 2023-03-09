import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: () => import('@/views/home/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/favor",
      component: () => import('@/views/favor/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/order",
      component: () => import('@/views/order/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/message",
      component: () => import('@/views/message/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/city",
      component: () => import('@/views/city/index.vue'),
      meta: {
        keepAlive: true,
        isHiddenTabBar: true
      }
    },
    {
      path: "/search",
      component: () => import('@/views/search/index.vue'),
      meta: {
        isHiddenTabBar: true
      }
    },
    {
      path: "/detail/:id",
      component: () => import('@/views/detail/index.vue'),
      meta: {
        isHiddenTabBar: true
      }
    }
  ]
})

export default router