<template>
  <h1>404</h1>
  <h1>{{ $route.params.pathMatch }}路径不正确</h1>
</template>

<script setup></script>

<style scoped>
h1 {
  color: red;
}
</style>
