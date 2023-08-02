import { request2 } from '..';

request2
  .request({
    url: '/entire/list',
    method: 'GET',
    params: {
      offset: 0,
      size: 4,
    },
  })
  .then((res) => {
    console.log(res.data);
  });
