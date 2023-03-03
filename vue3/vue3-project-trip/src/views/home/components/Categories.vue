<template>
  <div class="container">
    <div class="category-list">
      <div
        class="category-item"
        v-for="category in categories"
        :key="category.id"
      >
        <div class="category-img">
          <img :src="category.imgUrl" alt="" />
        </div>
        <div class="category-name">{{ category.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore();
homeStore.fetchCategories();
const { categories } = storeToRefs(homeStore);
console.log(categories);
console.log(categories.value);
</script>

<style lang="scss" scoped></style>
