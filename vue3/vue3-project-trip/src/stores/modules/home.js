import { defineStore } from "pinia";

import { hotSuggestions, categories } from '@/services';

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggestions: [],
    categories: [],
  }),
  actions: {
    async fetchHotSuggestions() {
      const { data } = await hotSuggestions()
      this.hotSuggestions = data
    },
    async fetchCategories() {
      const { data } = await categories()
      this.categories = data
    }
  },

})

export default useHomeStore