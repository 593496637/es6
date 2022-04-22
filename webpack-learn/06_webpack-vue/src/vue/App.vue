<template>
  <div>
    <h2>{{ msg }}</h2>
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld.vue"
import { ref } from "vue"

export default {
  components: { HelloWorld },
  setup() {
    const msg = ref("世界")

    return { msg }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color: red;
}
</style>