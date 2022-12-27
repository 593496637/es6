<template>
  <div>
    <h1>{{ count }}</h1>
    <h1>{{ info.age }}</h1>

    <button @click="info.age += 1">修改age</button>
    <button @click="object.count++">修改count</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  setup() {
    const count = ref(10);
    const info = reactive({
      name: '阿爸',
      age: 12,
    });

    const object = reactive({
      count,
    });
    console.log(object);
    console.log(info);

    const musics = ref(['青花瓷','大海']);

    console.log(musics.value[0]);
    return {
      count,
      info,
      object,
      musics
    };
  },
};
</script>

<style lang="scss" scoped></style>
