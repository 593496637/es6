<template>
  <div class="container">search</div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

console.log(route.query.startDate);
</script>

<style lang="scss" scoped></style>
