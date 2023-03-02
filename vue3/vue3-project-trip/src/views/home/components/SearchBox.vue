<template>
  <div class="container">
    <div class="location">
      <div class="city" @click="toCity">
        {{ cityStore.currentCity.cityName }}
      </div>
      <!-- 位置 -->
      <div class="position" @click="getPosition">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <!-- 日期范围 -->
    <div
      class="section date-range bottom-gray-line"
      @click="showCalendar = true"
    >
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff6700"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useCityStore from '@/stores/modules/city';
import { useRouter } from 'vue-router';
import { formatDate } from '@/utils/format_date';

const cityStore = useCityStore();
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

// 日期范围
const startDate = ref(formatDate(new Date()));
const endDate = ref(formatDate(new Date().getTime() + 24 * 60 * 60 * 1000));

// 入住天数
const stayCount = ref(1);

// 显示日历
const showCalendar = ref(false);
// 确认日期范围
const onConfirm = (values) => {
  // 设置日期范围
  const [start, end] = values;
  startDate.value = formatDate(start);
  endDate.value = formatDate(end);
  stayCount.value = (end - start) / (24 * 60 * 60 * 1000);
  // 关闭日历
  showCalendar.value = false;
};
</script>

<style lang="scss" scoped>
.location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
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

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
</style>
