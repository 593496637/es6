<!-- 自动生成日历组件 -->
<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-header-left">
        <span class="calendar-header-left-year">{{ year }}</span>
        <span class="calendar-header-left-month">{{ month }}</span>
      </div>
      <div class="calendar-header-right">
        <span class="calendar-header-right-prev" @click="prevMonth">上一月</span>
        <span class="calendar-header-right-next" @click="nextMonth">下一月</span>
      </div>
    </div>
    <div class="calendar-body">
      <div class="calendar-body-week">
        <span class="calendar-body-week-day" v-for="day in week" :key="day">{{ day }}</span>
      </div>
      <div class="calendar-body-day">
        <span
          class="calendar-body-day-item"
          v-for="day in days"
          :key="day"
          :class="{
            'calendar-body-day-item-today': day === today,
            'calendar-body-day-item-other': day < 1 || day > daysOfMonth
          }"
        >
          {{ day }}
        </span>
      </div>
    </div>
  </div>
</template>
<!-- 日历组件js代码 -->
<script>
import { ref, computed, watch } from 'vue'
export default {
  name: 'Calendar',
  props: {
    date: {
      type: Date,
      default: () => new Date()
    }
  },
  setup(props) {
    const date = ref(props.date)
    const year = computed(() => date.value.getFullYear())
    const month = computed(() => date.value.getMonth() + 1)
    const today = computed(() => date.value.getDate())
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const daysOfMonth = computed(() => {
      return new Date(year.value, month.value, 0).getDate()
    })
    const days = computed(() => {
      const days = []
      const firstDay = new Date(year.value, month.value - 1, 1).getDay()
      for (let i = 0; i < firstDay; i++) {
        days.push(-i)
      }
      for (let i = 1; i <= daysOfMonth.value; i++) {
        days.push(i)
      }
      return days
    })
    const prevMonth = () => {
      date.value = new Date(year.value, month.value - 2, 1)
    }
    const nextMonth = () => {
      date.value = new Date(year.value, month.value, 1)
    }
    watch(
      () => props.date,
      (newDate) => {
        date.value = newDate
      }
    )
    return {
      year,
      month,
      today,
      week,
      daysOfMonth,
      days,
      prevMonth,
      nextMonth
    }
  }
}
</script>
<!-- 日历组件样式代码 -->
<style lang="scss" scoped>
.calendar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .calendar-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .calendar-header-left {
      display: flex;
      align-items: center;
      .calendar-header-left-year {
        font-size: 20px;
        font-weight: bold;
        margin-right: 10px;
      }
      .calendar-header-left-month {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .calendar-header-right {
      display: flex;
      align-items: center;
      .calendar-header-right-prev {
        cursor: pointer;
        margin-right: 10px;
      }
      .calendar-header-right-next {
        cursor: pointer;
      }
    }
  }
  .calendar-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    .calendar-body-week {
      height: 30px;
      display: flex;
      align-items: center;
      .calendar-body-week-day {
        flex: 1;
        text-align: center;
      }
    }
    .calendar-body-day {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .calendar-body-day-item {
        flex: 1;
        text-align: center;
        line-height: 30px;
        &.calendar-body-day-item-today {
          color: #fff;
          background-color: #1890ff;
        }
        &.calendar-body-day-item-other {
          color: #ccc;
        }
      }
    }
  }
}
</style>