<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" route>
      <template v-for="(item, index) in tabbarData" :key="item.text">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon="props">
            <div class="tab-bar-item">
              <img
                v-if="active === index"
                :src="getAssetURL(item.iconActive)"
                alt=""
              />
              <img v-else :src="getAssetURL(item.icon)" alt="" />
            </div>
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tab-bar.js";
import { getAssetURL } from "@/utils/load_assets.js";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

// 激活的tabbar
const active = ref(0);

// 获取当前路由
const route = useRoute();
watch(route, (newRoute) => {
  const index = tabbarData.findIndex((item) => item.path === newRoute.path);
  if (index === -1) return;
  active.value = index;
});
</script>

<style lang="scss" scoped>
.tab-bar {
  // 第一种修改样式的方法
  // --van-tabbar-item-active-color: red;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  border-top: 1px solid #f3f3f3;

  // 第二种修改样式的方法
  :deep(.van-tabbar-item--active) {
    color: var(--primary-color);
  }
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    &.active {
      color: var(--primary-color);
    }
    img {
      width: 32px;
      height: 25px;
      margin-bottom: 2px;
    }
  }
}
</style>
