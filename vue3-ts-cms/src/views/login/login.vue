<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import request from '@/service'
import LoginPanel from './components/LoginPanel.vue'
request
  .get({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })

console.log(import.meta.env)
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background: url('@/assets/images/login-bg.svg');
}
</style>
