<template>
  <div>About</div>
  <h1>{{ counter }}</h1>
  <button @click="increment">about增加</button>
  <button @click="decrement">about减少</button>
</template>

<script>
import useCounter from '../hooks/useCounter';
import useTitle from '../hooks/useTitle';
export default {
  name: 'about',
  setup() {
    const title = useTitle('关于');

    return {
      ...useCounter(),
    };
  },
};
</script>

<style lang="scss" scoped></style>
