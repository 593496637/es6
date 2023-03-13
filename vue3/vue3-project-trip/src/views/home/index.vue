<template>
  <div class="home-container">
    <nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <search-box />
    <categories />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>

    <content />
  </div>
</template>

<script setup>
import { watch, computed } from "vue";
import NavBar from "./components/NavBar.vue";
import SearchBox from "./components/SearchBox.vue";
import Categories from "./components/Categories.vue";
import Content from "./components/Content.vue";
import useHomeStore from "@/stores/modules/home";
import useScroll from "@/hooks/useScroll";

import SearchBar from "@/components/SearchBar/index.vue";

const homeStore = useHomeStore();
homeStore.fetchHouseList();

// 第一种使用useScroll的方式
// useScroll(function () {
//   homeStore.fetchHouseList();
// });

// 第二种使用useScroll的方式
const { isArrivedBottom, scrollTop } = useScroll();
watch(isArrivedBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseList().then(() => {
      isArrivedBottom.value = false;
    });
  }
});

// 展示搜索框
const isShowSearchBar = computed(() => {
  return scrollTop.value > 400;
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

// 搜索框
.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
}
</style>
