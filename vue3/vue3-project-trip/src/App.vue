<script setup>
import TarBar from '@/components/TarBar/index.vue';

import { useRoute } from 'vue-router';
const router = useRoute();
console.log(router);
</script>

<template>
  <router-view />
  <tar-bar v-show="!router.meta.isHiddenTabBar" />
</template>

<style scoped></style>
