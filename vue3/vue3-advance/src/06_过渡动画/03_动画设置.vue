<template>
  <div>
    <button @click="toggle">切换</button>
    <div>
      <transition mode="out-in" appear>
        <h2 v-if="show">hello</h2>
        <h2 v-else>world</h2>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const show = ref(true);
const toggle = () => {
  show.value = !show.value;
};
</script>

<style scoped>
h2 {
  display: inline-block;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>
