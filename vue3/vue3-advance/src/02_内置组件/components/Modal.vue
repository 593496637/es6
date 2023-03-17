<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div class="modal" v-show="internalVisible" @click.self="closeModal">
        <transition name="modal-slide">
          <div class="modal-content" v-show="internalVisible">
            <h3>Modal Title</h3>
            <p>Some content...</p>
            <button @click="toggleModal">Toggle Modal</button>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>
<script setup>
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible"]);

const internalVisible = ref(props.visible);

watch(
  () => props.visible,
  (newValue) => {
    internalVisible.value = newValue;
  }
);

const closeModal = () => {
  internalVisible.value = false;
  emit("update:visible", false);
};

const toggleModal = () => {
  internalVisible.value = !internalVisible.value;
  emit("update:visible", internalVisible.value);
};
</script>

<style scoped>
/* 遮罩淡入淡出动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}

/* 内容向上滑动动画 */
.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-slide-enter-to,
.modal-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}

.modal-content h3 {
  margin-top: 0;
}

button {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #2980b9;
}
</style>
