// store 下 geoLocation.ts
import { defineStore } from 'pinia'
import loadBMap from '@/utils/loadBMap'

export const useGeoLocationStore = defineStore('geographicalLocation', {
  state: () => {
    return {
      provinceAndCityInfo: {
        cityName: '',
        provinceName: '',
      },
      coordinateInfo: {
        lng: '',
        lat: '',
      },
    }
  },
  getters: {
    getProvinceAndCityInfo() {
      return this.provinceAndCityInfo
    },

    getCoordinateInfo() {
      return this.coordinateInfo
    },
  },
  actions: {
    async setLocationInfo() {
      navigator.geolocation.getCurrentPosition(async () => {
        // 借助navigator访问用户是否给权限获取地址, pc和mobile都可用,如给了权限就继续执行，不给权限就会自动return
        await loadBMap()
        const BMap = window.BMap
        // 根据Geolocation会更准确些，LocalCity是通过IP在百度地图数据库查询位置，不准确的概率比较大
        const geolocation = new BMap.Geolocation()
        await geolocation.getCurrentPosition(async (result) => {
          if (geolocation.getStatus() === 0) {
            this.coordinateInfo = Object.assign(result.point)
            this.provinceAndCityInfo = Object.assign(result.address)
          }
        })
      })
    },
  },
})


// 在需要的地方使用
// import { useGeoLocationStore } from '@/store/modules/geoLocation'
// const GEOLocationStore = useGeoLocationStore()
// GEOLocationStore.setLocationInfo()