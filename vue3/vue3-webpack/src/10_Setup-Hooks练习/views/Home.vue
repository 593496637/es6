<template>
  <div>Home</div>
  <h1>{{ counter }}</h1>
  <button @click="increment">home增加</button>
  <button @click="decrement">home减少</button>

  <div>
    <button @click="popularClick">首页-流行</button>
    <button @click="hotClick">首页-热门</button>
    <button @click="musicClick">首页-音乐</button>
  </div>
</template>

<script>
import useCounter from '../hooks/useCounter';
import useTitle from '../hooks/useTitle';
export default {
  name: 'home',
  setup() {
    const title = useTitle('首页');

    function popularClick() {
      title.value = '首页-流行';
    }
    function hotClick() {
      title.value = '首页-热门';
    }

    function musicClick() {
      title.value = '首页-音乐';
    }

    return {
      ...useCounter(),
      popularClick,
      hotClick,
      musicClick,
    };
  },
};
</script>

<style lang="scss" scoped></style>
