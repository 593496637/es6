<template>
  <detail-section title="位置周边" more-text="查看更多周边信息">
    <div class="map-inner">
      <div class="map" ref="mapRef"></div>
    </div>
  </detail-section>
</template>

<script setup>
import DetailSection from "@/components/DetailSection/index.vue";
import { ref, onMounted } from "vue";
import { loadBaiduMap } from "@/utils/loadMap";

const props = defineProps({
  position: {
    type: Object,
    default: () => {},
  },
});

const mapRef = ref();

onMounted(async () => {
  await loadBaiduMap();
  const map = new BMap.Map(mapRef.value);
  const point = new BMap.Point(props.position.longitude, props.position.latitude);
  map.centerAndZoom(point, 15);
});

// loadBaiduMap().then((res) => {
//   const map = new BMap.Map(mapRef.value);
//   const point = new BMap.Point(116.404, 39.915);
//   map.centerAndZoom(point, 12);
// });
</script>

<style lang="scss" scoped>
.map-inner {
  .map {
    width: 100%;
    height: 200px;
  }
}
</style>
