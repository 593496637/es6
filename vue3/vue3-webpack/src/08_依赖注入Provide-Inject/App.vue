<template>
  <div>app</div>
  <show-info></show-info>
  <button @click="change">修改</button>
</template>

<script>
import { provide, ref } from 'vue';
import ShowInfo from './ShowInfo.vue';
export default {
  components: { ShowInfo },
  setup() {
    const name = ref('坎坎坷坷');
    const age = ref(22);

    provide('name', name);
    provide('age', age);

    function change() {
      name.value = '爱丽丝';
      age.value = 21;
    }
    return {
      change,
    };
  },
};
</script>

<style lang="scss" scoped></style>
