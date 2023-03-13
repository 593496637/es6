<template>
  <div class="detail-container" ref="detailRef">
    <TabControl
      class="tab-control"
      :titles="names"
      v-if="showTabControl"
      @tab-item-click="tabClick"
    />
    <van-nav-bar
      title="房屋详情"
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
      <Landlord
        ref="landlordRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <Comment :comment="mainPart.dynamicModule.commentModule" />
      <Notice :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <Map :position="mainPart.dynamicModule.positionModule" />
      <Intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { detail } from "@/services";
import { useRoute } from "vue-router";
import useScroll from "@/hooks/useScroll";
import Swiper from "./components/Swiper.vue";
import Infos from "./components/Infos.vue";
import Facility from "./components/Facility.vue";
import Landlord from "./components/Landlord.vue";
import Comment from "./components/Comment.vue";
import Notice from "./components/Notice.vue";
import Map from "./components/Map.vue";
import Intro from "./components/Intro.vue";
import TabControl from "@/components/TabControl/index.vue";
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

// tabControl
const names = ["房屋详情", "房屋评价", "房屋问答", "房屋预定", "房屋推荐"];
const detailRef = ref(null);
const { scrollTop } = useScroll();
const showTabControl = computed(() => {
  return scrollTop.value > 500;
});

// 滚动到对应的位置
// const top = detailRef.value.children[index].offsetTop;
// 如果是detailRef, 那么就是detailRef的滚动：这时候需要开启下面的class：detail-container,并且设置useScroll的target为detailRef
// 如果是document.documentElement, 那么就是整个页面的滚动

// tabControl点击事件
const landlordRef = ref(null);
const tabClick = (index) => {
  console.log(landlordRef.value);
  document.documentElement.scrollTo({
    top: landlordRef.value.$el,
    behavior: "smooth",
  });
};
</script>

<style lang="scss" scoped>
// .detail-container {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 99vw;
//   height: 100vh;
//   border: 1px solid red;
//   overflow-y: auto;
// }
.tab-control {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
