<template>
  <div>
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import { ref, reactive } from 'vue'
import { login } from '@/service/login'
// import { userLoginStore } from '@/store/login'

// 定义账号的数据
let account = reactive({
  name: '',
  password: ''
})
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 执行账号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取用户输入的账号和密码
      const { name, password } = account
      // 发送登录请求
      login({
        name,
        password
      }).then((result) => {
        console.log(result)
      })
    } else {
      console.log('失败')
      ElMessage('啊啊啊摔')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="scss" scoped></style>
