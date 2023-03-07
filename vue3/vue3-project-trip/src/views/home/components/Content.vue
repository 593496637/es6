<template>
  <div class="container">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houseList" :key="index">
        <HouseItemV3
          v-if="item.discoveryContentType === 3"
          :item-data="item.data"
        />
        <HouseItemV9
          v-else-if="item.discoveryContentType === 9"
          :item-data="item.data"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import HouseItemV3 from '@/components/HouseItemV3/index.vue';
import HouseItemV9 from '@/components/HouseItemV9/index.vue';
import useHomeStore from '@/stores/modules/home';
const homeStore = useHomeStore();

const { houseList } = storeToRefs(homeStore);
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
}
.title {
  font-size: 22px;
  padding: 10px;
}
</style>
