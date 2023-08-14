<template>
  <div class="login">
    <h2>login</h2>
  </div>
</template>

<script setup lang="ts">
import request from '@/service'

request
  .get({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })

console.log(import.meta.env)
</script>

<style scoped>
.login {
  color: red;
}
</style>
