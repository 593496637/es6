import { BASE_URL, TIME_OUT } from './config'
import Request from './request'
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export const request2 = new Request({
  baseURL: 'http://www.codercba.com:1888/airbnb/api',
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
