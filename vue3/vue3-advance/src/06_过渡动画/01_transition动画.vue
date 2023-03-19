<template>
  <div>
    <button @click="toggle">切换</button>
    <div>
      <transition mode="out-in">
        <h2 v-if="show">hello</h2>
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
  transform: translateY(-10px) scale(0.5);
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.v-enter-active,
.v-leave-active {
  transition: all .3s ease;
}
</style>
