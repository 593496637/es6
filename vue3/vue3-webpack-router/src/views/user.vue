<template>
  <div>user:{{ $route.params.id }}</div>
</template>

<script setup>
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();

onBeforeRouteUpdate((to, from) => {
  console.log('from:', from.params.id);
  console.log('to:', to.params.id);
  console.log(to);
});
</script>

<style lang="scss" scoped></style>
