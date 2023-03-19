<template>
  <div>
    <button @click="toggle">切换</button>
    <div>
      <transition mode="out-in" name="fade">
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
.fade-enter-active {
  animation: fade 0.2s;
}
.fade-leave-active {
  animation: leave 0.2s;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(-10px) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes leave {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(10px) scale(0.5);
  }
}
</style>
