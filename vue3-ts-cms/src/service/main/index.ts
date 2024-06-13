import request from '..'

export function a(a: any) {
  return request.post({
    url: '/login',
    method: 'post',
    data: a
  })
}
