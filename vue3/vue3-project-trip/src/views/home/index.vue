<template>
  <div class="home-container">
    <nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <search-box />
    <categories />
    <content />
  </div>
</template>

<script setup>
import { watch } from 'vue';
import NavBar from './components/NavBar.vue';
import SearchBox from './components/SearchBox.vue';
import Categories from './components/Categories.vue';
import Content from './components/Content.vue';
import useHomeStore from '@/stores/modules/home';
import useScroll from '@/hooks/useScroll';

const homeStore = useHomeStore();
homeStore.fetchHouseList();

// 第一种使用useScroll的方式
// useScroll(function () {
//   homeStore.fetchHouseList();
// });

// 第二种使用useScroll的方式
const { isArrivedBottom } = useScroll();
watch(isArrivedBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseList().then(() => {
      isArrivedBottom.value = false;
    });
  }
});
</script>

<style lang="scss" scoped>
.home-container {
  padding-bottom: 50px;
}
.banner {
  img {
    width: 100%;
  }
}
</style>
