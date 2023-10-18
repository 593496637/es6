import { defineStore } from 'pinia'

const userLoginStore = defineStore('userLogin', {
  state: () => ({
    id: '',
    token: '',
    name: ''
  }),
  getters: {},
  actions: {
    loginAction(id: string, token: string, name: string) {
      this.id = id
      this.token = token
      this.name = name
    }
  }
})

export default userLoginStore
