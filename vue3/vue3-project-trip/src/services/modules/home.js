import { request } from '../request'
export const hotSuggestions = () => {
  return request.get({
    url: '/home/hotSuggests'
  })
}

export const categories = () => {
  return request.get({
    url: '/home/categories'
  })
}