<template>
  <div>
    <h1>{{ name }}</h1>
    <h1>{{ age }}</h1>
    <h1>{{ height }}</h1>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  // 如果是选项api方式，使用值的时候需要手动解包  name.value  age.value
  // inject: ['name', 'age'],
  setup() {
    const name = inject('name');
    const age = inject('age');
    // 没有height的时候，可以给个默认值
    const height = inject('height', 170);

    return {
      name,
      age,
      height,
    };
  },
};
</script>

<style lang="scss" scoped></style>
