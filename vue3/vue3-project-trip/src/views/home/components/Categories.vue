<template>
  <div class="container">
    <div class="category-list">
      <div
        class="category-item"
        v-for="category in categories"
        :key="category.id"
      >
        <img :src="category.pictureUrl" alt="" />
        <div class="category-name">{{ category.title }}</div>
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
</script>

<style lang="scss" scoped>
.container {
  padding: 0 10px;
  .category-list {
    display: flex;
    overflow-x: auto;
    margin-top: 10px;
    &::-webkit-scrollbar {
      display: none;
    }
    .category-item {
      width: 70px;
      margin-bottom: 10px;
      flex-shrink: 0;
      text-align: center;
      img {
        width: 32px;
        height: 32px;
      }
      .category-name {
        margin-top: 5px;
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
