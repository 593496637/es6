<template>
  <h1>app</h1>
  <router-link to="/home" active-class="active">首页</router-link>
  <router-link to="/about" active-class="active">关于</router-link>
  <router-link to="/order" active-class="active">订单</router-link>
  <router-link to="/user/123" active-class="active">用户123</router-link>
  <router-link to="/user/321" active-class="active">用户321</router-link>
  <!-- <router-link :to="{path:'/home'}">首页</router-link> -->
  <!-- <router-link to="/about" replace>关于</router-link> -->

  <button @click="goHome">首页</button>
  <button @click="goAbout">关于</button>
  <router-view></router-view>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push({ path: '/home', query: { test: '测试' } });
}

function goAbout() {
  router.push({ path: '/about' });
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* 给激活的按钮添加样式，默认的class */
/* .router-link-active {
  color: red;
  font-size: 20px;
} */

/* 自定义样式 */
.active {
  color: goldenrod;
  font-size: 20px;
}
</style>
