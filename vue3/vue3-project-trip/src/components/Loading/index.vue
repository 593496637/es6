<template>
  <div
    class="loading-container"
    @touchmove.prevent
    v-show="isLoading"
    @click="stopLoading"
  >
    <div class="loading"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import useMainStore from "@/stores/modules/main";
const mainStore = useMainStore();

const isLoading = computed(() => mainStore.isLoading);

const stopLoading = () => {
  mainStore.isLoading = false;
};
</script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 0.2rem solid #fff;
    border-top-color: transparent;
    animation: loading 1s infinite linear;
  }
}
</style>
