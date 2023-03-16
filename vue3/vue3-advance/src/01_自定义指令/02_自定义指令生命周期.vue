<template>
  <div>
    <button @click="counter++">增加</button>
    <div v-if="isShow" v-hello>{{ counter }}</div>
    <button @click="isShow = !isShow">显示/隐藏</button>
  </div>
</template>

<script></script>
<script setup>
import { ref } from "vue";
const counter = ref(0);
const isShow = ref(true);


const vHello = {
  created() {
    console.log("hello created");
  },
  beforeMount() {
    console.log("hello beforeMount");
  },
  mounted() {
    console.log("hello mounted");
  },
  beforeUpdate() {
    console.log("hello beforeUpdate");
  },
  updated() {
    console.log("hello updated");
  },
  beforeUnmount() {
    console.log("hello beforeUnmount");
  },
  unmounted() {
    console.log("hello unmounted");
  },
};
</script>

<style lang="scss" scoped></style>
