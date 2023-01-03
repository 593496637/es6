<template>
  <div>home</div>
  <h1>{{ $route.query }}</h1>

  <router-link to="/home/recommend">推荐</router-link>
  <router-link to="/home/ranking">排行榜</router-link>
  <router-link to="/home/vip">vip</router-link>
  <router-view></router-view>

  <button @click="logout">退出登录</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

console.log(router.meta);

function logout() {
  localStorage.removeItem('token');
  console.log(router);
  router.push('/login');
}
</script>

<style scoped>
.router-link-active {
  color: red;
  font-size: 30px;
}
</style>
