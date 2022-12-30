<template>
  <div>message:{{ message }}</div>
  <button @click="changeMessage">修改</button>
  <show-info
    ref="showInfoRef"
    name="小辣椒"
    :age="20"
    @infoBtnClick="infoBtnClick"
  ></show-info>
</template>

<script setup>
// 1.所有编写在顶层的代码，都是暴露给template使用的
import { onMounted, ref } from 'vue';
import ShowInfo from './ShowInfo.vue';

// 2.定义响应式数据
const message = ref('Hello');

// 3.定义绑定的函数
function changeMessage() {
  message.value = 'new Message';
}

function infoBtnClick(payload) {
  console.log(payload);
}

// 获取ShowInfo组件实例
const showInfoRef = ref();
onMounted(() => {
  showInfoRef.value.foo();
});
</script>

<style lang="scss" scoped></style>
