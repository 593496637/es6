<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <Swipe v-if="mainPart" :data="mainPart.topModule.housePicture.housePics"/>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { detail } from "@/services";
import { useRoute } from "vue-router";
import Swipe from "./components/Swipe.vue";
const route = useRoute();
const id = route.params.id;

// 获取详情
const detailInfos = ref({});
const mainPart = computed(() => {
  return detailInfos.value?.mainPart;
});
detail(id).then(({ data }) => {
  detailInfos.value = data;
});

// 返回上一页
const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped></style>
