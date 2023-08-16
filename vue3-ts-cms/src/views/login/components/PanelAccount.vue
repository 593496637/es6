<template>
  <div>
    <el-form label-width="60px">
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let formLabelAlign = ref({
  name: '',
  region: ''
})
</script>

<style lang="scss" scoped></style>
