<!-- AsyncComponent.vue -->
<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello from Async Component!')

// 在这里可以使用 Vue 3 的新特性和语法，例如 ref、reactive、computed 等
</script>
