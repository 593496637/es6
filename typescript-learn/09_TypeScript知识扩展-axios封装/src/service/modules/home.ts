import request from '..';

interface IHomeData {
  data: any;
  returnCode: string;
  success: boolean;
}

// 包含：全局拦截器
request
  .request<IHomeData>({
    url: '/home/multidata',
    method: 'GET',
  })
  .then((res) => {
    console.log(res);
  });
