<template>
  <h2>count:{{ counterStore.count }}</h2>
  <button @click="increment">修改count</button>

  <button @click="fetchData">获取数据</button>

  <ul>
    <li v-for="item in homeStore.banners" :key="item.id">
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup>
import useCounter from '@/stores/counter';
import useHome from '@/stores/home';
const counterStore = useCounter();
const homeStore = useHome();

const increment = () => {
  counterStore.incrementNum();
};

const fetchData = () => {

  // 还可以then
  homeStore.fetchHomeMultiData().then(res=>{
    console.log(res);
  });
};
</script>

<style lang="scss" scoped></style>
