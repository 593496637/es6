<template>
  <h1 ref="titleRef">八十</h1>
  <button ref="btn" @click="getElement">btn</button>
  <show-info ref="showInfo"></show-info>
</template>

<script>
import { onMounted, ref } from 'vue';
import ShowInfo from './ShowInfo.vue';

export default {
  components: { ShowInfo },
  setup() {
    // 模板引用，变量名需要跟ref名一致
    const titleRef = ref();
    const btn = ref();
    const showInfo = ref();

    function getElement() {
      console.log(titleRef.value);
      console.log(btn.value);
      console.log(showInfo.value);
      showInfo.value.show()
    }

    onMounted(() => {
      console.log(titleRef.value);
    });

    return {
      titleRef,
      btn,
      showInfo,
      getElement,
    };
  },
};
</script>

<style lang="scss" scoped></style>
