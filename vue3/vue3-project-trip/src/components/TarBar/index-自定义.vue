<template>
  <div class="container">
    <ul class="tab-bar">
      <template v-for="(item, index) in tabbarData" :key="item.text">
        <li
          class="tab-bar-item"
          :class="{ active: currentIndex === index }"
          @click="itemClick(index, item)"
        >
          <img
            v-if="currentIndex === index"
            :src="getAssetURL(item.iconActive)"
            alt=""
          />
          <img v-else :src="getAssetURL(item.icon)" alt="" />
          {{ item.text }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tab-bar.js';
import { getAssetURL } from '@/utils/load_assets.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const currentIndex = ref(0);
const router=useRouter()

const itemClick = (index, item) => {
  currentIndex.value = index;
  router.push(item.path);
};
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  border-top: 1px solid #f3f3f3;
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
