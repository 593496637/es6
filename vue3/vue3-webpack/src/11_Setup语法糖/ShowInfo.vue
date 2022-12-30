<template>
  <div>😄</div>
  <h1>name:{{ name }}</h1>
  <h1>age:{{ age }}</h1>
  <button @click="changeInfoName">点击</button>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '👋',
  },
  age: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['infoBtnClick']);
const changeInfoName = () => {
  emit('infoBtnClick', '我点击了');
};

function foo(){
  console.log('foo function');
}

// 将foo函数暴露出去
defineExpose({
  foo
})
</script>

<style lang="scss" scoped></style>
