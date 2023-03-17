<template>
  <render />
</template>

<script setup>
import { ref, h, resolveComponent } from "vue";

const counter = ref(0);
const increment = () => {
  counter.value++;
};

const decrement = () => {
  counter.value--;
};

const render = () =>
  h("div", { class: "app" }, [
    h("h1", { class: "title" }, "当前计数：" + counter.value),
    h(
      "button",
      {
        class: "btn",
        onClick: increment,
      },
      "加1"
    ),
    h(
      "button",
      {
        class: "btn",
        onClick: decrement,
      },
      "减1"
    ),
    h(resolveComponent("MyComponent")),
  ]);
</script>

<style lang="scss" scoped></style>
