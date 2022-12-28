<template>
  <div>
    App
    <button @click="changeTitle">修改title</button>
  </div>
  <home></home>
  <about></about>
</template>

<script>
import Home from './views/Home.vue';
import About from './views/About.vue';
import useTitle from './hooks/useTitle';
export default {
  components: {
    Home,
    About,
  },
  setup() {
    function changeTitle() {
      useTitle('app');
    }
    return {
      changeTitle,
    };
  },
};
</script>

<style lang="scss" scoped></style>
