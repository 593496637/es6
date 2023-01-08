import { defineStore } from "pinia";
import useUser from './user'

const useCounter = defineStore('counter', {

  state: () => ({
    count: 5,
    value: 3,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    doubleCountAddOne() {
      console.log(this.doubleCount);
      return this.doubleCount + 1
    },
    // 使用外部的store
    getUser() {
      const userStore = useUser()

      return userStore.getName
    }
  },
  actions: {
    incrementNum() {
      this.count += 1
    }
  },

})

export default useCounter