<template>
  <div>
    App
    <button @click="changeTitle">修改title</button>
  </div>

  <div>
    <button @click="currentTab = 'home'">首页</button>
    <button @click="currentTab = 'about'">关于</button>
  </div>
  <component :is="currentTab"></component>
  <!-- <home></home>
  <about></about> -->
</template>

<script>
import { ref } from 'vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import useTitle from './hooks/useTitle';
export default {
  components: {
    Home,
    About,
  },
  setup() {
    const currentTab = ref('home');

    function changeTitle() {
      useTitle('app');
    }
    return {
      currentTab,
      changeTitle,
    };
  },
};
</script>

<style lang="scss" scoped></style>
