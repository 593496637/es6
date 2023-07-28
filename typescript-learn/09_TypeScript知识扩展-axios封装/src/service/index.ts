import Request from './request';
const request = new Request({
  baseURL: 'https://httpbin.org',
  timeout: 5000,
});

export default request;
