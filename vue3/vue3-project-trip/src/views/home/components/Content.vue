<template>
  <div class="container">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houseList" :key="index">
        <HouseItemV3
          v-if="item.discoveryContentType === 3"
          :item-data="item.data"
          @click="goDetail(item.data)"
        />
        <HouseItemV9
          v-else-if="item.discoveryContentType === 9"
          :item-data="item.data"
          @click="goDetail(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import HouseItemV3 from "@/components/HouseItemV3/index.vue";
import HouseItemV9 from "@/components/HouseItemV9/index.vue";
import useHomeStore from "@/stores/modules/home";

const router = useRouter();
const homeStore = useHomeStore();

const { houseList } = storeToRefs(homeStore);

// 跳转至详情页
const goDetail = (item) => {
  router.push({
    path: `/detail/${item.houseId}`,
  });
};
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
