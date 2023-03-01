<template>
  <div class="container">
    <nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <search-box />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import SearchBox from './components/SearchBox.vue';
</script>

<style lang="scss" scoped>
.banner{
  img{
    width: 100%;
  }
}
</style>
