// 目前使用的是1.2.0版本，如果使用最新的1.4.0，则类型AxiosRequestConfig会提示错误


/**
 * 
  config: 每次请求的配置
  请求拦截器: 修改config
  发送请求: 使用修改后的config
  响应拦截器: 修改res
  resolve: 返回修改后的res
 */


import axios from "axios";
import type { AxiosInstance } from "axios";
import type { RequestConfig } from "./type";

class Request {
  instance: AxiosInstance;
  // request示例=》axios实例
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    // 全局拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
        // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
        // 3.params/data序列化的操作
        console.log("全局请求成功拦截器");
        return config;
      },
      (err) => {
        console.log("全局请求拦截器错误信息", err);
        return err;
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log("全局响应成功拦截器");
        return res;
      },
      (err) => {
        console.log("全局响应拦截器错误信息", err);
        return err;
      }
    );

    // 局部拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    );
  }

  request(config: RequestConfig) {
    // 精细化拦截器
    // 请求拦截器
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config);
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          // 响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get() {}

  post() {}
}

export default Request;
