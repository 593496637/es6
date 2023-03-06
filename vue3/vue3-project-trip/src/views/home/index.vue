<template>
  <div class="container">
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
import NavBar from './components/NavBar.vue';
import SearchBox from './components/SearchBox.vue';
import Categories from './components/Categories.vue';
import Content from './components/Content.vue';

</script>

<style lang="scss" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>
