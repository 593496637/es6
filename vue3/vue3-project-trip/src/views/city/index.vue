<template>
  <div class="container">
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
      <van-tab title="国内•港澳台" name="a">内容 1</van-tab>
      <van-tab title="国外" name="b">内容 2</van-tab>
    </van-tabs>
    <div v-for="item in 100" :key="item.id">
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

import { city } from '@/services';

const router = useRouter();

// 搜索框
const value = ref('');
const onSearch = (val) => showToast(val);
const onCancel = () => {
  router.back();
};

// tab选项卡
const activeName = ref('a');

city().then((res) => {
  console.log(res);
});
</script>

<style lang="scss" scoped>
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
