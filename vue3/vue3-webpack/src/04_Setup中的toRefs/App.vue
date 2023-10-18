<template>
  <div>
    <h2>{{ info.name }}-{{ info.age }}</h2>
    <h2>{{ name }}-{{ age }}</h2>
    <h2>{{ height }}</h2>

    <button @click="height++">height++</button>
  </div>
</template>

<script>
import { ref, reactive, toRef, toRefs, unref } from 'vue';

export default {
  setup() {
    const info = reactive({
      name: '爱的色放',
      age: 20,
      height: 170,
    });

    // reactive被解构后就变成了普通值，失去响应式
    // const { name, age } = info;

    // 使用toRefs包裹后再解构，就不会失去响应式
    // 解构多个
    const { name, age } = toRefs(info);
    // 单独解构一个
    const height = toRef(info, 'height');

    // unref:当不确定别人传给我们的值是否是ref值的时候，可以用unref来获取这个值的value
    const rValue = ref('hi');
    // unref作用：如果是ref值，就获取value，如果不是ref值，就返回原值
    console.log(unref(rValue));
    console.log(unref(height));

    return {
      info,
      name,
      age,
      height,

      // 还可以直接使用
      // ...toRefs(info)
    };
  },
};
</script>

<style lang="scss" scoped></style>
