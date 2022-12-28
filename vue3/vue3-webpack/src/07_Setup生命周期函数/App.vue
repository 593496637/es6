<template>
  <div></div>
</template>

<script>
import { onMounted } from 'vue';
export default {
  setup() {
    onMounted(() => {
      console.log('onMounted');
    });
  },
};
</script>

<style lang="scss" scoped></style>
