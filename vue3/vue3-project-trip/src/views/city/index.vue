<template>
  <div class="container">
    <div class="top">
      <van-search
        v-model="value"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
      <van-tabs
        v-model:active="activeName"
        title-active-color="#ff6700"
        color="#ff6700"
        line-height="2px"
      >
        <template v-for="(value, key, index) in cities" :key="index">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <city-group :cityList="cityList" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import CityGroup from './components/CityGroup.vue';

const router = useRouter();

// 搜索框
const value = ref('');
const onSearch = (val) => showToast(val);
const onCancel = () => {
  router.back();
};

// tab选项卡
const activeName = ref();

// 获取城市列表
const cityStore = useCityStore();
cityStore.fetchCities();
const { cities } = storeToRefs(cityStore);
// 根据选中的的tab选项卡，获取对应的城市列表
const cityList = computed(() => cities.value[activeName.value]);
</script>

<style lang="scss" scoped>
.container {
  .top {
    padding: 0 10px;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}

// 第一种隐藏tabbar的方法
// 在需要隐藏tabbar的页面的路由中添加meta属性

// 第二种隐藏tabbar的方法
// .container {
//   background-color: #fff;
//   position: relative;
//   z-index: 999;
//   height: 100vh;
//   overflow-y: auto;
// }
</style>
