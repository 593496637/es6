<template>
  <div>
    <h1>app</h1>
    <input v-model="message" type="text" />

    <h1>{{ counter }}</h1>
    <h1>{{ name }}</h1>
    <button @click="counter++">counter+</button>
    <button @click="name = 'hello'">修改name</button>
  </div>
</template>

<script>
import { ref, watch, watchEffect } from 'vue';

export default {
  setup() {
    const message = ref('hello world');

    watch(message, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });

    const counter = ref(0);
    const name = ref('安安');

    // 1.默认执行一次
    // 2.在执行过程中自动收集依赖(依赖哪些响应式依赖)
    const stopWatch = watchEffect(() => {
      console.log(counter.value, name.value);
      
      // 判断counter.value>=10 停止监听
      if (counter.value >= 10) {
        stopWatch();
      }
    });

    return {
      message,
      counter,
      name,
    };
  },
};
</script>

<style lang="scss" scoped></style>
