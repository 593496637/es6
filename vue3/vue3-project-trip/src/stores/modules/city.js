import { defineStore } from "pinia";

import { city } from '@/services';

const useCityStore = defineStore('city', {
  state: () => ({
    cities: [],
    currentCity: {
      cityName: "上海"
    }
  }),
  actions: {
    async fetchCities() {
      const { data } = await city()
      this.cities = data
    }
  },

})

export default useCityStore