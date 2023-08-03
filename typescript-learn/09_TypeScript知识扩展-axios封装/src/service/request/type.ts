import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 针对AxiosRequestConfig接口进行扩展
export interface Interceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: Interceptors;
}
