<template>
  <show-info :info="info"></show-info>
</template>

<script>
import { reactive } from 'vue';
import ShowInfo from './ShowInfo.vue'
export default {
  components:{
    ShowInfo
  },
  setup() {
    const info = reactive({
      name: '哈哈',
      age: 12,
    });

    return {
      info,
    };
  },
};
</script>

<style lang="scss" scoped></style>
