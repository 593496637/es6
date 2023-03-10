<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in data" :key="index">
        <img :src="item.url" alt="" class="swipe-image" />
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <!-- <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div> -->
        <div class="custom-indicator">
          <template v-for="(item, key, index) in swipeGroup" :key="index">
            <span
              class="item"
              :class="{
                active: data[active]?.enumPictureCategory == key,
              }"
            >
              {{ removeBracket(item[0].title) }}
              <template v-if="data[active]?.enumPictureCategory == key">
                {{ currentActive(data[active]) }}
                /
                {{ item.length }}
              </template>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

// 对数据进行处理：根据enumPictureCategory进行分类
const swipeGroup = {};
for (const item of props.data) {
  if (!swipeGroup[item.enumPictureCategory]) {
    swipeGroup[item.enumPictureCategory] = [];
  }
  swipeGroup[item.enumPictureCategory].push(item);
}

// 第一种方法
// 删除单个字符串中的左右括号与冒号,如：【1】： => 1
const removeBracket = (str) => {
  return str.replace(/[\【\】\：]/g, "");
};

// 第二种方法：正则：匹配中文括号,如：【1】： => 1
// const removeBracket = (str) => {
//   const nameReg = /【(.*?)】/i;
//   return nameReg.exec(str)[1];
// };

// 获取当前active的index
const currentActive = (item) => {
  return (
    swipeGroup[item.enumPictureCategory].findIndex((data) => item === data) + 1
  );
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  .swipe-image {
    width: 100%;
  }
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 5px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  line-height: 1;
  .item {
    margin: 0 2px;
    padding: 0 2px;
    &.active {
      background-color: #fff;
      color: #000;
    }
  }
}
</style>
