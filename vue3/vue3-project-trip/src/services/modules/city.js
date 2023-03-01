import { request } from '../request'
export const city = () => {
  return request.get({
    url: '/city/all'
  })
}