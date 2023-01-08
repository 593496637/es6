import { defineStore } from "pinia";

const useUser = defineStore('user', {
  state: () => ({
    name: "小米",
  }),
  getters: {
    getName: (state) => state.name,
  },
})

export default useUser