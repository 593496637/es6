<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-if="mainPart">
      <Swiper :data="mainPart.topModule.housePicture.housePics" />
      <Infos :top-infos="mainPart.topModule" />
      <Facility
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <Landlord :landlord="mainPart.dynamicModule.landlordModule" />
      <Comment :comment="mainPart.dynamicModule.commentModule" />
      <Notice :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <Map :position="mainPart.dynamicModule.positionModule"/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { detail } from "@/services";
import { useRoute } from "vue-router";
import Swiper from "./components/Swiper.vue";
import Infos from "./components/Infos.vue";
import Facility from "./components/Facility.vue";
import Landlord from "./components/Landlord.vue";
import Comment from "./components/Comment.vue";
import Notice from "./components/Notice.vue";
import Map from './components/Map.vue'
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
