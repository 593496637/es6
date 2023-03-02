import axios from 'axios'
import { BASE_URL } from './config'

class Request {

  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
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
