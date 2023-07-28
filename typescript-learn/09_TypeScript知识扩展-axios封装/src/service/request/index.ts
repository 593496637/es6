import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

class Request {
  instance: AxiosInstance;
  // request示例=》axios实例
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  request(config: AxiosRequestConfig) {
    this.instance.request(config);
  }

  get() {}

  post() {}
}

export default Request;
