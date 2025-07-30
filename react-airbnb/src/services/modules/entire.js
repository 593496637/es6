import request from '..';

export function getEntireRoomList(offset = 0, size = 10) {
  return request.get({
    url: '/entire/list',
    params: {
      offset,
      size,
    },
  });
}
