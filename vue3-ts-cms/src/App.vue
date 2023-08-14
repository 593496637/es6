<template>
  <div>
    app
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
interface IPerson {
  name: string
  age: number
}
const person: IPerson = {
  name: 'jack',
  age: 18
}

const { name, age } = person
console.log(name, age)
</script>
<style scoped></style>
