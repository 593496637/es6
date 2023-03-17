<!-- App.vue -->
<template>
  <div>
    <button @click="showModal = !showModal">Toggle Modal</button>
    <!-- <Modal :visible="showModal" @update:visible="showModal = $event" /> -->
    <Modal v-model:visible="showModal" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "./components/Modal.vue";

const showModal = ref(false);
</script>
