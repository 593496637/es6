<template>
  <div>
    <button @click="count++">You clicked me {{ count }} times.</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
</script>

<style lang="scss" scoped></style>
