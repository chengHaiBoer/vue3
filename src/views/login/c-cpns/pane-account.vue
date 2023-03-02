<template>
  <div class="pane-account">
    <el-form :model="account" :rules="accountRules" label-width="60px" size="large" status-icon ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
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

// 帐号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()//获取实例类型
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password

      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('请您输入正确的格式后再操作.....')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
