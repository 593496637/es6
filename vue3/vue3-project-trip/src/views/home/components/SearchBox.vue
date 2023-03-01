<template>
  <div class="location">
    <div class="city" @click="toCity">广州</div>
    <div class="position" @click="getPosition">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

// 获取当前位置
const getPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error);
      }
    );
  } else {
    alert('浏览器不支持定位');
  }
};

// 跳转至选择城市页面
const toCity = () => {
  router.push('/city');
};
</script>

<style lang="scss" scoped>
.location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  background-color: #fff;
  .city {
    font-size: 14px;
    color: #333;
  }
  .position {
    display: flex;
    align-items: center;
    .text {
      font-size: 14px;
      color: #666;
      margin-right: 5px;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
