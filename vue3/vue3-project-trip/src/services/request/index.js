import axios from 'axios'
import { BASE_URL } from './config'
import useMainStore from '@/stores/modules/main'
const mainStore = useMainStore()

class Request {

  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(config => {
      // 在发送请求之前做些什么
      mainStore.isLoading = true
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    this.instance.interceptors.response.use(response => {
      // 对响应数据做点什么
      mainStore.isLoading = false
      return response
    }, error => {
      // 对响应错误做点什么
      mainStore.isLoading = false
      return Promise.reject(error)
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
}

// 可以创建多个网络请求
// export const instance1 = new Request('http://123.207.32.32:9002')
// export const instance2 = new Request('http://123.207.32.32:8000')

export const request = new Request(BASE_URL)
