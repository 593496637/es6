<template>
  <div>
    <p class="title">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello vue'
    }
  }
}
</script>

<style scoped>
.title {
  color: antiquewhite;
}
</style>