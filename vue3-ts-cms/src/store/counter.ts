import { defineStore } from 'pinia'

const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 10
  }),
  getters: {
    doubleCount: (state) => {
      return state.count * 2
    }
  },
  actions: {
    changeCount(value: number) {
      this.count = value
    }
  }
})

export default useCounterStore
