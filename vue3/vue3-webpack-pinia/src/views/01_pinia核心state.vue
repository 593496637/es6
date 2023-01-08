<template>
  <h2>counter:{{ counterStore.count }}</h2>
  <h2>counter:{{ count1 }}</h2>
  <h2>counter:{{ count2 }}</h2>
  <h2>value:{{ value }}</h2>

  <button @click="changeState">修改</button>
  <button @click="reset">重置</button>
</template>

<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import useCounter from '@/stores/counter';
const counterStore = useCounter();

// 可以用toRefs将数据变为响应式
const { count: count1 } = toRefs(counterStore);
// 也可以使用pinia提供的storeToRefs将数据变为响应式
const { count: count2, value } = storeToRefs(counterStore);

const changeState = () => {
  // 一次修改一个状态
  // counterStore.count++;
  // counterStore.value += 2;

  // 一次修改多个状态
  counterStore.$patch({
    count: ++counterStore.count,
    value: (counterStore.value += 2),
  });

  // 替换：你不能完全替换掉 store 的 state，因为那样会破坏其响应性。但是，你可以 patch 它
  counterStore.$state = {
    name: 'hello',
  };
};

const reset = () => {
  counterStore.$reset();
};
</script>

<style lang="scss" scoped></style>
