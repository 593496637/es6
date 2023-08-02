import { BASE_URL, TIME_OUT } from './config';
import Request from './request';
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export const request2 = new Request({
  baseURL: 'http://www.codercba.com:1888/airbnb/api',
  timeout: 8000,

  // 请求拦截器
  interceptors: {
		requestInterceptor: (config) => {
			console.log('单独请求成功拦截器');
			return config;
		},
		requestInterceptorCatch: (err) => {
			console.log('单独请求拦截器错误信息', err);
			return err;
		},
		responseInterceptor: (res) => {
			console.log('单独响应成功拦截器');
			return res;
		},
		responseInterceptorCatch: (err) => {
			console.log('单独响应拦截器错误信息', err);
			return err;
		},
	},
});

export default request;
