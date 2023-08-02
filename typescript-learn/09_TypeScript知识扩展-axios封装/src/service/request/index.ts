import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';


// 针对AxiosRequestConfig接口进行扩展
interface RequestConfig extends AxiosRequestConfig {
  interceptors?: Interceptors;
} 


class Request {
  instance: AxiosInstance;
  // request示例=》axios实例
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
        // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
        // 3.params/data序列化的操作
        console.log('请求成功拦截器');
        return config;
      },
      (err) => {
        console.log('请求拦截器错误信息', err);
        return err;
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log('响应成功拦截器');
        return res;
      },
      (err) => {
        console.log('响应拦截器错误信息', err);
        return err;
      }
    );
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }

  get() {}

  post() {}
}

export default Request;
