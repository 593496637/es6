import { request2 } from "..";

// 包含：全局拦截器、局部拦截器
// request2
//   .request({
//     url: "/entire/list",
//     method: "GET",
//     params: {
//       offset: 0,
//       size: 4,
//     },
//   })
//   .then((res) => {
//     console.log(res);
//   });


// 包含：全局拦截器、局部拦截器、精细化拦截器
request2
  .request({
    url: "/home/highscore",
    interceptors: {
      requestInterceptor: (config) => {
        console.log("----------/home/highscore请求成功");
        return config;
      },
      responseInterceptor: (res) => {
        console.log("----------/home/highscore响应成功");
        return res;
      },
    },
  })
  .then((res) => {
    console.log(res);
  });
