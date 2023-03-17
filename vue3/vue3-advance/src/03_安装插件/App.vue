<template>
  <div>
    <h1 v-my-directive>安装插件</h1>
    <my-component />
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
const { appContext } = getCurrentInstance();
console.log(appContext.config.globalProperties.$myProperty);
</script>

<style lang="scss" scoped></style>
