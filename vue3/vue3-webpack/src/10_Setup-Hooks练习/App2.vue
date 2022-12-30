<template>
  <div class="container">
    <div class="item scroll">
      <h1>scroll-x:{{ scrollX }}</h1>
      <h1>scroll-y:{{ scrollY }}</h1>
    </div>
    <div class="item mouse">
      <h1>mouse-x:{{ mouseX }}</h1>
      <h1>mouse-y:{{ mouseY }}</h1>
    </div>
  </div>
</template>

<script>
import useScrollPosition from './hooks/useScrollPosition';
import useMousePosition from './hooks/useMousePosition';
export default {
  setup() {
    return {
      ...useScrollPosition(),
      ...useMousePosition(),
    };
  },
};
</script>

<style scoped>
.container {
  width: 3000px;
  height: 3000px;
}
.item {
  position: fixed;
}
.scroll {
  top: 30px;
  left: 30px;
}
.mouse {
  top: 200px;
  left: 30px;
}
</style>
