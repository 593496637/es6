<template>
  <div v-show-animate:fade.delay="show">Hello</div>
  <div v-show-animate:slide.delay="show">Hello</div>
  <div v-show-animate:rotate.delay="show">Hello</div>
  <button @click="toggleShow">Toggle Show</button>
</template>

<script setup>
import { ref } from "vue";
const show = ref(true);
const toggleShow = () => {
  show.value = !show.value;
};
</script>
