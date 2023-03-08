import { defineStore } from "pinia";


const startDate = new Date();
const endDate = new Date();
endDate.setDate(endDate.getDate() + 1);

const useMainStore = defineStore('main', {
  state: () => ({
    startDate: startDate,
    endDate: endDate,
    isLoading: false
  }),
  actions: {

  },
})

export default useMainStore