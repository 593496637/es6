<template>
  <div>{{ fullName }}</div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  setup() {
    const names = reactive({
      firstName: 'kobe',
      lastName: '小兰',
    });

    const fullName = computed(() => {
      return names.firstName + names.lastName;
    });

    return {
      names,
      fullName,
    };
  },
};
</script>

<style lang="scss" scoped></style>
