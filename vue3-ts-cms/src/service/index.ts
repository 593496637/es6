import { BASE_URL, TIME_OUT } from './config'
import Request from './request'
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

// http://www.codercba.com:1888/airbnb/api
export const request2 = new Request({
  baseURL: import.meta.env.VITE_URL2,
  timeout: 8000,

  // 请求拦截器
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default request
