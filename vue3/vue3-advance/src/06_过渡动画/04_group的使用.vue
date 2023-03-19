<template>
  <div>
    <button @click="addNum">添加数字</button>
    <button @click="deleteNum">删除数字</button>
    <button @click="shuffle">打乱数组</button>
    <!-- 使用transition-group -->
    <transition-group name="translate" tag="ul">
      <li v-for="item in group" :key="item">{{ item }}</li>
    </transition-group>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const group = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// 在group中随机位置添加一个数字
const addNum = () => {
  group.splice(randomIndex(), 0, group.length);
};

// 在group中随机位置删除一个数字
const deleteNum = () => {
  group.splice(randomIndex(), 1);
};

// 寻找数组中的随机位置
function randomIndex() {
  return Math.floor(Math.random() * group.length);
}
// 打乱数组
//  Math.random() - 0.5 会返回一个大于0的数或者小于0的数
const shuffle = () => {
  group.sort(() => Math.random() - 0.5);
};
</script>

<style scoped>
.translate-enter-from,
.translate-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.translate-leave-from,
.translate-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.translate-move,
.translate-enter-active,
.translate-leave-active {
  transition: all 0.5s ease;
}
.translate-leave-active {
  position: absolute;
}
</style>
