import { request } from '../request'
export const detail = (houseId) => {
  return request.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}