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

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggestions" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';
import { useRouter } from 'vue-router';
import { formatDate } from '@/utils/format_date';
import { storeToRefs } from 'pinia';

const router = useRouter();

const cityStore = useCityStore();

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

// 热门建议
const homeStore = useHomeStore();
homeStore.fetchHotSuggestions();
const { hotSuggestions } = storeToRefs(homeStore);


// 搜索按钮
const searchBtnClick = () => {
  router.push({
    path: '/search',
    query: {
      cityId: cityStore.currentCity.id,
      startDate: startDate.value,
      endDate: endDate.value,
      stayCount: stayCount.value,
    },
  });
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

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>
