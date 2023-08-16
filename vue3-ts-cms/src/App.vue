<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
interface IPerson {
  name: string
  age: number
}
const person: IPerson = {
  name: 'jack',
  age: 18
}

const { name, age } = person
console.log(name, age)
</script>
<style scoped></style>
