<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function login() {
  localStorage.setItem('token', 'abc');
  router.push('/order');
}
</script>

<style lang="scss" scoped></style>
