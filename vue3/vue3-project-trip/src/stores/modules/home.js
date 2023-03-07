import { defineStore } from "pinia";

import { hotSuggestions, categories, getHouseList } from '@/services';

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggestions: [],
    categories: [],
    houseList: [],
    page: 1
  }),
  actions: {
    async fetchHotSuggestions() {
      const { data } = await hotSuggestions()
      this.hotSuggestions = data
    },
    async fetchCategories() {
      const { data } = await categories()
      this.categories = data
    },

    async fetchHouseList(params) {
      const { data } = await getHouseList({ page: this.page })
      this.houseList.push(...data)
      this.page++
    }
  },

})

export default useHomeStore