<template>
  <div class="clock-container">
    <div class="clock">
      <div class="hour-hand" :style="{ transform: 'rotate(' + hourDegrees + 'deg)' }"></div>
      <div class="minute-hand" :style="{ transform: 'rotate(' + minuteDegrees + 'deg)' }"></div>
      <div class="second-hand" :style="{ transform: 'rotate(' + secondDegrees + 'deg)' }"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const now = ref(new Date());
    const hourDegrees = ref(0);
    const minuteDegrees = ref(0);
    const secondDegrees = ref(0);

    onMounted(() => {
      setInterval(() => {
        now.value = new Date();
        hourDegrees.value = 30 * now.value.getHours() + 0.5 * now.value.getMinutes();
        minuteDegrees.value = 6 * now.value.getMinutes();
        secondDegrees.value = 6 * now.value.getSeconds();
      }, 1000);
    });

    return { hourDegrees, minuteDegrees, secondDegrees };
  },
};
</script>

<style>
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.clock {
  width: 300px;
  height: 300px;
  position: relative;
  border: 1px solid black;
  border-radius: 50%;
  padding: 50px;
  box-sizing: border-box;
}

.hour-hand,
.minute-hand,
.second-hand {
  position: absolute;
  left: 50%;
  transform-origin: 100% 50%;
  transform: translate(-50%, 0);
}

.hour-hand {
  width: 50px;
  height: 100px;
  background-color: black;
  border-radius: 10px 10px 0 0;
}

.minute-hand {
  width: 50px;
  height: 150px;
  background-color: black;
  border-radius: 10px 10px 0 0;
}

.second-hand {
  width: 2px;
  height: 200px;
  background-color: red;
}
</style>
