<template>
  <div>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  setup() {
    const msg = ref("组件")

    return { msg }
  }
}
</script>

<style lang="scss" scoped>
h2{
  color: blueviolet;
}
</style>