<template>
  <div>
    {{ info }}
  </div>
</template>

<script>
import { objectExpression } from '@babel/types';

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
