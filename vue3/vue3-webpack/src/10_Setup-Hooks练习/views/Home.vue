<template>
  <div>Home</div>
  <h1>{{ counter }}</h1>
  <button @click="increment">增加</button>
  <button @click="decrement">减少</button>
</template>

<script>
import useCounter from '../hooks/useCounter';
export default {
  setup() {
    return {
      ...useCounter(),
    };
  },
};
</script>

<style lang="scss" scoped></style>
