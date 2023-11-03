<template>
  <div>
    <div>
      num1:<input v-model.number="num1" /> <br />
      num2:<input v-model.number="num2" />
      <h1>{{ addNum }}</h1>
      <button @click="add()">add</button>
      <h1>{{ subNum }}</h1>
      <button @click="sub()">sub</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useAdd from './hooks/useAdd';
import { useSub } from './hooks/useSub';

const num1 = ref(2);
const num2 = ref(1);

// 加法
const { addNum, addFn } = useAdd(num1, num2);
const add = () => {
  addFn(num1.value, num2.value);
};

// 减法
const { subNum, subFn } = useSub(num1, num2);
const sub = () => {
  subFn(num1.value, num2.value);
};
</script>

<style lang="scss" scoped></style>
