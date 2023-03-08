<script setup>
import TarBar from "@/components/TarBar/index.vue";
import Loading from "@/components/Loading/index.vue";
import { useRoute } from "vue-router";
const router = useRoute();
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <tar-bar v-show="!router.meta.isHiddenTabBar" />
  <loading/>
</template>

<style scoped></style>
