<template>
  <h1>counter:{{ counter }}</h1>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
</template>

<script>
import useCounter from './hooks/useCounter';
export default {
  name: 'App',
  setup() {
    // const { counter, increment, decrement } = useCounter();
    // return { counter, increment, decrement };

    return {
      ...useCounter(),
    };
  },
};
</script>

<style></style>
