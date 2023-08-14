<template>
  <div class="main">
    <h2>main:{{ counter.count }}-{{ counter.doubleCount }}</h2>
    <button @click="changeCount">修改</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'
const counter = useCounterStore()

function changeCount() {
  counter.changeCount(999)
}
</script>

<style scoped>
.main {
  color: red;
}
</style>
