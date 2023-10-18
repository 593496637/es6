import request from '..'

export function login(data: any) {
  return request.post({
    url: '/login',
    method: 'post',
    data
  })
}
