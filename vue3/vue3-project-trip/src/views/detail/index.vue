<template>
  <div class="detail-container" ref="detailRef">
    <TabControl
      ref="tabControlRef"
      class="tab-control"
      :titles="titles"
      v-if="showTabControl"
      @tab-item-click="tabClick"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-if="mainPart" v-memo="[mainPart]">
      <Swiper :data="mainPart.topModule.housePicture.housePics" />
      <Infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />
      <Facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <Landlord
        name="房东"
        :ref="getSectionRef"
        ref="landlordRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <Comment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <Notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <Map
        name="地图"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />
      <Intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
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
const detailRef = ref(null);
const { scrollTop } = useScroll();
const showTabControl = computed(() => {
  return scrollTop.value > 240;
});

// 滚动到对应的位置
// const top = detailRef.value.children[index].offsetTop;
// 如果是detailRef, 那么就是detailRef的滚动：这时候需要开启下面的class：detail-container,并且设置useScroll的target为detailRef
// 如果是document.documentElement, 那么就是整个页面的滚动

// tabControl点击事件
// const landlordRef = ref(null);
// const tabClick = (index) => {
//   document.documentElement.scrollTo({
//     top: landlordRef.value.$el.offsetTop - 44,
//     behavior: "smooth",
//   });
// };

// 获取所有的ref
const sectionEls = ref({});
const titles = computed((item) => Object.keys(sectionEls.value));
const getSectionRef = (ref) => {
  if (!ref) return;
  const name = ref.$el.getAttribute("name");
  sectionEls.value[name] = ref.$el;
};

// tabControl点击事件
// 是否是点击tabControl
let isClick = false;
// 当前距离
let currentDistance = 0;
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index];
  let top = sectionEls.value[key].offsetTop;
  isClick = false;
  if (index !== 0) {
    top -= 44;
  }

  isClick = true;
  currentDistance = top;
  document.documentElement.scrollTo({
    top: top,
    behavior: "smooth",
  });
};

const tabControlRef = ref(null);
// 页面滚动，tabControl按钮高亮
const values = computed(() => Object.values(sectionEls.value));
watch(scrollTop, (newVal) => {
  // 当前距离和newVal相等，说明已经滚动到了对应的位置，并且将isClick设置为false
  if (newVal === currentDistance) {
    isClick = false;
  }
  // 如果是点击tabControl，那么就不需要再次执行下面的代码
  if (isClick) return;
  const currentIndex = ref(0);
  for (let i = 0; i < values.value.length; i++) {
    const item = values.value[i];
    if (item.offsetTop - 44 > newVal) {
      currentIndex.value = i - 1;
      break;
    }
    currentIndex.value = values.value.length - 1;
  }
  tabControlRef.value?.setCurrentIndex(currentIndex.value);
});
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
