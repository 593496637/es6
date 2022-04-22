<template>
  <div>
    <h2>{{ msg }}</h2>
    <input type="text" v-model="count" />
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
    const count = ref(0)
    return { msg, count }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color: red;
}
</style>