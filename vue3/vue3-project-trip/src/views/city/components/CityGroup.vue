<template>
  <div class="container">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="#">热门</van-index-anchor>
      <div class="host-list">
        <template v-for="item in cityList?.hotCities" :key="item.id">
          <div class="item" @click="itemClick(item)">{{ item.cityName }}</div>
        </template>
      </div>
      <template v-for="(item, index) in cityList?.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="city in item.cities" :key="item.cityId">
          <van-cell :title="city.cityName" @click="itemClick(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';

// 路由
const router = useRouter();

const useStore = useCityStore();

const props = defineProps({
  cityList: {
    type: Object,
    default: () => {},
  },
});

// 索引栏
const indexList = computed(() => {
  const list = props?.cityList?.cities.map((item) => item.group);
  list?.unshift('#');
  return list;
});

// 点击城市
const itemClick = (e) => {
  useStore.currentCity = e;
  router.back();
};
</script>

<style lang="scss" scoped>
.host-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
  padding-right: 25px;
  .item {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>
