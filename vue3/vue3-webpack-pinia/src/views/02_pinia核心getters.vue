<template>
  <h2>doubleCount:{{ counterStore.doubleCount }}</h2>
  <h2>doubleCountAddOne:{{ counterStore.doubleCountAddOne }}</h2>
  <h2>user:{{ counterStore.getUser }}</h2>
</template>

<script setup>
import useCounter from '@/stores/counter';
const counterStore = useCounter();
</script>

<style lang="scss" scoped></style>
