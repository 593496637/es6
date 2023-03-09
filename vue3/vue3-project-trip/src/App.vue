<script setup>
import { computed } from "vue";
import TarBar from "@/components/TarBar/index.vue";
import Loading from "@/components/Loading/index.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const keepAlive = computed(() => {
  return route.meta.keepAlive;
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="route.fullPath" v-if="keepAlive"/>
    </keep-alive>
    <component :is="Component" :key="route.fullPath" v-if="!keepAlive"/>
  </router-view>
  <tar-bar v-show="!route.meta.isHiddenTabBar" />
  <loading />
</template>

<style scoped></style>
