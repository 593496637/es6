import { defineStore } from 'pinia'
import { login } from '@/service/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

import { LOGIN_TOKEN } from '@/global/constants'

const userLoginStore = defineStore('userLogin', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    name: ''
  }),
  getters: {},
  actions: {
    async loginAction(account: IAccount) {
      const res = await login(account)
      const { id, name, token } = res.data
      this.id = id
      this.token = token
      this.name = name

      localCache.setCache(LOGIN_TOKEN, token)
    }
  }
})

export default userLoginStore
