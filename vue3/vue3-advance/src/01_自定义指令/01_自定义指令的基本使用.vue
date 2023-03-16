<template>
  <div>
    <input type="text" v-focus />
  </div>
</template>

<script>
// 使用options api创建v-focus局部指令
// export default {
//   directives: {
//     focus: {
//       mounted(el) {
//         el?.focus();
//       },
//     },
//   },
// };
</script>
<script setup>
// 使用composition api创建v-focus局部指令
// const vFocus = {
//   mounted(el) {
//     el?.focus();
//   },
// };
</script>

<style lang="scss" scoped></style>
